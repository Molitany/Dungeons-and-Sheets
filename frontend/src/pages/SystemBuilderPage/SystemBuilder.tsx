import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import ElementToJason from '../../Helper/ElementPaser'
import "./SystemBuilder.css"
let systemMode = false


interface TSXProp {
    id: string
    type?: string
    value?: string
    style?: any
    options?: TSX[]
    onClick?: Function
    text?: string
}
interface TSX {
    element: string
    props: TSXProp
    children?: TSX[]
}
function SystemBuilder() {
    systemMode = true

    const handleClose = () => setShowBuilder(false);

    function builder(event: any, id: string) {
        event.stopPropagation()

        console.log(event);
        let element = FindElement(tempJSON, id)

        if (event.taget === event.currentTarget) {
            // 👇 your logic here
        }

        if (!element)
            return

        setBuildObject(element)
        setShowBuilder(true)
        console.log(id)
        console.log(element)
    }
    const [buildObject, setBuildObject] = useState<TSX>()
    //// copy tempJSON
    const [tempJSON, setTempJSON] = useState<TSX[]>([
        {
            element: "Container", props: { id: "root", onClick: builder, style: { css: { minHeight: "200px", border: "1px solid" } } }, children: [
                { element: "Row", props: { id: "row1", onClick: builder, text: "New: Row" }, children: [] }]
        }]);
    const [showBuilder, setShowBuilder] = useState(false);

    function InsertOptions() {

        let options: Array<JSX.Element> = []

        Object.keys(elementSwitch).forEach((element) => {
            options.push(<Row onClick={() => AddElement(buildObject, element)} style={{ border: "1px solid" }}><Col>{element}</Col></Row>)
        })

        return (
            <>{options}</>
        )
    }

    function AddElement(parent: TSX | undefined, childElement: string) {

        if (!parent)
            return

        if (!parent.children)
            parent.children = []

        let newChild: TSX = { element: childElement, props: { id: `${newId++}`, text: `New: ${childElement}`, onClick: builder } }

        parent.children.push(newChild)
    }


    return (
        <>
            {TempletBuilder(tempJSON)}

            <Modal style={{ marginRight: "0px" }} show={showBuilder} onHide={handleClose} backdrop={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Builder Options on id: {buildObject?.props.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body><Container>
                    {InsertOptions()}
                </Container></Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )
}

let newId = 0






function FindElement(root: TSX[], id: string): TSX | null {
    for (let element of root) {
        if (element.props.id === id) {
            return element
        }
        else if (element.children)
            return FindElement(element.children!, id)
    }

    return null
}


function TempletBuilder(elements: TSX[]) {

    if (!elements)
        return

    let templet: any = []
    elements.forEach((item: TSX) => {
        templet.push(element(item.element, item.props, item.children))
    })

    return (
        <>
            {templet}
        </>
    )
}

function InputText(props: TSXProp, children: TSX[]) {

    return (
        <>
            <Form.Label>{props.text}</Form.Label>
            <Form.Control
                type={props.type}
                id={props.id}
                key={props.id}
            />
        </>
    )
}

function Text(props: TSXProp) {

    return (
        <span
            className={props.style?.className}
            style={props.style?.css}
            key={props.id}
        >
            {props.text}</span>
    )
}

function Select(props: TSXProp) {

    let elementOptions: any = []
    let optionId = 0
    props.options?.forEach((option: TSX) => {

        elementOptions.push(<option value={option.props.value} key={props.id + `${optionId++}`}>{option.props.text}</option>)
    })

    return (
        <Form.Select
            onClick={(e) => props.onClick!(e, props.id)}
            className={props.style?.className}
            style={props.style?.css}
            key={props.id}
        >
            {props.text}
            {elementOptions}
        </Form.Select>
    )
}

function ContainerElement(props: TSXProp, children: TSX[]) {
    return (
        <Container
            onClick={(e) => props.onClick!(e, props.id)}
            onMouseEnter={() => console.log(props.id)}

            key={props.id}
            className={props.style?.className}
            style={props.style?.css}
        >
            {props.text}
            {TempletBuilder(children)}

        </Container>
    )
}

function RowElement(props: TSXProp, children: TSX[]) {
    return (
        <Row
            onClick={(e) => props.onClick!(e, props.id)}
            onMouseEnter={() => console.log(props.id)}
            key={props.id}
            className={props.style?.className}
            style={props.style?.css}
        >
            {props.text}
            {TempletBuilder(children)}
        </Row>
    )
}

function ColElement(props: TSXProp, children: TSX[]) {
    return (
        <Col
            onClick={(e) => props.onClick!(e, props.id)}
            className={props.style?.className}
            key={props.id}
            style={props.style?.css}
        >
            {props.text}
            {TempletBuilder(children)}
        </Col>
    )
}



const elementSwitch: { [K: string]: Function } = {
    InputText: InputText,
    Text: Text,
    Select: Select,
    Container: ContainerElement,
    // Div: DivContainer,
    Row: RowElement,
    Col: ColElement
};

function element(name: string, props: TSXProp, children?: TSX[]) {
    if (elementSwitch[name]) {
        return elementSwitch[name](props, children);
    }

    throw new Error(`Method '${name}' is not implemented.`);
}

export { SystemBuilder, TempletBuilder };
