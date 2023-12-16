import React, { useEffect } from 'react';


function PopupWithForm({ name, title, isOpen, onClose, children, onSubmit, submitButtonText, formValidator }) {
  useEffect(() => {
    if (isOpen) {
      // Iterate through the formValidators and apply forceButtonState to the relevant form
      for (const formName in formValidator) {
        formValidator[formName].forceButtonState(document.querySelector(`[name="${formName}"] .popup__form-submit`));
      }
    }
  }, [isOpen]);
  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <form name={name} className={`popup__form popup__form_${name}-form`} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className={`popup__save-button popup__form-submit popup__save-button_${name}`}>{submitButtonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

