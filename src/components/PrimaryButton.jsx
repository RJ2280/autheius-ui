import React from 'react';
const PrimaryButton = ({ label, onClick }) => (
  <button className="primary-button" onClick={onClick}>{label}</button>
);
export default PrimaryButton;
