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

        let element = FindElement([], id, tempJSON)
        console.log(element);

        if (!element)
            return

        setParentID(id)
        setShowBuilder(true)
        console.log(id)
        console.log(element)
    }

    const [parentID, setParentID] = useState<string>("")
    const [tempJSON, setTempJSON] = useState<TSX[]>([
        {
            element: "Container", props: { id: "root", onClick: builder, style: { css: { minHeight: "200px", border: "1px solid" } } }, children: [
                { element: "Row", props: { id: "row1", onClick: builder, text: "New: Row" }, children: [] }]
        }]);

    const [showBuilder, setShowBuilder] = useState(false);

    function InsertOptions() {

        let options: Array<JSX.Element> = []

        Object.keys(elementSwitch).forEach((element) => {
            options.push(<Row onClick={() => AddElement(parentID, element)}><Col className="d-grid gap-4"><Button variant="secondary">{element}</Button></Col></Row>)
        })

        return (
            <Container fluid="md">{options}</Container>
        )
    }

    function AddElement(parentID: string, childElement: string) {

        let parent = FindElement([], parentID, tempJSON)

        if (!parent)
            return

        if (!parent.children)
            parent.children = []

        let newChild: TSX = { element: childElement, props: { id: `${newId++}`, text: `New: ${childElement}`, onClick: builder } }

        console.log("Added element")
        console.log(newChild)

        parent.children.push(newChild)

        setTempJSON(JSON.parse(JSON.stringify(tempJSON)))
        setTempJSON([DeepCopy(tempJSON[0])])
        let temp1 = JSON.parse(JSON.stringify(tempJSON))
        let temp2 = [DeepCopy(tempJSON[0])]

        console.log(tempJSON)
    }
    function DeepCopy(obj: any) {
        let deepCopy: any = {}

        Object.keys(obj).forEach((key: string) => {
            if (Array.isArray(obj[key])) {
                deepCopy[key] = []
                for (let i = 0; i < obj[key].length; i++) {
                    deepCopy[key][i] = DeepCopy(obj[key][i])
                }
            }
            else {
                deepCopy[key] = obj[key]
            }
        })
        return deepCopy
    }

    return (
        <>
            {TempletBuilder(tempJSON)}

            <Modal style={{ marginRight: "0px" }} show={showBuilder} onHide={handleClose} backdrop={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Builder Options on id: {parentID}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {InsertOptions()}
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )
}

let newId = 0

function FindElement(queue: TSX[], id: string, perent?: TSX[]): TSX | null {

    if (perent)
        queue.push(...perent)

    let element = queue.shift()

    if (!element)
        return null

    if (element.props.id === id) {
        return element
    }

    if (element.children)
        queue.push(...element.children)


    return FindElement(queue, id)
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
            onMouseEnter={() => console.log(props.id)}
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
