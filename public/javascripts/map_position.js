function startMap() {

    const map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 15,
            styles: [{
                    elementType: 'geometry',
                    stylers: [{
                        color: '#242f3e'
                    }]
                },
                {
                    elementType: 'labels.text.stroke',
                    stylers: [{
                        color: '#242f3e'
                    }]
                },
                {
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#746855'
                    }]
                },
                {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#d59563'
                    }]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#d59563'
                    }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#263c3f'
                    }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#6b9a76'
                    }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#38414e'
                    }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{
                        color: '#212a37'
                    }]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#9ca5b3'
                    }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#746855'
                    }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{
                        color: '#1f2835'
                    }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#f3d19c'
                    }]
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#2f3948'
                    }]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#d59563'
                    }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#17263c'
                    }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#515c6d'
                    }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{
                        color: '#17263c'
                    }]
                }
            ]
        }
    );


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            map.setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        });
    }


    //markers initialization

    axios.get('http://localhost:3000/api/cases')
    .then(data => {

        data.data.forEach( caseData => {
            console.log(caseData.location.coordinates[1]);
            new google.maps.Marker({
                position: {
                    lat: caseData.location.coordinates[0],
                    lng: caseData.location.coordinates[1]
                },
                map: map,
                title: caseData.title
            });
        })
    });
}


startMap();

