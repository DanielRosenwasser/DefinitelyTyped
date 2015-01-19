// Type definitions for Snap.svg 0.3.0
// Project: http://snapsvg.io/
// Definitions by: Daniel Rosenwasser <https://github.com/DanielRosenwasser>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module snapsvg {

    interface RGB {
        r: number;
        g: number;
        b: number;
        hex: string;
        error?: boolean;
    }

    interface HSB {
        h: number;
        s: number;
        b: number;
    }

    interface HSL {
        h: number;
        s: number;
        l: number;
    }

    interface RGBHSB {
        r: number;
        g: number;
        b: number;
        
        h: number;
        s: number;
        v: number; // Because the 'b' in "blue" and "brightness" conflict, 'v' is used instead.

        hex: string;
        error?: boolean;
    }

    /**
     * An array of elements representing an instruction from a pasrsed transformation or path string.
     * For instance, once the path string "M10,10" is parsed, the resulting ParsedCommand
     * will be ["M", 10, 10].
     */
    interface ParsedCommand extends Array<string|number>{
        0: string; // The command pneumonic.
        1?: number;
        2?: number;
        3?: number;
        4?: number;
        5?: number;
        6?: number;
        7?: number;
        8?: number;
    }

    interface SnapStatic {
        version: string;

        (query: string): Paper;
        (width: string, height: string): Paper;
        (width: string, height: number): Paper;
        (width: number, height: string): Paper;
        (width: number, height: number): Paper;
        (dom: SVGElement): SVGElement;
        (array: Element[]): ElementSet;

        format(token: string, json: any): string;
        
        rad(deg: number): number;

        deg(rad: number): number;

        angle(x1: number, y1: number, x2: number, y2: number): number;
        angle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): number;

        is(o: any, type: string): boolean;

        snapTo(values: number, value: number, tolerance?: number): number;
        snapTo(values: number[], value: number, tolerance?: number): number;

        getRGB(color: string): RGB;

        hsb(hue: number, saturation: number, brightness: number): string;

        hsl(hue: number, saturation: number, luminosity: number): string;

        rgb(red: number, green: number, blue: number): string;

        color(clr: string): RGBHSB;

        hsb2rgb(hue: number, saturation: number, brightness: number): RGB;

        hsl2rgb(hue: number, saturation: number, luminosity: number): RGB;

        rgb2hsb(red: number, green: number, blue: number): HSB;

        rgb2hsl(red: number, green: number, blue: number): HSL;

        parsePathString(pathString: string): ParsedCommand[];
        parsePathString(path: ParsedCommand[]): ParsedCommand[];

        parseTransformString(transformString: string): ParsedCommand[];
        parseTransformString(transforms: ParsedCommand[]): ParsedCommand[];

        parse(svg: string): Fragment;

        fragment(...svgs: (string|Element)[]): Fragment;

        select(query: string): Element;

        selectAll(query: string): ElementSet;

        set(...items: any[]): ElementSet;

        animation(attr: any, durationInMillis: number, easing?: (n: number) => number, callback?: () => void): Animation;

        inAnim(): { anim: Animation; mina: AnimationDescriptor; curStatus: number; status: (n?: number) => number; stop: () => void }[];

        animate(from: number|number[],
                to: number|number[],
                updater: (n: number) => void,
                durationInMillis: number,
                easing?: (n: number) => number,
                callback?: () => void): MinaAnimation;
        animate(from: number|number[],
                to: number|number[],
                updater: (n: number) => void,
                durationInMillis: number,
                callback?: () => void): MinaAnimation;

        ajax(url: string, callback: () => void, thisArg?: any): XMLHttpRequest;
        ajax(url: string, postData: string, callback: () => void, thisArg?: any): XMLHttpRequest;
        ajax(url: string, postData: any, callback: () => void, thisArg?: any): XMLHttpRequest;

        load(url: string, callback: () => void, thisArg: any): Fragment;

        getElementsByPoint(x: number, y: number): Element;

        /**
         * The constructor for Matrix.
         */
        Matrix: { new (a: number, b: number, c: number, d: number, e: number, f: number): Matrix };

        matrix(a: number, b: number, c: number, d: number, e: number, f: number): Matrix;
        matrix(matrix: SVGMatrix): Matrix;

        path: PathStatic;

        filter: FilterStatic;

        // TODO
        //plugin(f: (Snap: Snap, Element: typeof Element, Paper: typeof Paper, global: any, Fragment: Fragment) => void): void;
    }

    interface Fragment {
        select(query: string): Element;
        selectAll(query: string): ElementSet;
    }

    interface BoundingBox {
        cx: number;
        cy: number;
        h: number;
        height: number;
        path: string;
        r0: number;
        r1: number;
        r2: number;
        vb: string;
        w: number;
        width: number;
        x2: number;
        x: number;
        y2: number;
        y: number;
    }

    interface TransformationDescriptor {
        string: string;
        globalMatrix: Matrix;
        localMatrix: Matrix;
        diffMatrix: Matrix;
        global: string;
        local: string;
        toString(): string;
    }

    interface Animation {
        attr: any;
        duration: number;
        easing?: (input: number) => number;
        callback?: () => void;
    }

    interface MinaAnimation {
        id: string;
        duration(millis?: number): number;
        easing(p: number): number;
        speed(factor?: number): number;
        status(p: number): number;
        stop(): void;
    }

    interface AnimationDescriptor {
        id: string;
        start: number;
        end: number;
        b: number;
        s: number;
        dur: number;
        spd: number;
        get(): number;
        set(slave: number): number;
        easing(input: number): number;
        status(): number;
        status(newStatus: number): void;
        speed(): number;
        speed(newSpeed: number): void;
        duration(): number;
        duration(newDuration: number): void;
        stop(): void;
        pause(): void;
        resume(): void;
        update(): void;
    }

    interface MinaStatic {
        (slaveStart: number,
         slaveEnd: number,
         masterStart: number,
         masterEnd: number,
         get: () => number,
         set: (slaveNum: number) => void,
         easing?: (n: number) => number): AnimationDescriptor;

        time(): number;

        getById(id: string): AnimationDescriptor;

        linear(input: number): number;

        easeout(input: number): number;

        easein(input: number): number;

        easeinout(input: number): number;

        backin(input: number): number;

        backout(input: number): number;

        elastic(input: number): number;

        bounce(input: number): number;
    }

    interface Element {
        attr(): Element;
        attr(attribute: string): string;
        attr(attribute: string, value: string): Element;
        attr(attribute: string, value: number): Element;
        attr(attributes: any): Element;

        getBBox(): BoundingBox;

        transform(): TransformationDescriptor; // getter
        transform(transformString: string): Element; // setter
        
        parent(): Element;

        append(el: Element): Element;
        append(els: ElementSet): Element;

        add(el: Element): Element;
        add(els: ElementSet): Element;

        appendTo(parentEl: Element): Element;

        prepend(el: Element): Element;
        prepend(els: ElementSet): Element;

        prependTo(parentEl: Element): Element;

        before(el: Element): Element;
        before(els: ElementSet): Element;

        after(el: Element): Element;
        after(els: ElementSet): Element;

        insertBefore(el: Element): Element;

        insertAfter(el: Element): Element;

        remove(): Element;

        select(query: string): Element;

        selectAll(query: string): ElementSet;

        asPX(attr: string, value?: string): number;

        use(): Element;

        clone(): Element;

        toDefs(): Element;

        toPattern(x: string|number, y: string|number, width: string|number, height: string|number): Element;

        /**
         * @deprecated.
         */
        pattern(x: string|number, y: string|number, width: string|number, height: string|number): Element;

        marker(x: number, y: number, width: number, height: number, refX: number, refY: number): Element;

        animate(attrs: any, durationInMillis: number, easing?: (p: number) => number, callback?: () => void): Element;

        stop(): void;

        data(key: string): any;
        data(key: string, value: any): Element;

        removeData(key?: string): Element;

        outerSVG(): string;

        toString(): string;

        innerSVG(): string;

        addClass(value: string): Element;

        removeClass(value: string): Element;

        hasClass(value: string): boolean;

        toggleClass(value: string, flag?: boolean): Element;

        click(handler: (event: MouseEvent) => void, thisArg?: any): Element;
        dblclick(handler: (event: MouseEvent) => void, thisArg?: any): Element;
        mousedown(handler: (event: MouseEvent) => void, thisArg?: any): Element;
        mousemove(handler: (event: MouseEvent) => void, thisArg?: any): Element;
        mouseout(handler: (event: MouseEvent) => void, thisArg?: any): Element;
        mouseover(handler: (event: MouseEvent) => void, thisArg?: any): Element;
        mouseup(handler: (event: MouseEvent) => void, thisArg?: any): Element;
        touchstart(handler: (event: MouseEvent) => void, thisArg?: any): Element;
        touchmove(handler: (event: MouseEvent) => void, thisArg?: any): Element;
        touchend(handler: (event: MouseEvent) => void, thisArg?: any): Element;
        touchcancel(handler: (event: MouseEvent) => void, thisArg?: any): Element;
        
        unclick(handler: (event: MouseEvent) => void): Element;
        undblclick(handler: (event: MouseEvent) => void): Element;
        unmousedown(handler: (event: MouseEvent) => void): Element;
        unmousemove(handler: (event: MouseEvent) => void): Element;
        unmouseout(handler: (event: MouseEvent) => void): Element;
        unmouseover(handler: (event: MouseEvent) => void): Element;
        unmouseup(handler: (event: MouseEvent) => void): Element;
        untouchstart(handler: (event: MouseEvent) => void): Element;
        untouchmove(handler: (event: MouseEvent) => void): Element;
        untouchend(handler: (event: MouseEvent) => void): Element;
        untouchcancel(handler: (event: MouseEvent) => void): Element;

        hover(hoverInHandler: (event: MouseEvent) => void, hoverOutHandler: (event: MouseEvent) => void, thisArg?: any): Element;
        hover(hoverInHandler: (event: MouseEvent) => void, hoverOutHandler: (event: MouseEvent) => void, inThisArg?: any, outThisArg?: any): Element;
        unhover(hoverInHandler: (event: MouseEvent) => void, hoverOutHandler: (event: MouseEvent) => void): Element;

        drag(onMove:  (dx: number, dy: number, event: MouseEvent) => void,
             onStart: (x: number, y: number, event: MouseEvent) => void,
             onEnd:   (event: MouseEvent) => void,
             moveThisArg?: any,
             startThisArg?: any,
             endThisArg?: any): Element;

        undrag(onMove:  (dx: number, dy: number, event: MouseEvent) => void,
               onStart: (x: number, y: number, event: MouseEvent) => void,
               onEnd:   (event: MouseEvent) => void): Element;

        getTotalLength(): number;
        getPointAtLength(length: number): { x: number; y: number; alpha: number };
        getSubPath(from: number, to: number): string;

    }

    interface Matrix {
        add(other: Matrix): Matrix;
        add(a: number, b: number, c: number, d: number, e: number, f: number): Matrix;

        invert(): Matrix;

        clone(): Matrix;

        translate(x: number, y: number): Matrix;

        scale(x: number, y?: number, cx?: number, cy?: number): Matrix;

        rotate(angleInDegrees: number, x: number, y: number): Matrix;

        x(x: number, y: number): number;

        y(x: number, y: number): number;

        determinant(): number;

        split(): ExplicitTransform;

        toString(): string;

        toTransformString(): string;
    }

    interface ExplicitTransform {
        dx: number;
        dy: number;
        scalex: number;
        scaley: number;
        shear: number;
        rotate: number;
        isSimple: boolean;
    }

    interface Paper extends Element {
        el(name: string, attributes: any): Element;

        rect(x: number, y: number, width: number, height: number, rx?: number, ry?: number): Element;

        circle(x: number, y: number, r: number): Element;
        
        image(srcUri: string, x: number, y: number, width: number, height: number): Element;
        image(attributes: any): Element;

        ellipse(x: number, y: number, rx: number, ry: number): Element;

        path(pathStr: string): Element;

        g(...elems: Element[]): Element;
        group(...elems: Element[]): Element;

        svg(x?: number, y?: number, width?: number, height?: number, vbx?: number, vby?: number, vbw?: number, vbh?: number): Element;

        mask(...elems: Element[]): Element;

        ptrn(x?: number, y?: number, width?: number, height?: number, vbx?: number, vby?: number, vbw?: number, vbh?: number): Element;

        use(linkId?: string): Element;
        use(linkId?: Element): Element;

        text(x: number, y: number, text: string): Element;
        text(x: number, y: number, text: string[]): Element;

        line(x1: number, y1: number, x2: number, y2: number): Element;

        polyline(points: number[]): Element;
        polyline(...points: number[]): Element;

        polygon(points: number[]): Element;
        polygon(...points: number[]): Element;

        gradient(descriptor: string): Element;

        toString(): string;

        clear(): void;

        filter(filterStr: string): Element;
    }

    interface FilterStatic {
        (filterString: string): Element;

        blur(x: number, y?: number): string;

        shadow(dx: number, dy: number, blur: number, color: string, opacity: number): string;
        shadow(dx: number, dy: number, color: string, opacity: number): string;
        shadow(dx: number, dy: number, opacity: number): string;

        grayscale(amount: number): string;

        sepia(amount: number): string;

        saturate(amount: number): string;

        hueRotate(angleInDegrees: number): string;

        invert(amount: number): string;

        brightness(amount: number): string;

        contrast(amount: number): string;
    }

    interface PathStatic {
        getTotalLength(path: string): number;

        getPointAtLength(path: string, length: number): { x: number; y: number; alpha: number };

        getSubPath(path: string, from: number, to: number): string;

        findDotsAtSegment(p1x: number, p1y: number, c1x: number, c1y: number, c2x: number, c2y: number, p2x: number, p2y: number, t: number): DotsAtSegment;

        bezierBBox(p1x: number, p1y: number, c1x: number, c1y: number, c2x: number, c2y: number, p2x: number, p2y: number): BezierBoundingBox;
        bezierBBox(bezNums: number[]): BezierBoundingBox;

        isPointInsideBBox(bbox: BezierBoundingBox, x: number, y: number): boolean;

        isBBoxIntersect(bbox1: BezierBoundingBox, bbox2: BezierBoundingBox): boolean;

        intersection(path1: string, path2: string): IntersectionDot[];

        isPointInside(path: string, x: number, y: number): boolean;

        getBBox(path: string): BezierBoundingBox;

        toRelative(path: string): ParsedCommand[];
        toRelative(path: ParsedCommand[]): ParsedCommand[];

        toAbsolute(path: string): ParsedCommand[];

        toCubic(path: string): ParsedCommand[];
        toCubic(segments: ParsedCommand[]): ParsedCommand[];

        map(path: string, matrix: Matrix): string;
    }


    // ElementSet could be Set<T>. It actually started out that way,
    // but it makes little-to-no sense since its main purpose is
    // for animations, and gives nothing over built-in arrays.
    interface ElementSet {
        push(...items: Element[]): ElementSet;

        pop(): Element;

        forEach(callback: (item: Element, index: number) => boolean, thisArg?: any): ElementSet;
        forEach(callback: (item: Element, index: number) => void, thisArg?: any): ElementSet;

        animate(attrs: any, duration: number, easing?: (input: number) => number, callback?: () => void): ElementSet;
        animate(attrs: any, duration: number, callback?: () => void): ElementSet;
        animate(...animationParams: any[][]): ElementSet;
        
        bind(attribute: string, callback: (value: number) => void): ElementSet;
        bind(attribute: string, callback: (value: string) => void): ElementSet;
        bind(attribute: string, element: Element, elemAttribute?: string): ElementSet;

        clear(): void;

        splice(index: number, count: number, ...toInsert: Element[]): ElementSet;

        exclude(element: Element): boolean;
    }

    interface DotsAtSegment {
        x: number;
        y: number;
        m: {
            x: number;
            y: number;
        };
        n: {
            x: number;
            y: number;
        };
        start: {
            x: number;
            y: number;
        };
        end: {
            x: number;
            y: number;
        };
        alpha: number;
    }

    interface IntersectionDot {
        x: number;
        y: number;
        t1: number;
        t2: number;
        segment1: number;
        segment2: number;
        bez1: number[];
        bez2: number[];
    }

    interface BezierBoundingBox {
        x: number;
        y: number;
        x2: number;
        y2: number;
        width: number;
        height: number;
    }

}

declare var Snap: snapsvg.SnapStatic;
declare var mina: snapsvg.MinaStatic;

