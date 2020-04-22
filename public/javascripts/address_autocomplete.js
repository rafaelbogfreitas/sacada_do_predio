// 

//google autocomplete
let autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */ (
        document.getElementById('autocomplete')), {
      types: ['geocode'],
});


autocomplete.addListener('place_changed', onPlaceChanged);

function onPlaceChanged() {
    var place = autocomplete.getPlace();

    console.log(place);

    document.querySelector('.lat').value = place.geometry.location.lat();
    document.querySelector('.lng').value = place.geometry.location.lng();

    console.log(document.querySelector('.lat'));
    
}