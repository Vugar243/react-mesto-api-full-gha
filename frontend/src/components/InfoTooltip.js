import React from 'react';

function InfoTooltip({ isOpen, onClose, message, isSuccess }) {
  return (
    <div className="popup popup_opened">
      <div className="popup__info-tooltip">
        <button className="popup__close-button" onClick={onClose}></button>
        {isSuccess ? (
            <div className="popup__success-icon"/>
          ) : (
            <div className="popup__error-icon"/>
          )}
        <p className="popup__info-message">{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
