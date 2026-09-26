import settings from '../../../../../assets/settings.json';

// The Constructor's "Управление": which key does what. Keys are physical ones (event.code), so the keyboard
// layout doesn't matter — G and П are the same key. Missing, broken or repeated values fall back to the defaults.
export type HotkeyAction =
    'next' | 'prev' | 'show' | 'team1' | 'team2' | 'hide' | 'stopTimer' | 'turnsMode' | 'switchTeam';

export const defaultHotkeys: {[action in HotkeyAction]: string} = {
    next: 'ArrowRight',
    prev: 'ArrowLeft',
    show: 'Space',
    team1: 'Digit1',
    team2: 'Digit2',
    hide: 'KeyZ',
    stopTimer: 'KeyR',
    turnsMode: 'KeyG',
    switchTeam: 'KeyT',
};

const actions = Object.keys(defaultHotkeys) as HotkeyAction[];

// The digits above the letters and the ones on the numpad are one key.
function normalizeCode(code: string): string {
    return /^Numpad\d$/.test(code) ? 'Digit' + code.slice(6) : code;
}

function readHotkeys(raw: any): {[action in HotkeyAction]: string} {
    const source = raw && typeof raw === 'object' ? raw : {};
    const hotkeys = {...defaultHotkeys};

    actions.forEach(action => {
        const code = source[action];

        if (typeof code === 'string' && code) {
            hotkeys[action] = normalizeCode(code);
        }
    });

    // Two actions on one key would fire together: then the whole set goes back to the defaults.
    const codes = actions.map(action => hotkeys[action]);

    return new Set(codes).size === codes.length ? hotkeys : {...defaultHotkeys};
}

export const hotkeys = readHotkeys((settings as {[key: string]: unknown}).hotkeys);

// Keys that type something: while a text field has the cursor (team names, the winner field) they type
// instead of steering the game. Arrows and the like keep working there, as before.
function isCharacterKey(code: string): boolean {
    return /^(Key[A-Z]|Digit\d|Space|Minus|Equal|Bracket(Left|Right)|Backslash|Semicolon|Quote|Comma|Period|Slash|Backquote|IntlBackslash)$/
        .test(code);
}

function isTyping(event: KeyboardEvent): boolean {
    return event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement;
}

// Actions a held key repeats: holding "back" or "next" flips through the slides quickly. The rest fire once
// per press, so a held key can't score twice.
const repeatingActions: HotkeyAction[] = ['next', 'prev'];

// Whether this key press is the given action. A key with Ctrl/Alt/Shift/Win belongs to the browser
// (Ctrl+R still reloads instead of resetting the timer).
export function isHotkey(event: KeyboardEvent, action: HotkeyAction): boolean {
    const code = normalizeCode(event.code);

    if ((event.repeat && !repeatingActions.includes(action)) || event.ctrlKey || event.altKey || event.shiftKey || event.metaKey || code !== hotkeys[action]) {
        return false;
    }

    return !(isTyping(event) && isCharacterKey(code));
}
