import react from 'react';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

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

function Text(props: { text: string }) {

    return (
        <>
            <span>{props.text}</span>
        </>
    )
}

function Select(props: { options: any }) {

    let elementOptions: any = []

    props.options.forEach((option: { value: string, text: string }) => {
        elementOptions.push(<option value={option.value}>{option.text}</option>)
    })

    return (
        <>
            <Form.Select>
                {elementOptions}
            </Form.Select>
        </>
    )
}

function ContainerElement(props: any) {
    return (
        <>
            <Container>{TempletBuilder({ systemTemplet: props })}</Container>
        </>
    )
}





const elementSwitch: { [K: string]: Function } = {
    InputText: InputText,
    Text: Text,
    Select: Select,
    Container: ContainerElement
};

export function element(name: string, props: any) {
    if (elementSwitch[name]) {
        return elementSwitch[name](props);
    }

    throw new Error(`Method '${name}' is not implemented.`);
}