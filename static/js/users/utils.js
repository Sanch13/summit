"use strict";

import {errorMessages} from './messages.js';


export function validateInput(elementId, errorElement, isValid) {
    const inputElement = document.getElementById(elementId);

    if (isValid) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
        errorElement.textContent = '';
    } else {
        inputElement.classList.remove('is-valid');
        inputElement.classList.add('is-invalid');
        errorElement.textContent = errorMessages[elementId];
    }
}

export function isValidEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
}
export function isValidPhone(phoneStr) {
    const pattern = /^\+375\(\d{2}\)\d{3}-\d{2}-\d{2}$/;
    return pattern.test(phoneStr);
}

export function isValidPasswordLength(value) {
    return value.length >= 8;
}

export function isNumericPassword(value) {
    return /^\d+$/.test(value);
}

export function isEmptyField(value) {
    return value.trim() === "";
}

export function arePasswordsEqual(password1, password2) {
    return password1.trim() === password2.trim();
}

export function showEmptyFieldError(elementId, errorElement) {
    document.getElementById(elementId).classList.remove('is-valid');
    document.getElementById(elementId).classList.add('is-invalid');
    errorElement.textContent = errorMessages.emptyField;
}

export function showPasswordLengthError(elementId, errorElement) {
    document.getElementById(elementId).classList.add('is-invalid');
    errorElement.textContent = errorMessages.passwordLength;
}

export function showPasswordNumericError(elementId, errorElement) {
    document.getElementById(elementId).classList.add('is-invalid');
    errorElement.textContent = errorMessages.passwordNumeric;
}

export function showPasswordCommonError(elementId, errorElement, errorMessages) {
    document.getElementById(elementId).classList.add('is-invalid');
    errorElement.textContent = errorMessages;
}

export function showEmailExistsError(elementId, errorElement) {
    document.getElementById(elementId).classList.add('is-invalid');
    errorElement.textContent = errorMessages.id_email_exists;
}

export function showPhoneExistsError(elementId, errorElement) {
    document.getElementById(elementId).classList.add('is-invalid');
    errorElement.textContent = errorMessages.id_phone_exists;
}

export function showPasswordEqualError(isValid) {
    if (isValid) {
        document.getElementById('id_password1').classList.remove('is-invalid');
        document.getElementById('id_password1').classList.add('is-valid');
        document.getElementById('id_password2').classList.remove('is-invalid');
        document.getElementById('id_password2').classList.add('is-valid');
        document.getElementById('id_password1-error').textContent = "";
        document.getElementById('id_password2-error').textContent = "";
    } else {
        document.getElementById('id_password1').classList.remove('is-valid');
        document.getElementById('id_password1').classList.add('is-invalid');
        document.getElementById('id_password2').classList.remove('is-valid');
        document.getElementById('id_password2').classList.add('is-invalid');
        document.getElementById('id_password1-error').textContent = "Введенные пароли не совпадают.";
        document.getElementById('id_password2-error').textContent = "Введенные пароли не совпадают.";
    }
}

export function sendCheckCommonPassword(elementId, errorElement) {
    const valuePassword1 = document.getElementById('id_password1').value;
    const valuePassword2 = document.getElementById('id_password2').value;
    $.ajax({
            url: '/api/check-password/',
            method: 'POST',
            data: JSON.stringify({
                'password': valuePassword1
            }),
            contentType: 'application/json',
            success: function (response) {
                if (response.valid) {
                    if (valuePassword2 !== '') {
                        showPasswordEqualError(arePasswordsEqual(valuePassword1, valuePassword2));
                    } else {
                        validateInput(elementId, errorElement, response.valid);
                    }
                } else {
                    showPasswordCommonError(elementId, errorElement, response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error('Ошибка при проверке пароля:', error);
            }
        });
}

export function sendCheckEmail(elementId, errorElement) {
    $.ajax({
            url: '/api/check-email',
            method: 'GET',
            data: {
                email: document.getElementById("id_email").value
            },
            success: function (response) {
                if (response.valid) {
                    validateInput(elementId, errorElement, response.valid);
                } else {
                    showEmailExistsError(elementId, errorElement);
                }
            },
        });
}

export function sendCheckPhoneNumber(elementId, errorElement) {
    $.ajax({
            url: '/api/check_phone',
            method: 'GET',
            data: { phone_number: document.getElementById("id_phone_number").value },
            success: function (response) {
                if (response.valid) {
                    validateInput(elementId, errorElement, response.valid)
                } else {
                    showPhoneExistsError(elementId, errorElement)
                }
            },

        });
}
