const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

loginBtn.addEventListener('click', (e) => {
  const parent = e.target.parentNode.parentNode;
  signupBtn.parentNode.classList.add('slide-up');
  parent.classList.remove('slide-up');
});

signupBtn.addEventListener('click', (e) => {
  const parent = e.target.parentNode;
  loginBtn.parentNode.parentNode.classList.add('slide-up');
  parent.classList.remove('slide-up');
});
