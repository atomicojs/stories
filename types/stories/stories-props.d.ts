interface FieldBase {
    type: string;
    description?: string;
    input?: any;
}
interface FieldGeneric extends FieldBase {
    type: "switch" | "text" | "number";
}
interface FieldSelect extends FieldBase {
    type: "select";
    options: string[];
}
export interface Fields {
    [field: string]: FieldGeneric | FieldSelect;
}
export declare const StoriesProps: import("atomico/types/dom").Atomico<{
    values?: import("atomico/types/schema").FillObject | undefined;
    props?: Fields | undefined;
    types?: {
        switch: string;
        checked: string;
        select: string;
        text: string;
    } | undefined;
}, {
    new (): HTMLElement;
    prototype: HTMLElement;
}>;
export {};
