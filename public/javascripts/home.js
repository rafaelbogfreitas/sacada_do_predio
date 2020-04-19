
//Login button event listener
let loginForm = document.querySelector('.login_form');
let loginBtn = document.querySelector('.login_btn');
let signupForm = document.querySelector('.signup_form');
let signupBtn = document.querySelector('.signup_btn');
let closeForm = document.querySelectorAll('.close_form');

loginBtn.addEventListener('click', function(){
    loginForm.classList.add('increase_width');
    signupForm.classList.remove('increase_width');
})

closeForm.forEach( btn => btn.addEventListener('click', function(){
    loginForm.classList.remove('increase_width');
    signupForm.classList.remove('increase_width');
}));

signupBtn.addEventListener('click', function(){
    loginForm.classList.remove('increase_width');
    signupForm.classList.add('increase_width');
});

