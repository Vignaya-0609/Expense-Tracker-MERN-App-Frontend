import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ToastMessage from './ToastMessage';

function DeleteModal({ show, handleClose, transactionId, onTransactionChange }) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); 
  const [toastClr, setToastClr] = useState("");
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/transactionApi/deletetransaction/${transactionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setToastMessage("Transaction Deleted Successfully")
        setShowToast(false);
        setTimeout(() => setShowToast(true), 100);
        setToastClr("success");
        onTransactionChange();
        handleClose();
      } else {
        setToastMessage("Failed to delete Transaction")
        setShowToast(false);
        setTimeout(() => setShowToast(true), 100);
        setToastClr("danger");
      }
    } catch (error) {
      console.error('Error deleting Transaction:', error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Transaction Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this transaction? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastMessage showToast={showToast} toastMessage={toastMessage} toastClr={toastClr} />
    </>
  );
}

export default DeleteModal;
