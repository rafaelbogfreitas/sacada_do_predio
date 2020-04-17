// let search = document.querySelector('#search');
// let container = document.querySelector('.container');

// let api = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
// let accessToken = '.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1586829538543&autocomplete=true&types=address';
// search.addEventListener('keydown', (e) => {
//     console.log(e.target.value);
//     if(e.target.value.length % 10 === 0){
//         let data = axios.get(api + e.target.value + accessToken)
//         .then( data => {
//             let arr = data.data.features;

//             arr.map( option => {
//                 let p = document.createElement('p');
//                 p.innerHTML = option.text;
//                 container.appendChild(p);
//             })
//             console.log(data)
//         })
//         .catch(error => console.log(error));
//     }
// });



//burguer button click
let burguer = document.querySelector('.dashboard_icon');
let dashboardPanel = document.querySelector('.dashboard');
let closeIcon = document.querySelector('.close_icon');
let nav = document.querySelector('.dashboard_nav');

//event to open user panel
burguer.addEventListener('click', function(e){
    console.log(e);
    dashboardPanel.classList.remove("leave_screen");
    nav.classList.add('no_shadow'); 
});

//event to close user panel
closeIcon.addEventListener('click', function(){
    dashboardPanel.classList.add("leave_screen");  
    nav.classList.remove('no_shadow'); 
});

//user box
let userBox = document.querySelector('.profile_info');
let userInfoBox = document.querySelector('.profile_options_box');

userBox.addEventListener('mouseover', function(){
    userInfoBox.classList.add('increase_height');
});

userBox.addEventListener('mouseout', function(){
    userInfoBox.classList.remove('increase_height');
});

//Click event to show/hide cases created by the user
let casesCreated = document.querySelector('.title_box');
let arrow = document.querySelector('.arrow');
let casesContainer = document.querySelector('.user_cases_container');

casesCreated.addEventListener('click', function(){
    if(arrow.style.transform == "rotate(0deg)"){
        arrow.style.transform = "rotate(-90deg)";
        casesContainer.classList.remove('open_down');
        
    } else {
        casesContainer.classList.add('open_down');
        arrow.style.transform = "rotate(0deg)"
        
    }
});


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



