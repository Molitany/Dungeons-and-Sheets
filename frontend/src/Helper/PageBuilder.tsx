import { Container } from "react-bootstrap"
import { ElementBuilder, Tsx, TsxBasicProps } from "./ElementBuilder"


export interface TsxPageProps {
    id: string
    parentId: string
    text: string
    css: {}
    className: string
    pages: Tsx<any>[]
    defaultPage: number
}

function BuildPage(elementId: string, parentId: string) {

    let tsx: Tsx<TsxPageProps> = {
        element: "Row",
        props: {
            id: elementId,
            parentId: parentId,
            text: "",
            css: {},
            className: "",
            pages: [ElementBuilder("Container", elementId + "Page1", elementId)],
            defaultPage: 1
        },
        children: []
    }



    let page: Tsx<TsxBasicProps> = {
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

    return (
        tsx
    )
}
