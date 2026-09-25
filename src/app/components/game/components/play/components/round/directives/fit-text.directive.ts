import {Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy} from '@angular/core';

const minFontSize = 36;

// TypeScript 3.9's DOM types predate document.fonts, which every supported browser has.
const fontsReady = (document as Document & {fonts: {ready: Promise<unknown>}}).fonts.ready;

// Shrinks the question text until it fits its box, starting from the font size the styles set.
// Only when even the smallest size overflows does the box fall back to scrolling.
@Directive({
    selector: '[appFitText]',
})
export class FitTextDirective implements OnChanges, OnDestroy {
    @Input() appFitText: string | undefined;

    private frame: number | null = null;

    constructor(private elementRef: ElementRef<HTMLElement>) {
        // The game font loads on its own, and text measured in the fallback font would get the wrong size.
        fontsReady.then(() => this.scheduleFit());
    }

    ngOnChanges() {
        this.scheduleFit();
    }

    @HostListener('window:resize')
    scheduleFit() {
        if (this.frame !== null) {
            cancelAnimationFrame(this.frame);
        }

        // Waits for the new text to be rendered before measuring it.
        this.frame = requestAnimationFrame(() => {
            this.frame = null;
            this.fit();
        });
    }

    ngOnDestroy() {
        if (this.frame !== null) {
            cancelAnimationFrame(this.frame);
        }
    }

    private fit() {
        const element = this.elementRef.nativeElement;

        element.style.fontSize = '';

        if (!this.appFitText) {
            return;
        }

        const maxFontSize = Math.floor(parseFloat(getComputedStyle(element).fontSize));
        const fits = (size: number) => {
            element.style.fontSize = size + 'px';

            return element.scrollHeight <= element.clientHeight + 1;
        };

        if (fits(maxFontSize)) {
            return;
        }

        let low = minFontSize;
        let high = maxFontSize;

        while (high - low > 1) {
            const middle = Math.floor((low + high) / 2);

            if (fits(middle)) {
                low = middle;
            } else {
                high = middle;
            }
        }

        element.style.fontSize = low + 'px';
    }
}
