//burguer button click
let burguer = document.querySelector('.dashboard_icon');
let dashboardPanel = document.querySelector('.dashboard');
let closeIcon = document.querySelector('.close_icon');
let nav = document.querySelector('.dashboard_nav');


//Click event to show/hide cases created by the user
let casesCreated = document.querySelector('.title_box');
let arrow = document.querySelector('.arrow');
let casesContainer = document.querySelector('.user_cases_container');

//down arrow click event
let downArrow = document.querySelector('.down_arrow');

downArrow.addEventListener('click', function(){
    window.scrollBy({
        top: window.innerHeight - 50,
        left: 0,
        behavior: 'smooth'
      });
});