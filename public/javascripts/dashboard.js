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

//event to open user panel
burguer.addEventListener('click', function(e){
    console.log(e);
    dashboardPanel.classList.remove("leave_screen");  
});

//event to close user panel
closeIcon.addEventListener('click', function(){
    dashboardPanel.classList.add("leave_screen");  
});

//user box
let userBox = document.querySelector('.profile_info');
let userInfoBox = document.querySelector('.profile_options_box');

userBox.addEventListener('mouseover', function(){
    userInfoBox.classList.add('open_down');
})

userBox.addEventListener('mouseout', function(){
    userInfoBox.classList.remove('open_down');
})



