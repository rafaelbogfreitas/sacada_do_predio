//Helper functions
const passwordStrenghtChecker = str => /.{5,6}/g.test(str);

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


//Frontend verification

//Verifies if user already exists
let username = document.querySelector('.signup_form > input[placeholder="Name"]');

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

//Verifies if password is strong
let password = document.querySelector('.signup_form input[type="password"]');

password.addEventListener('keyup', function(e){
    let isStrong = passwordStrenghtChecker(e.target.value);

    !isStrong ?
    password.style.outline = '1px solid red' :
    password.style.outline = '1px solid green'; 

});

password.addEventListener('blur', function(){
    password.style.outline = 'none'; 
});
