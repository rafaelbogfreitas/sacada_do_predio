//burguer button click
let burguer = document.querySelector('.dashboard_icon');
let dashboardPanel = document.querySelector('.dashboard');
let closeIcon = document.querySelector('.close_icon');
let nav = document.querySelector('.dashboard_nav');

//event to open user panel
burguer.addEventListener('click', function (e) {
    dashboardPanel.classList.remove("leave_screen");
    nav.classList.add('no_shadow');
});

//event to close user panel
closeIcon.addEventListener('click', function () {
    dashboardPanel.classList.add("leave_screen");
    nav.classList.remove('no_shadow');
});

//user box
let userBox = document.querySelector('.profile_info');
let userInfoBox = document.querySelector('.profile_options_box');

userBox.addEventListener('mouseover', function () {
    userInfoBox.classList.add('increase_height');
});

userBox.addEventListener('mouseout', function () {
    userInfoBox.classList.remove('increase_height');
});

let downArrow = document.querySelector('.down_arrow');

downArrow.addEventListener('click', function () {
    window.scrollBy({
        top: window.innerHeight - 50,
        left: 0,
        behavior: 'smooth'
    });
});