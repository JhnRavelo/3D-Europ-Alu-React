const useShake = (input) => {
  input.classList.add('input--invalid');
  input.classList.remove('hide');

  input.addEventListener('animationend', (e) => {
    if (e.animationName === 'shake') {
      input.classList.remove('input--invalid');
    }
  });

  return null;
};

export default useShake;
