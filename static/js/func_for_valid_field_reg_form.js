'use strict';

function isEmptyField(valueField) {
    return valueField.trim() === "";
}

function isValidEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
}

function showEmptyFieldError(nameInput, errorElement) {
    nameInput.classList.add("invalid");
    errorElement.textContent = "Поле не может быть пустым.";
}

function showLengthPhoneNumber(nameInput, errorElement) {
    nameInput.classList.add("invalid");
    errorElement.textContent =
        "Номер телефона должен содержать не менее 9 цифр.";
}

function showPasswordError(nameInput1,
                           nameInput2,
                           errorElement1,
                           errorElement2,
                           flag=true) {
    if (flag){
        nameInput1.classList.remove('valid');
        nameInput2.classList.remove('valid');
        nameInput1.classList.add("invalid");
        nameInput2.classList.add("invalid");
        errorElement1.textContent = 'Введенные пароли не совпадают';
        errorElement2.textContent = 'Введенные пароли не совпадают';
    } else {
        nameInput1.classList.remove('invalid');
        nameInput2.classList.remove('invalid');
        nameInput1.classList.add("valid");
        nameInput2.classList.add("valid");
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

function handlePhoneNumberBlur(nameInput) {
    const valueField = nameInput.value;
    const unmaskedValue = $('#id_phone_number').inputmask('unmaskedvalue');
    const errorElement = document.getElementById(nameInput.id + '-error');
    let flag = false;

    console.log('type--',typeof valueField, valueField);
    console.log(typeof unmaskedValue, unmaskedValue)

    if (isEmptyField(valueField)) {
        showEmptyFieldError(nameInput, errorElement);
    } else if (unmaskedValue.length < 9) {
        console.log('true', valueField.length);
        showLengthPhoneNumber(nameInput, errorElement)
    } else {
        nameInput.classList.remove('invalid');
        nameInput.classList.add('valid');
        errorElement.textContent = '';
        flag = true;
    }
    return flag
}

function handleEmailBlur(nameInput) {
    const valueField = nameInput.value;
    const errorElement = document.getElementById(nameInput.id + '-error');
    let flag = false;

    if (isEmptyField(valueField)) {
        showEmptyFieldError(nameInput, errorElement);
    } else if (!isValidEmail(valueField)) {
        nameInput.classList.add("invalid");
        errorElement.textContent = 'Введите корректный email';
    } else {
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
    let flag = false;

    if (isEmptyField(valueField1)) {
        showEmptyFieldError(nameInput1, errorElement1);
    } else if (valueField2.length !== 0 && valueField1 !== valueField2) {
        showPasswordError(nameInput1, nameInput2, errorElement1, errorElement2);
    } else if (valueField2.length !==0 && valueField1 === valueField2) {
        showPasswordError(nameInput1, nameInput2, errorElement1, errorElement2, flag=false);
        flag = true;
    } else {
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
    let flag = false;

    if (isEmptyField(valueField2)) {
        showEmptyFieldError(nameInput2, errorElement2);
    } else if (valueField1 !== valueField2) {
        showPasswordError(nameInput1, nameInput2, errorElement1, errorElement2);
    } else if (valueField1 === valueField2) {
        showPasswordError(nameInput1, nameInput2, errorElement1, errorElement2, flag=false);
        flag = true;
    } else {
        nameInput2.classList.remove('invalid');
        nameInput2.classList.add('valid');
        errorElement2.textContent = '';
        flag = true;
    }
    return flag
}

