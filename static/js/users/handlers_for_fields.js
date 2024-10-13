'use strict';
import {
    validateInput,
    isEmptyField,
    isValidEmail,
    isValidPasswordLength,
    isNumericPassword,
    isValidPhone,
    arePasswordsEqual,
    showEmptyFieldError,
    showPasswordLengthError,
    showPasswordNumericError,
    showPasswordEqualError,
    sendCheckCommonPassword,
    sendCheckEmail,
    sendCheckPhoneNumber,
} from './utils.js';


document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById('id_email');
    const password1Input = document.getElementById('id_password1');
    const password2Input = document.getElementById('id_password2');
    const phoneInput = document.getElementById('id_phone_number');
    const firstNameInput = document.getElementById('id_first_name');
    const lastNameInput = document.getElementById('id_last_name');

    emailInput.addEventListener('blur', handleBlurEmail);
    password1Input.addEventListener('blur', handlePassword1Blur);
    password2Input.addEventListener('blur', handlePassword2Blur);
    phoneInput.addEventListener('blur', handlePhoneNumberBlur);
    firstNameInput.addEventListener('blur', handleFirstNameBlur);
    lastNameInput.addEventListener('blur', handleLastNameBlur);

});

function handleBlurEmail() {
    const elementId = 'id_email';
    const valueField = document.getElementById('id_email').value;
    const errorElement = document.getElementById(elementId + '-error');

    if (isEmptyField(valueField)) {
        showEmptyFieldError(elementId, errorElement);
    } else if (isValidEmail(valueField)) {
        sendCheckEmail(elementId, errorElement);
    } else {
        validateInput(elementId, errorElement, isValidEmail(valueField));
    }
}

function handlePassword1Blur() {
    const elementId = 'id_password1';
    const valuePassword1 = document.getElementById('id_password1').value;
    const errorElement = document.getElementById(elementId + '-error');

    if (isEmptyField(valuePassword1)) {
        showEmptyFieldError(elementId, errorElement);
    } else if (!isValidPasswordLength(valuePassword1)) {
        showPasswordLengthError(elementId, errorElement);
    } else if (isNumericPassword(valuePassword1)) {
        showPasswordNumericError(elementId, errorElement);
    } else {
        sendCheckCommonPassword(elementId, errorElement);
    }


}

function handlePassword2Blur() {
    const elementId = 'id_password2';
    const errorElement = document.getElementById(elementId + '-error');
    const valuePassword1 = document.getElementById('id_password1').value;
    const valuePassword2 = document.getElementById('id_password2').value;
    if (isEmptyField(valuePassword2)) {
        showEmptyFieldError(elementId, errorElement);
    } else if (!isValidPasswordLength(valuePassword2)) {
        showPasswordLengthError(elementId, errorElement);
    } else if (isNumericPassword(valuePassword2)) {
        showPasswordNumericError(elementId, errorElement);
    } else {
        if (valuePassword1 !== "") {
            showPasswordEqualError(arePasswordsEqual(valuePassword1, valuePassword2));
        } else {
            validateInput(elementId, errorElement, arePasswordsEqual(valuePassword1, valuePassword2));
        }
    }
}

function handlePhoneNumberBlur() {
    const elementId = 'id_phone_number';
    const errorElement = document.getElementById(elementId + '-error');
    const valuePhone = document.getElementById('id_phone_number').value;
    if (isEmptyField(valuePhone)) {
        showEmptyFieldError(elementId, errorElement);
    } else if (isValidPhone(valuePhone)) {
        sendCheckPhoneNumber(elementId, errorElement);
    } else {
        validateInput(elementId, errorElement, isValidPhone(valuePhone));
    }


}

function handleFirstNameBlur() {
    const elementId = 'id_first_name';
    const valueField = document.getElementById('id_first_name').value;
    const errorElement = document.getElementById(elementId + '-error');

    if (isEmptyField(valueField)) {
        showEmptyFieldError(elementId, errorElement);
    } else {
        validateInput(elementId, errorElement, true);
    }
}

function handleLastNameBlur() {
    const elementId = 'id_last_name';
    const valueField = document.getElementById('id_last_name').value;
    const errorElement = document.getElementById(elementId + '-error');

    if (isEmptyField(valueField)) {
        showEmptyFieldError(elementId, errorElement);
    } else {
        validateInput(elementId, errorElement, true);
    }
}
