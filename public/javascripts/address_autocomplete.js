let addressInput = document.querySelector('input[name="address"]');
let container = document.querySelector('.results_box');
let form = document.querySelector('form');

console.log(form);

let api = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
let accessToken = '.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1586829538543&autocomplete=true&types=address';
addressInput.addEventListener('keypress', (e) => {
    console.log(e.target.value);

    axios.get(api + e.target.value + accessToken)
        .then( data => {
            let arr = data.data.features;
            let options = ''
            arr.map( option => {
                options += `<p class="animated fadeInDown">${option.place_name}</p>`;
            })
            container.innerHTML = options;
            console.log(data)

            let [ lat, long ] = data.data.features[0].center;
            console.log(lat, long, data);
            document.querySelector('.lat').value = lat;
            document.querySelector('.lng').value = long;

        console.log(document.querySelector('.lat'));
        })
        .catch(error => console.log(error));

});

addressInput.addEventListener('blur', function(){
    axios.get(api + addressInput.value + accessToken)
    .then( data => {
        let [ lat, long ] = data.data.features[0].center;
        console.log(lat, long, data);
        document.querySelector('.lat').value = lat;
        document.querySelector('.lng').value = long;

        console.log(document.querySelector('.lat'));
        console.log(document.querySelector('.lng'));
    });
    
    setTimeout(function(){
        container.innerHTML = "";
    }, 500);
});

container.addEventListener('click', function(e){
    addressInput.value = e.target.innerHTML;
    container.innerHTML = "";
});

form.addEventListener('submit', function(){
    axios.get(api + addressInput.value + accessToken)
    .then( data => {
        let [ lat, long ] = data.data.features[0].center;
        console.log(lat, long, data);
        document.querySelector('.lat').value = lat;
        document.querySelector('.lng').value = long;

        console.log(document.querySelector('.lat'));
        console.log(document.querySelector('.lng'));
    });
});


//get coordinates when form is submitted
