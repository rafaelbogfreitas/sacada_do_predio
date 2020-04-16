//add btns for forms


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


//Frontend verification
let username = document.querySelector('.login_form > input[placeholder="Name"]');

username.addEventListener('keyup', function(e){
    console.log(e.target.value);

    axios.get('http://localhost:3000/api/users')
        .then( data => {
            console.log(data);
            let options = data.data.filter( a => a.username == e.target.value);

            options.length > 0 ?
            username.style.outline = "2px solid red" :
            username.style.outline = "none";
        })
        .catch( error => console.log(error));
})

console.log(username);
