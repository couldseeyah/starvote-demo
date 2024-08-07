import { useState } from 'react';
import '../App.css';
import Toast from 'react-bootstrap/Toast';

export default function InstructionToast({ heading, content}) {

    const [show, setShow] = useState(true);

    return (
        <Toast bg='info' onClose={() => setShow(false)} show={show}>
            <Toast.Header>
                <strong className="me-auto">{heading}</strong>
            </Toast.Header>
            <Toast.Body>{content}</Toast.Body>
        </Toast>
    )
};
