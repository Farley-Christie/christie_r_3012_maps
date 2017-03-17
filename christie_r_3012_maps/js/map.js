(function() {
	var map = new google.maps.Map(document.querySelector('.mapcon')),

	googlemap = document.querySelector("#googlemap"),
	altmap = document.querySelector("#altmap"),

	geocoder = new google.maps.Geocoder(),

	currentLocal = document.querySelector('#directions1'),
	enteredLocal = document.querySelector('#directions2'),

	//directions
	directionsServices = new google.maps.DirectionsService(),
	directionsDisplay,
	locations = [],

	hqicon = "images/hq.png",
	starticon = "images/start.png", 
	islandIcon = "images/islandicon.png",

	marker1,
	marker2,
	islandmarker,

	directionsCon = document.querySelector("#directionsCon"),
	textDirections = document.querySelector("#directionsBox");

	function initMap(){
		locations[0] = { lat: 44.4999612, lng: -81.3753353 };

		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setPanel(textDirections);
		directionsDisplay.setMap(map);
		
		map.setCenter({ lat: 44.4999612, lng: -81.3753353 });
		map.setZoom(13);

		marker1 = new google.maps.Marker({
			position : { lat: 44.4999612, lng: -81.3753353 },
			map : map,
			animation: google.maps.Animation.DROP,
			icon: hqicon,
			title: "86 Saugeen St. Southampton"
		});
		islandmarker = new google.maps.Marker({
			position : { lat: 44.4915901, lng: -81.3989065 },
			map : map,
			animation: google.maps.Animation.DROP,
			icon: islandIcon,
			title: "Chantry Island"
		});
		console.log("map initialized");
	}
	function enteredAddress(){
		directionsCon.classList.remove("hide");
		var address = document.querySelector('.address').value;
		geocoder.geocode({'address': address}, function(results, status){
			if(status == google.maps.GeocoderStatus.OK){
				// push location into array
				locations[1] = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }
				map.setCenter(results[0].geometry.location);
				if(marker1){
					marker1.setMap(null);
					marker1 = new google.maps.Marker({
						position : { lat: 44.4999612, lng: -81.3753353 },
						map : map,
						animation: google.maps.Animation.DROP,
						icon: hqicon,
						title: "86 Saugeen St. Southampton"
					});
					marker2.setMap(null);
					marker2 = new google.maps.Marker({
						map : map,
						animation: google.maps.Animation.DROP,
						icon: starticon,
						position : results[0].geometry.location
					});

				calcRoute(results[0].geometry.location);

				} else {
					console.log(status);
				}
			}
		});
	}
	function currentAddressBtn(){
		navigator.geolocation.getCurrentPosition(currentAddress);
	}
	function currentAddress(position){

		var geoPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
		directionsCon.classList.remove("hide");
		if(marker1){
			var request = {
				origin: geoPosition,
				destination: locations[0],
				travelMode: "DRIVING"
			};
			directionsServices.route(request, function(responce, status){
				if (status == "OK"){
					directionsDisplay.setDirections(responce);
				}
			});
			marker1.setMap(null);
			marker1 = new google.maps.Marker({
				position : { lat: 44.4999612, lng: -81.3753353 },
				map : map,
				animation: google.maps.Animation.DROP,
				icon: hqicon,
				title: "86 Saugeen St. Southampton"
			});
			marker1.setMap(null);
			marker2 = new google.maps.Marker({
				map : map,
				animation: google.maps.Animation.DROP,
				icon: starticon,
				position : geoPosition
			});
		}
	}

	function calcRoute(codedLoc){
		var request = {
			origin: locations[1],
			destination: locations[0],
			travelMode: "DRIVING"
		};

		directionsServices.route(request, function(responce, status){
			if (status == "OK"){
				directionsDisplay.setDirections(responce);
			}else{
				console.log(status);
			}
		});
	}

	function handleError(){
		googlemap.classList.add("hide");
		altmap.classList.remove("hide");
	}

	if (navigator.geolocation){
		currentLocal.classList.remove("hide");
	}

	initMap();
	if (initMap == "false"){
		handleError();
	}
	enteredLocal.addEventListener('click',enteredAddress,false);
	currentLocal.addEventListener('click',currentAddressBtn,false);
})();








/*(function() {
	//i dont work in crome
	var map = new google.maps.Map(document.querySelector('.mapcon')),
	directBtn = querySelector("#directions"), 
	marker,
	hqicon = "images/hq.png",
	starticon = "images/start.png", 
	islandIcon = "images/islandicon.png",
	directionsService = new google.maps.DirectionsService,
    directionsRender = new google.maps.DirectionsRenderer({map: map});

	function initMap(position){
		map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
			map.setZoom(8);
			var start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
    		boat = new google.maps.LatLng(44.4999612, -81.3753353);

			startmarker = new google.maps.Marker({
				position : { lat: position.coords.latitude, lng: position.coords.longitude },
				map : map,
				animation: google.maps.Animation.DROP,
				icon: start,
				title : "You are here"
			});
			boatmarker = new google.maps.Marker({
				position : { lat: 44.4999612, lng: -81.3753353},
				map : map,
				animation: google.maps.Animation.DROP,
				icon: hqicon,
				title : "86 Saugeen St. Southampton"
			});
			island = new google.maps.Marker({
				position : { lat: 44.4915901, lng: -81.3989065},
				map : map,
				animation: google.maps.Animation.DROP,
				icon: islandIcon,
				title : "Chantry Island"
			});
	}
	function mapRoute(directionsService, directionsRender, start, boat) {
	  	directionsService.route({
	    	origin: start,
	    	destination: boat,
	    	travelMode: google.maps.TravelMode.DRIVING},
	    	function(response, status) {
			    if (status == google.maps.DirectionsStatus.OK) {
			      	directionsRender.setDirections(response);
			    } else {
			      	window.alert('Directions request failed due to ' + status);
			    }
  		});
	}
		//add custom animation for the marker 
	
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(initMap, handleError);
	}else{
		console.log("nope");
	}
	function handleError(){
		console.log('somthing went wrong');
	}
	function openWindow(){
		infowindow.open(map, marker);
	}
	directBtn.addEventListener('click',mapRoute(directionsService, directionsRender, start, boat),false);
	marker.addEventListener('click',openWindow(),false)
})();
*/