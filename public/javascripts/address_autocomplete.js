let addressInput = document.querySelector('input[name="address"]');
let container = document.querySelector('.results_box');
let form = document.querySelector('form');

console.log(form);

let api = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
let accessToken = '.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1586829538543&autocomplete=true&types=address';
let sacadaToken = '.json?access_token=pk.eyJ1IjoicmFmYWVsYm9nZnJlaXRhcyIsImEiOiJjazk5d29kencxd3N0M25uMWlvdjludmM3In0.zeXPdzxNYeAo0x9jpu4fJw&cachebuster=1586829538543&autocomplete=true&types=address';

if(window.innerWidth >= 600) {

    addressInput.addEventListener('keypress', (e) => {
        console.log(e.target.value);
        
        axios.get(api + e.target.value + sacadaToken, { headers: { "Access-Control-Allow-Headers": "X-Accept-Charset,X-Accept,Content-Type,Authorization,Accept,Origin"
    }})
        .then( data => {
            // console.log(api + e.target.value + accessToken)
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
}

addressInput.addEventListener('blur', function(){
    axios.get(api + addressInput.value + sacadaToken)
    .then( data => {
        let [ lat, long ] = data.data.features[0].center;
        console.log(lat, long, data);
        document.querySelector('.lat').value = lat;
        document.querySelector('.lng').value = long;

        console.log(document.querySelector('.lat'));
        console.log(document.querySelector('.lng'));
    })
    .catch( error => console.log(error));

    setTimeout(function(){
        container.innerHTML = "";
    }, 500);
});

container.addEventListener('click', function(e){
    addressInput.value = e.target.innerHTML;
    container.innerHTML = "";
});


if(window.innerWidth < 600){

    addressInput.addEventListener('input', function(){
        console.log('hello')
        axios.get(api + addressInput.value + sacadaToken)
        .then( data => {
            let [ lat, long ] = data.data.features[0].center;
            console.log(lat, long, data);
            
            let arr = data.data.features;
            let options = ''
            arr.map( option => {
                options += `<p class="animated fadeInDown">${option.place_name}</p>`;
            })
            .catch(error => console.log(error));
            container.innerHTML = options;
            
            document.querySelector('.lat').value = lat;
            document.querySelector('.lng').value = long;
            
            console.log(document.querySelector('.lat'));
            console.log(document.querySelector('.lng'));
        });
    });
}

form.addEventListener('submit', function(){
    axios.get(api + addressInput.value + sacadaToken)
    .then( data => {
        let [ lat, long ] = data.data.features[0].center;
        console.log(lat, long, data);
        document.querySelector('.lat').value = lat;
        document.querySelector('.lng').value = long;

        console.log(document.querySelector('.lat'));
        console.log(document.querySelector('.lng'));
    })
    .catch(error => console.log(error));
});


//get coordinates when form is submitted
