import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function Instructions({ show, handleClose, imageSrc, heading }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ textAlign: 'center', width: '100%' }}>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <img src={imageSrc} alt="Popup" style={{ width: '80%' }} />
      </Modal.Body>
    </Modal>

  );
}

export default Instructions;
