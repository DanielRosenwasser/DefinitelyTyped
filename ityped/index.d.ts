// Type definitions for ityped 0.0
// Project: https://github.com/luisvinicius167/ityped
// Definitions by: Daniel Rosenwasser <https://github.com/DanielRosenwasser>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export interface Configuration {
    strings?: string[];
    typeSpeed?: number;
    backSpeed?: number;
    startDelay?: number;
    backDelay?: number;
    showCursor?: boolean;
    loop?: boolean;
    cursorChar?: string;
    onFinished?: () => void;
}

export function init(element: string, config: Configuration): void;

export as namespace ityped;