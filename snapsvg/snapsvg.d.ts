// Type definitions for Snap.svg
// Project: http://snapsvg.io/
//          https://github.com/adobe-webplatform/Snap.svg
// Definitions by: Daniel Rosenwasser <https://github.com/DanielRosenwasser>
// TODO: Add DefinitelyTyped here when ready

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
        v: number; // Because the 'b' in "blue" and "brightness" conflict, we displace it with 'v'.

        hex: string;
        error?: boolean;
    }

    interface Snap {
        version: string;

        (width: string, height: string): Element;
        (width: string, height: number): Element;
        (width: number, height: string): Element;
        (width: number, height: number): Element;
        (query: string): Element;
        (dom: SVGElement): Element;
        (array: Element[]): Set<Element>;

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

        parsePathString(pathString: string): any[][];
        parsePathString(path: any[][]): any[][];

        parseTransformString(transformString: string): any[][];
        parseTransformString(transforms: any[][]): any[][];

        parse(svg: string): Fragment;

        fragment(...svgs: string[]): Fragment;
        fragment(...svgs: Element[]): Fragment;
        fragment(...svgs: any[]): Fragment;

        select(query: string): Element;


        // TODO: Let snap people know that their return type may be wrong
        // Figure out multiple return types.
        selectAll(query: string): Set<Element>;
        //selectAll(query: string): Element[];

        set<T>(...items: any[]): Set<T>;

        // TODO: Vague on how to use animation; is callback of type void?
        animation(attr: any, durationInMillis: number, easing?: (n: number) => number, callback?: () => void): Animation;

        inAnim(): { anim: Animation; mina: AnimationDescriptor; curStatus: number; status: (n?: number) => number; stop: () => void }[];

        animate(from: number,
                to: number,
                updater: (n: number) => void,
                durationInMillis: number,
                easing?: (n: number) => number,
                callback?: () => void): MinaAnimation;
        animate(from: number[],
                to: number,
                updater: (n: number) => void,
                durationInMillis: number,
                easing?: (n: number) => number,
                callback?: () => void): MinaAnimation;
        animate(from: number,
                to: number[],
                updater: (n: number) => void,
                durationInMillis: number,
                easing?: (n: number) => number,
                callback?: () => void): MinaAnimation;

        ajax<T>(url: string, postData: string, callback: (scope?: T) => void, scope?: T): XMLHttpRequest;
        ajax<T>(url: string, postData: any, callback: (scope?: T) => void, scope?: T): XMLHttpRequest;
        ajax<T>(url: string, callback: (scope: T) => void, scope?: T): XMLHttpRequest;

        // TODO: documentation needs to indicate return type more explicitly.
        load<T>(url: string, callback: (scope: T) => void, scope: T): Fragment;

        // TODO: return type comes before arguments in documentation.
        getElementsByPoint(x: number, y: number): Element;

        // TODO
        //plugin(f: (Snap: Snap, Element: typeof Element, Paper: typeof Paper, global: any, Fragment: Fragment) => void): void;
    }

    interface Fragment {
        select(query: string): Element;
        selectAll(query: string): Set<Element>;
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

    interface Mina {
        // TODO: Correct documentation ("gereal" case)
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
        // TODO: Check the types value can take on.
        attr(attribute: string, value: string): string
        attr(attribute: string, value: number): string
        attr(attributes: any): Element;

        getBBox(): BoundingBox;

        transform(): TransformationDescriptor; // getter
        transform(transformString: string): Element; // setter
        

        parent(): Element;

        append(el: Element): Element;
        append(els: Set<Element>): Element;

        add(el: Element): Element;
        add(els: Set<Element>): Element;

        appendTo(parentEl: Element): Element;

        // TODO: Documentation doesn't cover Set<Element> for many of the following:
        prepend(el: Element): Element;
        prepend(els: Set<Element>): Element;

        prependTo(parentEl: Element): Element;

        before(el: Element): Element;
        before(els: Set<Element>): Element;

        after(el: Element): Element;
        after(els: Set<Element>): Element;

        insertBefore(el: Element): Element;

        insertAfter(el: Element): Element;

        remove(): Element;

        select(query: string): Element;

        selectAll(query: string): Set<Element>;

        // TODO: asPX is documented to return Element
        asPX(attr: string, value?: string): number;

        use(): Element;

        clone(): Element;

        toDefs(): Element;

        // omg
        toPattern(x: string, y: string, width: string, height: string): Element;
        toPattern(x: string, y: string, width: string, height: number): Element;
        toPattern(x: string, y: string, width: number, height: string): Element;
        toPattern(x: string, y: string, width: number, height: number): Element;
        toPattern(x: string, y: number, width: string, height: string): Element;
        toPattern(x: string, y: number, width: string, height: number): Element;
        toPattern(x: string, y: number, width: number, height: string): Element;
        toPattern(x: string, y: number, width: number, height: number): Element;
        toPattern(x: number, y: string, width: string, height: string): Element;
        toPattern(x: number, y: string, width: string, height: number): Element;
        toPattern(x: number, y: string, width: number, height: string): Element;
        toPattern(x: number, y: string, width: number, height: number): Element;
        toPattern(x: number, y: number, width: string, height: string): Element;
        toPattern(x: number, y: number, width: string, height: number): Element;
        toPattern(x: number, y: number, width: number, height: string): Element;
        toPattern(x: number, y: number, width: number, height: number): Element;

        // TODO: Check if pattern should be omitted.
        //       Also, documentation misspells "deprecated".
        pattern(x: string, y: string, width: string, height: string): Element;
        pattern(x: string, y: string, width: string, height: number): Element;
        pattern(x: string, y: string, width: number, height: string): Element;
        pattern(x: string, y: string, width: number, height: number): Element;
        pattern(x: string, y: number, width: string, height: string): Element;
        pattern(x: string, y: number, width: string, height: number): Element;
        pattern(x: string, y: number, width: number, height: string): Element;
        pattern(x: string, y: number, width: number, height: number): Element;
        pattern(x: number, y: string, width: string, height: string): Element;
        pattern(x: number, y: string, width: string, height: number): Element;
        pattern(x: number, y: string, width: number, height: string): Element;
        pattern(x: number, y: string, width: number, height: number): Element;
        pattern(x: number, y: number, width: string, height: string): Element;
        pattern(x: number, y: number, width: string, height: number): Element;
        pattern(x: number, y: number, width: number, height: string): Element;
        pattern(x: number, y: number, width: number, height: number): Element;

        marker(x: number, y: number, width: number, height: number, refX: number, refY: number): Element;

        stop(): void;

        animate(attrs: any, durationInMillis: number, easing?: (p: number) => number, callback?: () => void): Element;

        data(key: string): any;
        data(key: string, value: any): Element;

        removeData(key?: string): Element;

        outerSVG(): string;

        toString(): string;

        innerSVG(): string;

        addClass(value: string): Element;

        removeClass(value: string): Element;

        hasClass(value: string): boolean;

        // TODO: flag not documented as optional
        toggleClass(value: string, flag?: boolean): Element;

        // TODO: ask if context is needed
        click<T>(handler: (context?: T) => void, context?: T): Element;
        unclick<T>(handler: (context?: T) => void, context?: T): Element;
        dblclick<T>(handler: (context?: T) => void, context?: T): Element;
        undblclick<T>(handler: (context?: T) => void, context?: T): Element;
        mousedown<T>(handler: (context?: T) => void, context?: T): Element;
        unmousedown<T>(handler: (context?: T) => void, context?: T): Element;
        mousemove<T>(handler: (context?: T) => void, context?: T): Element;
        unmousemove<T>(handler: (context?: T) => void, context?: T): Element;
        mouseout<T>(handler: (context?: T) => void, context?: T): Element;
        unmouseout<T>(handler: (context?: T) => void, context?: T): Element;
        mouseover<T>(handler: (context?: T) => void, context?: T): Element;
        unmouseover<T>(handler: (context?: T) => void, context?: T): Element;
        mouseup<T>(handler: (context?: T) => void, context?: T): Element;
        unmouseup<T>(handler: (context?: T) => void, context?: T): Element;
        touchstart<T>(handler: (context?: T) => void, context?: T): Element;
        untouchstart<T>(handler: (context?: T) => void, context?: T): Element;
        touchmove<T>(handler: (context?: T) => void, context?: T): Element;
        untouchmove<T>(handler: (context?: T) => void, context?: T): Element;
        touchend<T>(handler: (context?: T) => void, context?: T): Element;
        untouchend<T>(handler: (context?: T) => void, context?: T): Element;
        touchcancel<T>(handler: (context?: T) => void, context?: T): Element;
        untouchcancel<T>(handler: (context?: T) => void, context?: T): Element;

        hover<T>(hoverInHandler: (context?: T) => void, hoverOutHandler: (context?: T) => void, context?: T): Element;
        hover<TI, TO>(hoverInHandler: (context?: TI) => void, hoverOutHandler: (context?: TO) => void, inContext?: TI, outContext?: TO): Element;
         
        unhover<TI, TO>(hoverInHandler: () => void, hoverOutHandler: () => void): Element;

        drag(onMove: (ctxt: MouseMoveContext) => void, onStart: (ctxt: MouseStartContext) => void, onEnd: (ctxt: MouseEndContext) => void): Element;
        drag<TM, TS, TE>(onMove: (ctxt: TM) => void, onStart: (ctxt: TS) => void, onEnd: (ctxt: TE) => void, 
                        moveContext?: TM, startContext?: TS, endContext?: TE): Element;

        undrag(): Element;

        getTotalLength(): number;

        getPointAtLength(length: number): {x: number; y: number; alpha: number };

        getSubPath(from: number, to: number): string;

    }

    interface MouseStartContext { x: number; y: number; event: Event }
    interface MouseMoveContext { dx: number; dy: number; x: number; y: number; event: Event }
    interface MouseEndContext   { event: Event }

    interface Matrix {
        new(a: number, b: number, c: number, d: number, e: number, f: number): Matrix;

        add(a: number, b: number, c: number, d: number, e: number, f: number): Matrix;
        add(other: Matrix): Matrix;

        invert(): Matrix;

        clone(): Matrix;

        translate(x: number, y: number): Matrix;

        scale(x: number, y?: number, cx?: number, cy?: number): Matrix;

        rotate(angleInDegrees: number, x: number, y: number): Matrix;

        x(x: number, y: number): number;

        y(x: number, y: number): number;

        determinant(): number;

        split(): ExplicitTransform;

        toTransformString(): string;
    }

    interface Snap {
        // TODO
        //Matrix: typeof Matrix;

        matrix(matrix: SVGMatrix): Matrix;
        matrix(a: number, b: number, c: number, d: number, e: number, f: number): Matrix;
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

    interface Paper {
        el(name: string, attributes: any): Element;

        // TODO: make rect interface?
        rect(x: number, y: number, width: number, height: number, rx?: number, ry?: number): Element;

        circle(x: number, y: number, r: number): Element;
        // TODO: documentation says "no attributes"
        
        // TODO: undocumented use of object attributes instead of src?
        // TODO: other places use URL; here we use URI.
        image(srcUri: string, x: number, y: number, width: number, height: number): Element;
        image(attrs: any, x: number, y: number, width: number, height: number): Element;

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

        filter: Filter
    }

    interface Filter {
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

    interface Path {
        getTotalLength(path: string): number;

        getPointAtLength(path: string, length: number): {x: number; y: number; alpha: number };

        getSubPath(path: string, from: number, to: number): string;

        findDotsAtSegment(p1x: number, p1y: number, c1x: number, c1y: number, c2x: number, c2y: number, p2x: number, p2y: number, t: number): DotsAtSegment;

        bezierBBox(p1x: number, p1y: number, c1x: number, c1y: number, c2x: number, c2y: number, p2x: number, p2y: number): BezierBoundingBox;
        bezierBBox(bezNums: number[]): BezierBoundingBox;

        // TODO: documentation specifies first param is a string
        isPointInsideBBox(bbox: BezierBoundingBox, x: number, y: number): boolean;

        isBBoxIntersect(bbox1: BezierBoundingBox, bbox2: BezierBoundingBox): boolean;

        intersection(path1: string, path2: string): IntersectionDot[];

        isPointInside(path: string, x: number, y: number): boolean;

        getBBox(path: string): BezierBoundingBox

        // TODO: actual method takes arrays as well for 'path'.
        toRelative(path: string): any[][];

        toAbsolute(path: string): any[][];

        toCubic(path: string): any[][];
        toCubic(segments: any[][]): any[][];

        map(path: string, matrix: Matrix): string;
    }


    interface Set<T> {
        // TODO: documentation omits arguments; says it returns element, not set.
        push(...items: T[]): Set<T>;

        pop(): T;

        forEach<CT>(callback: (item: T, index: number) => boolean, thisArg?: CT): Set<T>;
        forEach<CT>(callback: (item: T, index: number) => void, thisArg?: CT): Set<T>;

        // TODO REVIEW easing/callback are semi-optionality?
        // Does this mean Sets are not generic?
        animate(attrs: any, duration: number, easing?: (input: number) => number, callback?: (context: any) => void): Set<T>;
        animate(attrs: any, duration: number, callback?: (context: any) => void): Set<T>;
        animate(...animationParams: any[][]): Set<T>;

        // TODO: Set.bind

        clear(): void;

        splice(index: number, count: number, ...toInsert: T[]): Set<T>

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

declare var Snap: snapsvg.Snap;

