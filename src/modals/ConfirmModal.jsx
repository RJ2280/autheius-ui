import React from 'react';
const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className="modal">
    <p>{message}</p>
    <button onClick={onConfirm}>Confirm</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
);
export default ConfirmModal;
