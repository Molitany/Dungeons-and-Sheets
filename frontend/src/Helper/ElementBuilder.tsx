import { propTypes } from "react-bootstrap/esm/Image"

export function ElementBuilder(element: string, id: string) {
    return Element(element, id)

}

const ElementBuilderSwitch: { [K: string]: Function } = {
    Container: BuildContainer,
    Row: BuildRow,
    Col: BuildCol
};

function Element(element: string, props: any, children?: []) {
    if (ElementBuilderSwitch[element]) {
        return ElementBuilderSwitch[element](props, children);
    }

    throw new Error(`Method '${element}' is not implemented.`);
}


function BuildContainer(elementId: string) {

    let tsx: Tsx<TsxBasicProps> = {
        element: "Container",
        props: {
            id: elementId,
            style: {},
            text: "New Container"
        },
        children: []
    }

    return (tsx)
}

interface Tsx<T> {
    element: string
    props: T
    children: []
}

interface TsxBasicProps {
    id: string
    style: TsxStyle
    text: string
}

interface TsxStyle {
    css?: string
    className?: string
}

function BuildRow(elementId: string) {

    let tsx: Tsx<TsxBasicProps> = {
        element: "Row",
        props: {
            id: elementId,
            style: {},
            text: "New Row"
        },
        children: []
    }

    return (tsx)
}

function BuildCol(elementId: string) {

    let tsx: Tsx<TsxBasicProps> = {
        element: "Col",
        props: {
            id: elementId,
            style: {},
            text: "New Col"
        },
        children: []
    }

    return (tsx)
}