import settings from '../../../../../../../../assets/settings.json';

// The Constructor's "Фон под вопросом": how dark the box behind a question is and what frames it.
// The frame fades together with the box. Its colour is a hue at the saturation and lightness of the original
// brown frame (hsl(32, 80%, 31%)), so every hue stays as deep as the game's palette.
// Missing or broken values fall back to the original look — 60% black with the brown frame.
const defaultOpacity = 60;
const defaultBorderHue = 32;

const raw: any = (settings as {[key: string]: unknown}).questionBox || {};
const opacity = Number.isFinite(raw.opacity) ? Math.min(100, Math.max(0, raw.opacity)) : defaultOpacity;
const borderHue = Number.isFinite(raw.borderHue) ? Math.min(360, Math.max(0, raw.borderHue)) : defaultBorderHue;
const alpha = opacity / 100;

export const questionBoxStyle = {
    background: `rgba(0, 0, 0, ${alpha})`,
    border: raw.border === false ? 'none' : `4px solid hsla(${borderHue}, 80%, 31%, ${alpha})`,
};
