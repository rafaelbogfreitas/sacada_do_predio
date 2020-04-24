//Event listener for register btn
let registrationLink = document.querySelector('.registration_link');
let registerBtn = document.querySelectorAll('.register_btn');
let registerForm = document.querySelector('.registration_layer');
let saveRegisterBtn = document.querySelector('.register_save');
let closeRegisterLayer = document.querySelector('.close_register');

registerBtn.forEach((item) => item.addEventListener('click', function(){
    registerForm.classList.add('translateY');
}));

registrationLink.addEventListener('click', function(){
    registerForm.classList.add('translateY');
});

saveRegisterBtn.addEventListener('click', function(){
    registerForm.classList.remove('translateY');
});

closeRegisterLayer.addEventListener('click', function(){
    registerForm.classList.remove('translateY');
});