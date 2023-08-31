import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const FEEDBACK_STORAGE_KEY = 'feedback-form-state';

// Відстежуємо подію input і зберігаємо дані у локальне сховище зі затримкою
const saveFeedbackToStorage = throttle(() => {
  const feedbackState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbackState));
}, 500);

// Відновлюємо дані зі збереженого стану під час завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
  const savedFeedback = localStorage.getItem(FEEDBACK_STORAGE_KEY);
  if (savedFeedback !== null) {
    const feedbackState = JSON.parse(savedFeedback);
    emailInput.value = feedbackState.email;
    messageTextarea.value = feedbackState.message;
  }
});

// Очищуємо сховище і поля форми при сабміті форми
form.addEventListener('submit', event => {
  event.preventDefault();
  
  const feedbackState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  console.log('Submitted Feedback:', feedbackState);
  
  localStorage.removeItem(FEEDBACK_STORAGE_KEY);
  emailInput.value = '';
  messageTextarea.value = '';
});

// Відстежуємо подію input на полях форми
emailInput.addEventListener('input', saveFeedbackToStorage);
messageTextarea.addEventListener('input', saveFeedbackToStorage);

