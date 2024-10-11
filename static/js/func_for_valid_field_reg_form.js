'use strict';

function isEmptyField(valueField) {
    return valueField.trim() === "";
}

function isValidEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
}

function showEmptyFieldError(nameInput, errorElement) {
    nameInput.classList.remove("valid");
    nameInput.classList.add("invalid");
    errorElement.textContent = "Поле не может быть пустым.";
}

function showLengthPhoneNumber(nameInput, errorElement, blockCheckmark) {
    blockCheckmark.classList.remove('visible');
    nameInput.classList.remove("valid");
    nameInput.classList.add("invalid");
    errorElement.textContent =
        "Номер телефона должен содержать не менее 9 цифр.";
}

function showPasswordError(nameInput1,
                           nameInput2,
                           errorElement1,
                           errorElement2,
                           blockCheckmark1,
                           blockCheckmark2,
                           flag=true) {
    if (flag){
        nameInput1.classList.remove('valid');
        nameInput2.classList.remove('valid');
        blockCheckmark1.classList.remove("visible");
        blockCheckmark2.classList.remove("visible");
        nameInput1.classList.add("invalid");
        nameInput2.classList.add("invalid");
        errorElement1.textContent = 'Введенные пароли не совпадают';
        errorElement2.textContent = 'Введенные пароли не совпадают';
    } else {
        nameInput1.classList.remove('invalid');
        nameInput2.classList.remove('invalid');
        nameInput1.classList.add("valid");
        nameInput2.classList.add("valid");
        blockCheckmark1.classList.add("visible");
        blockCheckmark2.classList.add("visible");
        errorElement1.textContent = '';
        errorElement2.textContent = '';
    }
}

function handleSimpleFieldBlur(nameInput) {
    const valueField = nameInput.value;
    const errorElement = document.getElementById(nameInput.id + '-error');
    let flag = false;

    if (isEmptyField(valueField)) {
        showEmptyFieldError(nameInput, errorElement);
    } else {
        nameInput.classList.remove('invalid');
        errorElement.textContent = '';
        flag = true;
    }
    return flag
}

function handleEmailBlur(nameInput) {
    const valueField = nameInput.value;
    const errorElement = document.getElementById(nameInput.id + '-error');
    const blockCheckmark = nameInput.parentElement.querySelector('.checkmark');

    let flag = false;

    if (isEmptyField(valueField)) {
        showEmptyFieldError(nameInput, errorElement);
    } else if (!isValidEmail(valueField)) {
        nameInput.classList.remove("valid");
        nameInput.classList.add("invalid");
        errorElement.textContent = 'Введите корректный email';
        blockCheckmark.classList.remove("visible")
    } else {
        blockCheckmark.classList.add("visible");
        nameInput.classList.remove('invalid');
        nameInput.classList.add('valid');
        errorElement.textContent = '';
        flag = true;
    }
    return flag
}

function handlePassword1Blur(nameInput1, nameInput2) {
    const valueField1 = nameInput1.value.trim();
    const valueField2 = nameInput2.value.trim();
    const errorElement1 = document.getElementById(nameInput1.id + '-error');
    const errorElement2 = document.getElementById(nameInput2.id + '-error');
    const blockCheckmark1 = nameInput1.parentElement.querySelector('.checkmark');
    const blockCheckmark2 = nameInput2.parentElement.querySelector('.checkmark');

    let flag = false;

    if (isEmptyField(valueField1)) {
        blockCheckmark1.classList.remove("visible")
        showEmptyFieldError(nameInput1, errorElement1);
    } else if (valueField2.length !== 0 && valueField1 !== valueField2) {
        showPasswordError(nameInput1, nameInput2, errorElement1, errorElement2, blockCheckmark1, blockCheckmark2);
    } else if (valueField2.length !==0 && valueField1 === valueField2) {
        showPasswordError(nameInput1, nameInput2, errorElement1, errorElement2, blockCheckmark1, blockCheckmark2, flag=false);
        flag = true;
    } else {
        blockCheckmark1.classList.add("visible");
        nameInput1.classList.remove('invalid');
        nameInput1.classList.add('valid');
        errorElement1.textContent = '';
        flag = true;
    }
    return flag
}

function handlePassword2Blur(nameInput1, nameInput2) {
    const valueField1 = nameInput1.value.trim();
    const valueField2 = nameInput2.value.trim();
    const errorElement1 = document.getElementById(nameInput1.id + '-error');
    const errorElement2 = document.getElementById(nameInput2.id + '-error');
    const blockCheckmark1 = nameInput1.parentElement.querySelector('.checkmark');
    const blockCheckmark2 = nameInput2.parentElement.querySelector('.checkmark');

    let flag = false;

    if (isEmptyField(valueField2)) {
        blockCheckmark2.classList.remove("visible");
        showEmptyFieldError(nameInput2, errorElement2);
    } else if (valueField1 !== valueField2) {
        showPasswordError(nameInput1, nameInput2, errorElement1, errorElement2, blockCheckmark1, blockCheckmark2);
    } else if (valueField1 === valueField2) {
        showPasswordError(nameInput1, nameInput2, errorElement1, errorElement2, blockCheckmark1, blockCheckmark2, flag=false);
        flag = true;
    } else {
        blockCheckmark2.classList.add("visible");
        nameInput2.classList.remove('invalid');
        nameInput2.classList.add('valid');
        errorElement2.textContent = '';
        flag = true;
    }
    return flag
}

function handlePhoneNumberBlur(nameInput) {
    const valueField = nameInput.value;
    const unmaskedValue = $('#id_phone_number').inputmask('unmaskedvalue');
    const errorElement = document.getElementById(nameInput.id + '-error');
    const blockCheckmark = nameInput.parentElement.querySelector('.checkmark');

    let flag = false;

    console.log('type--',typeof valueField, valueField);
    console.log(typeof unmaskedValue, unmaskedValue)

    if (isEmptyField(valueField)) {
        blockCheckmark.classList.remove('visible');
        showEmptyFieldError(nameInput, errorElement);
    } else if (unmaskedValue.length < 9) {
        console.log('true', unmaskedValue.length);
        showLengthPhoneNumber(nameInput, errorElement, blockCheckmark)
    } else {
        blockCheckmark.classList.add('visible');
        nameInput.classList.remove('invalid');
        nameInput.classList.add('valid');
        errorElement.textContent = '';
        flag = true;
    }
    return flag
}