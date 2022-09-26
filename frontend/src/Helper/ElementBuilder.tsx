import { propTypes } from "react-bootstrap/esm/Image"

export function ElementBuilder(element: string, id: string, parentId: string): Tsx<any> {
    return Element(element, id, parentId)

}

const ElementBuilderSwitch: { [K: string]: Function } = {
    Container: BuildContainer,
    Row: BuildRow,
    Col: BuildCol,
    Select: BuildSelect,
    Text: BuildText,
    InputText: BuildInputText,
    Img: BuildImage
};

function Element(element: string, id: any, parentId: string, children?: []) {
    if (ElementBuilderSwitch[element]) {
        return ElementBuilderSwitch[element](id, parentId);
    }

    throw new Error(`Method '${element}' is not implemented.`);
}


function BuildContainer(elementId: string, parentId: string) {

    let tsx: Tsx<TsxBasicProps> = {
        element: "Container",
        props: {
            id: elementId,
            parentId: parentId,
            text: "New Container",
            css: {},
            className: ""
        },
        children: []
    }

    return (tsx)
}

export interface Tsx<T> {
    element: string
    props: T
    children?: Tsx<any>[]
}

export interface TsxBasicProps {
    id: string
    parentId: string
    text: string
    css: {}
    className: string
}

export interface TsxInputTextProps {
    id: string
    parentId: string
    text: string
    css: {}
    className: string
    type: string
}


export interface TsxSelectProps {
    id: string
    parentId: string
    text: string
    css: {}
    className: string
    options: Tsx<any>[]
}

export interface TsxImageProps {
    id: string
    parentId: string
    text: string
    css: {}
    className: string
    src: string
}




function BuildRow(elementId: string, parentId: string) {

    let tsx: Tsx<TsxBasicProps> = {
        element: "Row",
        props: {
            id: elementId,
            parentId: parentId,
            text: "New Row",
            css: {},
            className: ""
        },
        children: []
    }

    return (tsx)
}

function BuildCol(elementId: string, parentId: string) {

    let tsx: Tsx<TsxBasicProps> = {
        element: "Col",
        props: {
            id: elementId,
            parentId: parentId,
            text: "New Col",
            css: {},
            className: ""
        },
        children: []
    }

    return (tsx)
}

function BuildSelect(elementId: string, parentId: string) {

    let tsx: Tsx<TsxSelectProps> = {
        element: "Select",
        props: {
            id: elementId,
            parentId: parentId,
            text: "New Select",
            css: {},
            className: "",
            options: []
        },
        children: []
    }

    return (tsx)
}

function BuildText(elementId: string, parentId: string) {

    let tsx: Tsx<TsxBasicProps> = {
        element: "Text",
        props: {
            id: elementId,
            parentId: parentId,
            text: "New Text",
            css: {},
            className: ""
        },
    }

    return (tsx)
}


function BuildInputText(elementId: string, parentId: string) {

    let tsx: Tsx<TsxInputTextProps> = {
        element: "InputText",
        props: {
            id: elementId,
            parentId: parentId,
            text: "New InputText",
            css: {},
            className: "",
            type: "text"
        },
    }

    return (tsx)
}

function BuildImage(elementId: string, parentId: string) {

    let tsx: Tsx<TsxImageProps> = {
        element: "Img",
        props: {
            id: elementId,
            parentId: parentId,
            text: "New Image",
            css: {},
            className: "",
            src: "https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
        },
    }

    return (tsx)
}