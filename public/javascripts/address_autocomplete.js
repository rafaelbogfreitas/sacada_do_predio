// 

//google autocomplete
let autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */ (
        document.getElementById('autocomplete')), {
      types: ['geocode'],
});

autocomplete.setFields(['geometry']);

let autocompleteRequest = new google.maps.Geocoder();
let addressInput = document.querySelector('#autocomplete');

// let searchBox = new google.maps.places.SearchBox(addressInput);

autocomplete.addListener('place_changed', onPlaceChanged);

function onPlaceChanged() {

    var place = autocomplete.getPlace();

    document.querySelector('.lat').value = place.geometry.location.lng();
    document.querySelector('.lng').value = place.geometry.location.lat();
    
}

//Geocoder

let geocoder = new google.maps.Geocoder();

addressInput.addEventListener('change', function(){
    if(document.querySelector('.lat').value == '' 
    || document.querySelector('.lng').value == '' ){

        geocoder.geocode({address: addressInput.value }, function(results, status){

            document.querySelector('.lat').value = results[0].geometry.location.lng();
            document.querySelector('.lng').value = results[0].geometry.location.lat();

            console.log(document.querySelector('.lng'))
            console.log(document.querySelector('.lat'))

            console.log(results);

        });

    }
})





