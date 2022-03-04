export interface ModuloPage {
    [path: string]: {
        meta: {
            title: any;
            icon: any;
            path: string;
        };
        default: any;
    };
}
export declare const Doc: import("atomico/types/dom").Atomico<{
    modules?: ModuloPage | undefined;
    showAside?: boolean | undefined;
    sizeToCollapseAside?: string | undefined;
    transitions?: boolean | undefined;
}, {
    new (): HTMLElement;
    prototype: HTMLElement;
}>;
