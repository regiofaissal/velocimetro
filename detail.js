const params = new URLSearchParams(window.location.search);
const rideID = params.get("id");
const ride = getRideRecord(rideID);

document.addEventListener("DOMContentLoaded", async () => {

    const firstPosition = ride.data[0];
    const firstLocationData = await geolocationData(firstPosition.latitude, firstPosition.longitude);

    // const mapElement = document.createElement("div");
    // mapElement.style = "width: 100px; height: 100px;";
    // mapElement.classList.add("bg-primary");
    // mapElement.classList.add("rounded-4");

    const dataElement = document.createElement("div");
    dataElement.className = "flex-fill d-flex flex-column"

    const cityDiv = document.createElement("div");
    cityDiv.innerText = `City-Country: ${firstLocationData.locality}, ${firstLocationData.countryName}`;
    cityDiv.className = "text-primary mb-2";

    const speedDiv = document.createElement("div");
    speedDiv.innerText = `Max Speed: ${maxSpeedDiv(ride.data)} km/h`;
    speedDiv.className = "h5 text-light";

    const distancieDiv = document.createElement("div");
    distancieDiv.innerText = `Distancie: ${getDistancie(ride.data)} km`;
    distancieDiv.className = "text-light";

    const durationDiv = document.createElement("div");
    durationDiv.innerText = `Duration: ${getDuration(ride)} min`;
    durationDiv.className = "text-light";

    const data = document.createElement("div");
    data.innerText = `Date: ${new Date(ride.startTime).toLocaleString()}`;
    data.className = "text-secondary mt-2";

    dataElement.appendChild(cityDiv);
    dataElement.appendChild(speedDiv);
    dataElement.appendChild(distancieDiv);
    dataElement.appendChild(durationDiv);
    dataElement.appendChild(data);

    document.querySelector("#data").appendChild(dataElement);

    const deleteBnt = document.querySelector("#deleteBtn"); 
    deleteBnt.addEventListener("click", () => {
        deleteRide(rideID);
        window.location.href = "index.html"; 
    })

    const map = L.map("mapDetail")
    map.setView([firstPosition.latitude, firstPosition.longitude], 14);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    const positionArray = ride.data.map((position => {
        return [position.latitude, position.longitude];
    }));
     
    const polyline = L.polyline(positionArray, {
        color: "#F00",
        weight: 3,
        opacity: 0.5, 
        smoothFactor: 1 
    }).addTo(map);

    map.fitBounds(polyline.getBounds())
});