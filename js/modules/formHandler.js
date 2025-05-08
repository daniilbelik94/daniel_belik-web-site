// js/modules/formHandler.js
export function initKontaktForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const formStatus = document.getElementById('form-status');
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalUserNameSpan = document.getElementById('modal-user-name');
    // Получаем скрытое поле _replyto
    const formspreeReplyToField = document.getElementById('formspree-replyto');


    const errorMessages = {
        name: "Bitte geben Sie Ihren Namen ein.",
        email: {
            empty: "Bitte geben Sie Ihre E-Mail-Adresse ein.",
            invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein."
        },
        message: "Bitte geben Sie Ihre Nachricht ein."
    };

    function validateField(field) {
        let isValid = true;
        const value = field.value.trim();
        const fieldName = field.name;
        const errorContainer = form.querySelector(`.form-error-message[data-validation-for="${fieldName}"]`);
        if (errorContainer) { // Проверяем, что errorContainer найден
            errorContainer.textContent = ''; // Очищаем предыдущие ошибки
        }
        field.classList.remove('invalid');

        if (field.hasAttribute('required') && value === '') {
            if (errorContainer) {
                errorContainer.textContent = errorMessages[fieldName]?.empty || errorMessages[fieldName] || "Dieses Feld ist erforderlich.";
            }
            field.classList.add('invalid');
            isValid = false;
        } else if (fieldName === 'email' && value !== '') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                if (errorContainer) {
                    errorContainer.textContent = errorMessages.email.invalid;
                }
                field.classList.add('invalid');
                isValid = false;
            }
        }
        return isValid;
    }

    form.addEventListener('submit', async function(event) { // Делаем функцию async
        event.preventDefault();
        let isFormValid = true;
        const formData = new FormData(form); // Собираем данные формы
        const nameValue = formData.get('name')?.trim() || "";
        const emailValue = formData.get('email')?.trim() || "";

        // Устанавливаем значение для _replyto перед валидацией и отправкой
        if (formspreeReplyToField && emailValue) {
            formspreeReplyToField.value = emailValue;
        }
        // Создаем новый FormData объект ПОСЛЕ установки _replyto, чтобы он был включен
        const finalFormData = new FormData(form);


        form.querySelectorAll('input[required], textarea[required]').forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            if (formStatus) {
                formStatus.textContent = 'Nachricht wird gesendet...';
                formStatus.className = 'sending';
            }

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: finalFormData, // Используем finalFormData с установленным _replyto
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    form.reset();
                    form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
                    form.querySelectorAll('.form-error-message').forEach(el => el.textContent = '');
                    if (formStatus) formStatus.textContent = '';
                    if (formspreeReplyToField) formspreeReplyToField.value = '';

                    if (modalUserNameSpan) modalUserNameSpan.textContent = nameValue;
                    if (successModal) {
                        successModal.style.display = 'flex';
                        setTimeout(() => {
                            successModal.classList.add('open');
                            document.body.classList.add('modal-open');
                        }, 10);
                    }
                } else {
                    const data = await response.json();
                    if (formStatus) {
                        if (data.errors && data.errors.length > 0) {
                            formStatus.textContent = data.errors.map(error => error.message).join(", ");
                        } else {
                            formStatus.textContent = 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.';
                        }
                        formStatus.className = 'error';
                    }
                }
            } catch (error) {
                console.error("Form submission error:", error);
                if (formStatus) {
                    formStatus.textContent = 'Ein Fehler ist aufgetreten. Bitte überprüfen Sie Ihre Internetverbindung.';
                    formStatus.className = 'error';
                }
            }
        } else {
            if (formStatus) {
                formStatus.textContent = 'Bitte korrigieren Sie die Fehler im Formular.';
                formStatus.className = 'error';
            }
        }
    });

    // Закрытие модального окна
    if (modalCloseBtn && successModal) {
        modalCloseBtn.addEventListener('click', () => {
            successModal.classList.remove('open');
            document.body.classList.remove('modal-open');
            setTimeout(() => {
                 successModal.style.display = 'none';
            }, 300);
        });
    }
    if (successModal) {
        successModal.addEventListener('click', (event) => {
            if (event.target === successModal) {
                if (modalCloseBtn) modalCloseBtn.click();
            }
        });
    }

    form.querySelectorAll('input[required], textarea[required]').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
    });
}