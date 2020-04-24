
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

//intersection observer for pics

let img = document.querySelectorAll('.team_img');
let ilustration = document.querySelector('.main_home img');
let headers = document.querySelectorAll('h1');
let buildingImg = document.querySelector(".cases_img_container");

let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1
};

let options2 = {
    root: null,
    rootMargin: "300px",
    threshold: 1
};

const observer = new IntersectionObserver(function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('animated', 'fadeInUp');
            document.querySelector('.rafael .team_about').classList.add('animated', 'fadeInUp');
            document.querySelector('.daniel .team_about').classList.add('animated', 'fadeInUp');
        }
    });
}, options);

const imageObserver = new IntersectionObserver(function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('animated', 'fadeInLeft');
        }
    });
}, options2);


img.forEach( image => observer.observe(image));
headers.forEach( h => observer.observe(h));
imageObserver.observe(ilustration);
imageObserver.observe(buildingImg);

//Remove login feedback 
let error = document.querySelector('.login_error');
let success = document.querySelector('.signup_success');
setTimeout(function(){
    error.classList.remove('fadeInDown');
    error.classList.add('fadeOutUp');
}, 5000);

setTimeout(function(){
    success.classList.remove('fadeInDown');
    success.classList.add('fadeOutUp');
}, 5000);

