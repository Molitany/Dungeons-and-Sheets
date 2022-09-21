import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap';
// import ElementToJason from '../../Helper/ElementPaser'
import "./SystemBuilder.css"
import { ElementBuilder } from "../../Helper/ElementBuilder"
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

const tsxProps = [
    "id",
    "type",
    "value",
    "style",
    "options",
    "onclick",
    "text"
]

interface TSX {
    element: string
    props: TSXProp
    children?: TSX[]
}
function SystemBuilder() {
    // systemMode = true

    const handleClose = () => setShowBuilder(false);

    function Builder(event: any) {
        event.stopPropagation()

        const id: string = event.target.id

        let element = FindElement([], id, tempJSON)
        if (!element)
            return

        setParentID(id)
        setShowBuilder(true)
    }
    const [parentID, setParentID] = useState<string>("")
    const [tempJSON, setTempJSON] = useState<any[]>([
        {
            element: "Container", props: { id: "root", style: { css: { border: "1px solid" } }, text: "New Container" }, children: []
        }]);

    const [showBuilder, setShowBuilder] = useState(false);

    function InsertProps() {
        let parent: any = FindElement([], parentID, tempJSON)
        if (!parent)
            return

        let propsElements: Array<JSX.Element> = []
        Object.keys(parent.props).forEach(key => {
            propsElements.push(
                <Row>
                    <Col className="d-grid gap-4">
                        <InputGroup>
                            <InputGroup.Text className="col-2">{key}</InputGroup.Text>
                            <Form.Control as="textarea" aria-label="With textarea" defaultValue={parent.props?.[key]} />
                        </InputGroup>
                    </Col>
                </Row>
            )
        })

        return (
            <Container fluid="md">{propsElements}</Container>
        )
    }

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

        parent.props.text = ""

        // let newChild: TSX = { element: childElement, props: { id: `${newId++}`, text: `New: ${childElement}`, style: { css: { border: "1px solid" } }, onClick: Builder } }
        let newChild: any = ElementBuilder(childElement, `${newId++}`)

        parent.children.push(newChild)

        setTempJSON([DeepCopy(tempJSON[0])])
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
            <Container
                onClick={(e) => Builder(e)}>
                {TempletBuilder(tempJSON)}
            </Container>

            <Modal style={{ marginRight: "0px" }} show={showBuilder} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Builder Options on id: {parentID}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {InsertProps()}
                </Modal.Body>
                <Modal.Footer>
                    {InsertOptions()}
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

    if (element.props.id == id) {
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
            id={props.id}
            key={props.id}
        >
            {props.text}
        </span>
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
            // onClick={(e) => props.onClick!(e, props.id)}
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
            // onClick={(e) => props.onClick!(e, props.id)}
            onMouseEnter={() => console.log(props.id)}
            id={props.id}
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
            // onClick={(e) => props.onClick!(e, props.id)}
            onMouseEnter={() => console.log(props.id)}
            id={props.id}
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
            // onClick={(e) => props.onClick!(e, props.id)}
            onMouseEnter={() => console.log(props.id)}
            className={props.style?.className}
            id={props.id}
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
