'use strict';

function isEmptyField(valueField) {
    return valueField.trim() === "";
}

function isValidEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
}

function isValidPasswordLength(value) {
    return value.length >= 8;
}

function isNumericPassword(value) {
    return /^\d+$/.test(value);
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

function getPasswordElements(nameInput) {
    const valueField = nameInput.value.trim();
    const errorElement = document.getElementById(nameInput.id + '-error');
    const blockCheckmark = nameInput.parentElement.querySelector('.checkmark');

    return { valueField, errorElement, blockCheckmark };
}

function updateInputState(nameInput, blockCheckmark) {
    nameInput.classList.remove('valid');
    nameInput.classList.add("invalid");
    blockCheckmark.classList.remove("visible");
}

function togglePassword(element) {
    const passwordInputField = element.previousElementSibling;
    const isPasswordType = passwordInputField.getAttribute('type') === 'password';
    passwordInputField.setAttribute('type', isPasswordType ? 'text' : 'password')

    if (isPasswordType) {
        element.classList.remove('close');
        element.classList.add('open')
    } else {
        element.classList.remove('open');
        element.classList.add('close');
    }
}

async function handleEmailBlur(data) {
    const emailInput = data.email
    const valueField = emailInput.value;
    const errorElement = document.getElementById(emailInput.id + '-error');
    const blockCheckmark = emailInput.parentElement.querySelector('.checkmark');

    let flag = false;

    if (isEmptyField(valueField)) {
        showEmptyFieldError(emailInput, errorElement);
    } else if (!isValidEmail(valueField)) {
        emailInput.classList.remove("valid");
        emailInput.classList.add("invalid");
        blockCheckmark.classList.remove("visible")
        errorElement.textContent = 'Введите корректный email';
    } else {
        const emailCheckResult = await checkEmail(valueField);
        if (emailCheckResult === 1) {
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
            blockCheckmark.classList.add("visible");
            errorElement.textContent = '';
            flag = true;
        } else {
            emailInput.classList.remove("valid");
            emailInput.classList.add("invalid");
            blockCheckmark.classList.remove("visible");
            errorElement.textContent = "Этот email уже зарегистрирован."
        }

    }
    return flag
}

async function handlePassword1Blur(data) {
    const nameInput1 = data.password1;
    const nameInput2 = data.password2;
    const { valueField: valueField1, errorElement: errorElement1, blockCheckmark: blockCheckmark1 } = getPasswordElements(nameInput1);
    const { valueField: valueField2, errorElement: errorElement2, blockCheckmark: blockCheckmark2 } = getPasswordElements(nameInput2);

    let flag = false;

    if (isEmptyField(valueField1)) {
        blockCheckmark1.classList.remove("visible")
        showEmptyFieldError(nameInput1, errorElement1);
    } else if (!isValidPasswordLength(valueField1)) {
        updateInputState(nameInput1, blockCheckmark1);
        errorElement1.textContent = 'Пароль должен содержать не менее 8 символов.';
    } else if (isNumericPassword(valueField1)) {
        updateInputState(nameInput1, blockCheckmark1);
        errorElement1.textContent = 'Пароль не может состоять только из цифр.';
    } else if (valueField2.length !== 0 && valueField1 !== valueField2) {
        showPasswordError(nameInput1, nameInput2, errorElement1, errorElement2, blockCheckmark1, blockCheckmark2);
    } else if (valueField2.length !==0 && valueField1 === valueField2) {
        const passwordCheckResult = await checkCommonPassword(valueField1);
        if (passwordCheckResult === 1) {
            showPasswordError(nameInput1, nameInput2, errorElement1, errorElement2, blockCheckmark1, blockCheckmark2, flag=false);
            flag = true;
        } else {
            updateInputState(nameInput1, blockCheckmark1);
            errorElement1.textContent = 'Этот пароль слишком распространен.';
        }
    } else {
        const passwordCheckResult = await checkCommonPassword(valueField1);
        if (passwordCheckResult === 1) {
            nameInput1.classList.remove('invalid');
            nameInput1.classList.add('valid');
            blockCheckmark1.classList.add("visible");
            errorElement1.textContent = '';
            flag = true;
        } else {
            updateInputState(nameInput1, blockCheckmark1);
            errorElement1.textContent = 'Этот пароль слишком распространен.';
        }
    }
    return flag
}

async function handlePassword2Blur(data) {
    const nameInput1 = data.password1;
    const nameInput2 = data.password2;
    const { valueField: valueField1, errorElement: errorElement1, blockCheckmark: blockCheckmark1 } = getPasswordElements(nameInput1);
    const { valueField: valueField2, errorElement: errorElement2, blockCheckmark: blockCheckmark2 } = getPasswordElements(nameInput2);

    let flag = false;

    if (isEmptyField(valueField2)) {
        blockCheckmark2.classList.remove("visible");
        showEmptyFieldError(nameInput2, errorElement2);
    } else if (!isValidPasswordLength(valueField2)) {
        updateInputState(nameInput2, blockCheckmark2);
        errorElement2.textContent = 'Пароль должен содержать не менее 8 символов.';
    } else if (isNumericPassword(valueField2)) {
        updateInputState(nameInput2, blockCheckmark2);
        errorElement2.textContent = 'Пароль не может состоять только из цифр.';
    } else if (valueField1 !== valueField2) {
        showPasswordError(nameInput1, nameInput2, errorElement1, errorElement2, blockCheckmark1, blockCheckmark2);
    } else if (valueField1 === valueField2) {
        const passwordCheckResult = await checkCommonPassword(valueField2);
        if (passwordCheckResult === 1) {
            showPasswordError(nameInput1, nameInput2, errorElement1, errorElement2, blockCheckmark1, blockCheckmark2, flag=false);
            flag = true;
        } else {
            updateInputState(nameInput2, blockCheckmark2);
            errorElement2.textContent = 'Этот пароль слишком распространен.';
        }
    } else {
        const passwordCheckResult = await checkCommonPassword(valueField2);
        if (passwordCheckResult === 1) {
            blockCheckmark2.classList.add("visible");
            nameInput2.classList.remove('invalid');
            nameInput2.classList.add('valid');
            errorElement2.textContent = '';
            flag = true;
        } else {
            updateInputState(nameInput2, blockCheckmark2);
            errorElement2.textContent = 'Этот пароль слишком распространен.';
        }
    }
    return flag
}

async function handlePhoneNumberBlur(data) {
    const nameInput = data.phoneNumber
    const valueField = nameInput.value;
    const unmaskedValue = $('#id_phone_number').inputmask('unmaskedvalue');
    const errorElement = document.getElementById(nameInput.id + '-error');
    const blockCheckmark = nameInput.parentElement.querySelector('.checkmark');
    let flag = false;

    if (isEmptyField(valueField)) {
        blockCheckmark.classList.remove('visible');
        showEmptyFieldError(nameInput, errorElement);
    } else if (unmaskedValue.length < 9) {
        showLengthPhoneNumber(nameInput, errorElement, blockCheckmark)
    } else {
        const phoneNumber = await checkPhoneNumber(valueField);
        if (phoneNumber === 1) {
            blockCheckmark.classList.add('visible');
            nameInput.classList.remove('invalid');
            nameInput.classList.add('valid');
            errorElement.textContent = '';
            flag = true;
        } else {
            nameInput.classList.remove("valid");
            nameInput.classList.add("invalid");
            blockCheckmark.classList.remove("visible");
            errorElement.textContent = "Телефонный номер уже зарегистрирован"
        }
    }
    return flag
}

async function checkEmail(valueField) {
    try {
        const response = await axios.post('/api/check-email/', {email: valueField});
        return response.data.valid ? 1 : 0; // 1, если email доступен, 0, если занят
    } catch (error) {
        if (error.response) {
            console.error('Ошибка', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Нет ответа от сервера:', error.request);
        } else {
            console.error('Ошибка:', error.message);
        }
        return -1; // Возвращаем -1 в случае ошибки запроса
    }
}

async function checkCommonPassword(valueField) {
    try {
        const response = await axios.post('/api/check-password/', {password: valueField});
        return response.data.valid ? 1 : 0;
    } catch (error) {
        if (error.response) {
            console.error('Ошибка', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Нет ответа от сервера:', error.request);
        } else {
            console.error('Ошибка:', error.message);
        }
        return -1; // Возвращаем -1 в случае ошибки запроса
    }
}

async function checkPhoneNumber(valueField) {
    try {
        const response = await axios.post('/api/check-phone/', {phoneNumber: valueField});
        return response.data.valid ? 1 : 0;
    } catch (error) {
        if (error.response) {
            console.error('Ошибка', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Нет ответа от сервера:', error.request);
        } else {
            console.error('Ошибка:', error.message);
        }
        return -1; // Возвращаем -1 в случае ошибки запроса
    }
}

function checkFields(data) {
    const flag1 = handleEmailBlur(data)
    const flag2 = handlePassword1Blur(data)
    const flag3 = handlePassword2Blur(data)
    const flag4 = handlePhoneNumberBlur(data)
    return flag1 && flag2 && flag3 && flag4;
}
