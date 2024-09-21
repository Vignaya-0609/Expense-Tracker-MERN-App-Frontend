import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function ToastMessage({ showToast, toastMessage, toastClr }) {
  const [show, setShow] = useState(showToast);

  useEffect(() => {
    setShow(showToast);
  }, [showToast]);

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast bg={toastClr} onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Body className='text-light'>{toastMessage}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
