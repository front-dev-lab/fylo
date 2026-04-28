import './scss/style.scss';

const PRELOAD_CLASS = 'preload';
const FORM_CLASS = 'sign__form';
const INPUT_CLASS = 'sign__input';
const BUTTON_CLASS = 'button';
const ERROR_CLASS = 'sign__error';
const ACTIVE_CLASS = '--active';

const body = document.body;
const form = body.querySelector(`.${FORM_CLASS}`);
const formInput = form.querySelector(`.${INPUT_CLASS}`);
const formButton = form.querySelector(`.${BUTTON_CLASS}`);
const formError = form.querySelector(`.${ERROR_CLASS}`);
const preloadElements = body.querySelectorAll(`.${PRELOAD_CLASS}`);

let hasError = false;

const isEmailValid = email => {
  return /^[a-zA-Z0-9._%+-]+@(?=.*[a-zA-Z])[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

const initObserver = () => {
  const animClassNames = ['slide-up', 'pop-in'];
  const elements = body.querySelectorAll(
    animClassNames.map(animClassName => `.${animClassName}`).join(',')
  );

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      const element = entry.target;
      const animClass = animClassNames.find(animClassName => element.classList.contains(animClassName));

      if (!animClass) {
        return;
      }

      element.classList.add(animClass + ACTIVE_CLASS);
      obs.unobserve(element);
    });
  }, {
    rootMargin: '-50px',
  });

  elements.forEach(element => observer.observe(element));
};

initObserver();

window.addEventListener('load', () => {
  preloadElements.forEach(element => element.classList.remove(PRELOAD_CLASS));
});

form.addEventListener('submit', (e => {
  e.preventDefault();

  const { email } = Object.fromEntries(new FormData(form));
  const emailIsValid = isEmailValid(email);

  if (!emailIsValid) {
    hasError = true;
    formError.classList.add(ERROR_CLASS + ACTIVE_CLASS);
    formButton.disabled = true;

    return;
  }

  formInput.value = '';
  console.log(email);
}));

formInput.addEventListener('input', e => {
  if (!hasError) {
    return;
  }

  const { value } = e.target;
  const emailIsValid = isEmailValid(value);

  if (!emailIsValid) {
    return;
  }

  hasError = false;
  formError.classList.remove(ERROR_CLASS + ACTIVE_CLASS);
  formButton.disabled = false;
});
