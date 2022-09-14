import react from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

export default function TempletBuilder(props: { systemTemplet: any }) {

    let templet: any = []

    props.systemTemplet.forEach((item: any) => {
        let temp = element(item.element, item.props)

        templet.push(temp)
    })

    return (
        <>
            {templet}
        </>
    )
}

function InputText(props: { title: string; type: string; id: string; }) {

    return (
        <>
            <Form.Label>{props.title}</Form.Label>
            <Form.Control
                type={props.type}
                id={props.id}
            />
        </>
    )
}

function Text(props: { text: string, style: { className: string, css: any } }) {

    return (
        <span
            className={props.style?.className}
            style={props.style?.css}
        >{props.text}</span>
    )
}

function Select(props: { options: any, style: { className: string, css: any } }) {

    let elementOptions: any = []

    props.options.forEach((option: { value: string, text: string }) => {
        elementOptions.push(<option value={option.value}>{option.text}</option>)
    })

    return (
        <Form.Select
            className={props.style?.className}
            style={props.style?.css}>
            {elementOptions}
        </Form.Select>
    )
}

function ContainerElement(props: any) {
    return (
        <Container
            className={props.style?.className}
            style={props.style?.css}>
            {TempletBuilder(props)}
        </Container>
    )
}

// function DivContainer(props: { className: string, element: any }) {

//     return (
//         <div className={props.className}>{props.element}</div>
//     )

// }

function RowElement(props: any) {
    return (
        <Row
            className={props.style?.className}
            style={props.style?.css}>
            {TempletBuilder(props)}
        </Row>
    )
}

function ColElement(props: any) {
    return (
        <Col
            className={props.style?.className}
            style={props.style?.css}>
            {TempletBuilder(props)}
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

export function element(name: string, props: any) {
    if (elementSwitch[name]) {
        return elementSwitch[name](props);
    }

    throw new Error(`Method '${name}' is not implemented.`);
}