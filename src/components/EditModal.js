import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ToastMessage from './ToastMessage';

function EditModal({ show, handleClose, onTransactionChange, transactionId }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState('');

  const [descriptionError, setDescriptionError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [loading, setLoading] = useState(true); // New state for loading
  const currentUser = JSON.parse(localStorage.getItem("TransactionUser"));

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); 
  const [toastClr, setToastClr] = useState("");

  useEffect(() => {
    if (show && transactionId) {
      fetchTransactionDetails(transactionId);
    } else {
      // Reset state when modal is closed
      resetForm();
    }
  }, [show, transactionId]);

  const fetchTransactionDetails = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/transactionApi/transaction/${id}`);
      const data = await response.json();
      
      // Pre-fill form fields with transaction details
      setDescription(data.transaction.description);
      setAmount(data.transaction.amount);
      setCategory(data.transaction.category);
      setTransactionType(data.transaction.transactionType);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setCategory('');
    setTransactionType('');
    setDescriptionError('');
    setAmountError('');
    setCategoryError('');
    setTypeError('');
  };

  const validateDescription = (value) => {
    if (!value || value.trim() === "") setDescriptionError('Description is required');
    else setDescriptionError('');
  };

  const validateAmount = (value) => {
    if (!value || value <= 0) setAmountError('Valid amount is required');
    else setAmountError('');
  };

  const validateCategory = (value) => {
    if (!value) setCategoryError('Category is required');
    else setCategoryError('');
  };

  const validateTransactionType = () => {
    if (!transactionType) setTypeError('Transaction type is required');
    else setTypeError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation on submit
    validateDescription(description);
    validateAmount(amount);
    validateCategory(category);
    validateTransactionType();

    if (description && amount > 0 && category && transactionType) {
      try {
        const response = await fetch(`http://localhost:5000/transactionApi/updatetransaction/${transactionId}`, {
          method: 'PUT', // Use PUT or PATCH for updates
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description, amount, category, transactionType, userId: currentUser._id }),
        });

        if (response.ok) {
          setToastMessage("Transaction Updated Successfully!");
          setToastClr("success");
          setShowToast(false); 
          setTimeout(() => setShowToast(true), 100);
          onTransactionChange();
          handleClose();
          resetForm();
        } else {
          setToastMessage("Failed to update transaction");
          setToastClr("danger");
          setShowToast(false);
          setTimeout(() => setShowToast(true), 100);
        }
      } catch (error) {
        setToastMessage("An error occurred while updating the transaction");
        setToastClr("danger");
        setShowToast(false);
        setTimeout(() => setShowToast(true), 100);
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div>Loading...</div> // Loading state
          ) : (
            <Form onSubmit={handleSubmit} className='transaction-form'>
              <h4 className='mb-3 text-center'>Edit Transaction</h4>

              {/* Description Input */}
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    validateDescription(e.target.value);
                  }}
                  onKeyUp={(e) => validateDescription(e.target.value)}
                />
                {descriptionError && <p className="text-danger" style={{ fontSize: "12px" }}>{descriptionError}</p>}
              </Form.Group>

              {/* Amount Input */}
              <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    validateAmount(e.target.value);
                  }}
                  onKeyUp={(e) => validateAmount(e.target.value)}
                />
                {amountError && <p className="text-danger" style={{ fontSize: "12px" }}>{amountError}</p>}
              </Form.Group>

              {/* Category Select */}
              <Form.Group className="mb-3" controlId="formBasicSelect">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    validateCategory(e.target.value);
                  }}
                  onKeyUp={(e) => validateCategory(e.target.value)}
                >
                  <option disabled value="">Choose Category</option>
                  <option value="Salary">Salary</option>
                  <option value="Investment">Investment</option>
                  <option value="Housing">Housing</option>
                  <option value="Food">Food</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Others">Others</option>
                </Form.Select>
                {categoryError && <p className="text-danger" style={{ fontSize: "12px" }}>{categoryError}</p>}
              </Form.Group>

              {/* Transaction Type Radio Buttons */}
              <Form.Group className="mb-3">
                <Form.Label>Transaction Type</Form.Label>
                <div className="d-flex flex-wrap justify-content-between">
                  <div className="radio-box-wrapper flex-grow-1">
                    <input
                      type="radio"
                      id="income"
                      name="transactionType"
                      value="income"
                      checked={transactionType === 'income'}
                      onChange={() => {
                        setTransactionType('income');
                        if (typeError) setTypeError('');
                      }}
                    />
                    <label
                      htmlFor="income"
                      className={`radio-box ${transactionType === 'income' ? 'selected' : ''}`}
                    >
                      Income
                    </label>
                  </div>
                  <div className="radio-box-wrapper flex-grow-1">
                    <input
                      type="radio"
                      id="expense"
                      name="transactionType"
                      value="expense"
                      checked={transactionType === 'expense'}
                      onChange={() => {
                        setTransactionType('expense');
                        if (typeError) setTypeError('');
                      }}
                    />
                    <label
                      htmlFor="expense"
                      className={`radio-box ${transactionType === 'expense' ? 'selected' : ''}`}
                    >
                      Expense
                    </label>
                  </div>
                </div>
                {typeError && <p className="text-danger" style={{ fontSize: "12px" }}>{typeError}</p>}
              </Form.Group>

              {/* Submit Button */}
              <Button variant="" className='w-100 btn-clr' type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      <ToastMessage showToast={showToast} toastMessage={toastMessage} toastClr={toastClr} />
    </>
  );
}

export default EditModal;
