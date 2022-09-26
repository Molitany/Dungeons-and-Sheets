import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap';
// import ElementToJason from '../../Helper/ElementPaser'
import "./SystemBuilder.css"
import { ElementBuilder, Tsx, TsxBasicProps, TsxImageProps, TsxInputTextProps, TsxSelectProps } from "../../Helper/ElementBuilder"

function SystemBuilder() {
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
    const [editMode, setEditMode] = useState<boolean>(true)
    const [parentID, setParentID] = useState<string>("")
    const [tempJSON, setTempJSON] = useState<any[]>([
        {
            element: "Container", props: { id: "root", css: { border: "1px solid" }, className: "", text: "New Container" }, children: []
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
                            <InputGroup.Text className="col-3">{key}</InputGroup.Text>
                            <Form.Control id={key} as="textarea" aria-label="With textarea" defaultValue={JSON.stringify(parent.props?.[key])} />
                        </InputGroup>
                    </Col>
                </Row>
            )
        })

        function Delete(elementId: string) {
            let child: any = FindElement([], elementId, tempJSON)
            if (!child)
                return

            let parent: any = FindElement([], child.props.parentId, tempJSON)
            if (!parent)
                return

            parent.children.forEach((element: Tsx<any>, index: number) => {
                if (element.props.id == elementId)
                    parent.children.splice(index, 1)
            })

            setTempJSON([DeepCopy(tempJSON[0])])

        }

        return (
            <Container fluid="md">
                <Form onSubmit={(event) => OnPropsSave(event)}>
                    {propsElements}
                    <Row>
                        <InputGroup >
                            <Col className="d-grid gap-4" >
                                <Button variant="primary" type="submit" style={{ width: "100%" }}>
                                    Save
                                </Button>

                            </Col>
                            <Col>
                                <Button variant="danger" onClick={() => Delete(parentID)} style={{ width: "100%" }}>
                                    Delete
                                </Button>
                            </Col>
                        </InputGroup>
                    </Row>
                </Form>
            </Container >
        )
    }

    function OnPropsSave(event: any) {
        event.preventDefault();

        let parent: Tsx<any> | null = FindElement([], parentID, tempJSON)
        if (!parent)
            return

        for (let i = 0; i < event.target.length - 2; i++) {
            parent!.props[event.target[i].id] = event.target[i].value
            parent!.props[event.target[i].id] = JSON.parse(parent!.props[event.target[i].id])
        }
        setParentID(parent.props.id)
        setTempJSON([DeepCopy(tempJSON[0])])
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
        let newChild: Tsx<any> = ElementBuilder(childElement, `${newId++}`, parentID)

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

            <Form.Check
                type="switch"
                id="custom-switch"
                label="Edit Mode"
                defaultChecked={editMode}
                onChange={() => setEditMode(!editMode)}
            />
            <Container
                onClick={(e) => {
                    if (editMode)
                        Builder(e)
                }}>
                {TempletBuilder(tempJSON)}
            </Container>

            <Modal style={{ marginRight: "0px" }} show={showBuilder} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Builder Options on {FindElement([], parentID, tempJSON)?.element} id: {parentID}</Modal.Title>
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

function FindElement(queue: Tsx<any>[], id: string, perent?: Tsx<any>[]): Tsx<any> | null {

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

function TempletBuilder(elements: Tsx<any>[]) {

    if (!elements)
        return

    let templet: any = []
    elements.forEach((item: Tsx<any>) => {
        templet.push(element(item.element, item.props, item.children))
    })

    return (
        <>
            {templet}
        </>
    )
}

function InputText(props: TsxInputTextProps, children: Tsx<any>[]) {

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

function Text(props: TsxBasicProps) {

    return (
        <span
            className={props.className}
            style={props.css}
            id={props.id}
            key={props.id}
        >
            {props.text}
        </span>
    )
}

function Select(props: TsxSelectProps) {

    let elementOptions: any = []
    let optionId = 0
    props.options.forEach((option: Tsx<any>) => {

        elementOptions.push(<option value={option.props.value} key={props.id + `${optionId++}`}>{option.props.text}</option>)
    })

    return (
        <Form.Select
            className={props.className}
            style={props.css}
            key={props.id}
        >
            {props.text}
            {elementOptions}
        </Form.Select>
    )
}

function ContainerElement(props: TsxBasicProps, children: Tsx<any>[]) {
    return (
        <Container
            id={props.id}
            key={props.id}
            className={props.className}
            style={props.css}
        >
            {props.text}
            {TempletBuilder(children)}

        </Container>
    )
}

function RowElement(props: TsxBasicProps, children: Tsx<any>[]) {
    return (
        <Row
            id={props.id}
            key={props.id}
            className={props.className}
            style={props.css}
        >
            {props.text}
            {TempletBuilder(children)}
        </Row>
    )
}

function ColElement(props: TsxBasicProps, children: Tsx<any>[]) {
    return (
        <Col
            id={props.id}
            key={props.id}
            className={props.className}
            style={props.css}
        >
            {props.text}
            {TempletBuilder(children)}
        </Col>
    )
}

function ImgElement(props: TsxImageProps, children: Tsx<any>[]) {
    return (
        <img
            id={props.id}
            key={props.id}
            className={props.className}
            style={props.css}
            src={props.src}
        >
        </img>
    )
}

const elementSwitch: { [K: string]: Function } = {
    InputText: InputText,
    Text: Text,
    Select: Select,
    Container: ContainerElement,
    Row: RowElement,
    Col: ColElement,
    Img: ImgElement
};

function element(name: string, props: any, children?: Tsx<any>[]) {
    if (elementSwitch[name]) {
        return elementSwitch[name](props, children);
    }

    throw new Error(`Method '${name}' is not implemented.`);
}

export { SystemBuilder, TempletBuilder };
