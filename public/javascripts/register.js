//Event listener for register btn
let registerBtn = document.querySelector('.register_btn');
let registerForm = document.querySelector('.registration_layer');
let saveRegisterBtn = document.querySelector('.register_save');
let closeRegisterLayer = document.querySelector('.close_register');

registerBtn.addEventListener('click', function(){
    registerForm.classList.add('translateY');
});

saveRegisterBtn.addEventListener('click', function(){
    registerForm.classList.remove('translateY');
});

closeRegisterLayer.addEventListener('click', function(){
    registerForm.classList.remove('translateY');
});