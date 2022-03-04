interface Directory {
    title?: string;
    icon?: any;
    path?: string;
    items?: {
        [slug: string]: Directory;
    };
}
export declare const Folder: import("atomico/types/dom").Atomico<{
    slug?: string | undefined;
    indent?: number | undefined;
    directory?: Directory | undefined;
    active?: boolean | undefined;
}, {
    new (): HTMLElement;
    prototype: HTMLElement;
}>;
export {};
