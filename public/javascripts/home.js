
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

let options = {
    root: null,
    rootMargin: "100px",
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


img.forEach( image => observer.observe(image));



