import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../VotingCompleteModal.css';

function VotingCompleteModal() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    return (
        <Modal centered show={show} onHide={handleClose} style={{ textAlign: 'center', width: '100%' }}>
            <Modal.Header closeButton>
                <Modal.Title style={{ textAlign: 'center', width: '100%' }}>Voting Complete!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div class="wrapper">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                </div>
                <p style={{fontSize: '1.1em'}}>Voting phase of elections is complete. Proceed to next step for voting tally and verification.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default VotingCompleteModal;
