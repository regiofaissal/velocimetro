const rideListElement = document.querySelector("#rideList");
const allRides = getAllRides();

allRides.forEach(async ([id, value]) => {
    const ride = JSON.parse(value);
    ride.id = id;

    if (!ride.data || ride.data.length === 0) return;

    const itemElement = document.createElement("li");
    itemElement.id = ride.id;
    itemElement.className = "d-flex p-1 align-items-center justify-content-between shadow-sm gap-3"; 
    itemElement.addEventListener("click", () => {
        window.location.href = `detail.html?id=${ride.id}`; 
    }) 
    rideListElement.appendChild(itemElement);

    const firstPosition = ride.data[0];
    const firstLocationData = await geolocationData(firstPosition.latitude, firstPosition.longitude);
     
    const mapID = `map-${ride.id}`;  
    const mapElement = document.createElement("div");
    mapElement.id = mapID;
    mapElement.style = "width: 120px; height: 120px;"; 
    mapElement.classList.add("bg-primary");
    mapElement.classList.add("rounded-4");  
    
    const dataElement = document.createElement("div"); 
    dataElement.className = "flex-fill d-flex flex-column"

    const cityDiv = document.createElement("div");
    cityDiv.innerText = `City-Country: ${firstLocationData.locality}, ${firstLocationData.countryName}`;
    cityDiv.className = "text-primary mb-2"; 

    const speedDiv = document.createElement("div");
    speedDiv.innerText = `Max Speed: ${maxSpeedDiv(ride.data)} km/h`;
    speedDiv.className = "h5"; 

    const distancieDiv = document.createElement("div");
    distancieDiv.innerText = `Distancie: ${getDistancie(ride.data)} km`;  

    const durationDiv = document.createElement("div"); 
    durationDiv.innerText = `Duration: ${getDuration(ride)} min`; 

    const data = document.createElement("div"); 
    data.innerText = `Date: ${new Date(ride.startTime).toLocaleString()}`; 
    data.className = "text-secondary mt-2"; 

    dataElement.appendChild(cityDiv);
    dataElement.appendChild(speedDiv);
    dataElement.appendChild(distancieDiv);
    dataElement.appendChild(durationDiv); 
    dataElement.appendChild(data); 

    itemElement.appendChild(mapElement); 
    itemElement.appendChild(dataElement);

    const map = L.map(mapID, {
        attributionControl: false,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false, 
        doubleClickZoom: false, 
        touchZoom: false, 
        boxZoom: false, 
        tap: false,  

    }); 

    map.setView([firstPosition.latitude, firstPosition.longitude], 12);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map); 

});
