function criateNewRide() {
    const rideID = Date.now();
    const rideRecords = {
        data: [], 
        startTime: rideID, 
        stopTime: null, 
    }
    saveRideRecord(rideID, rideRecords);  
    return rideID; 
}

function deleteRide(rideID) {
    localStorage.removeItem(rideID);
} 

function getAllRides() {
    return Object.entries(localStorage) 
}

function getRideRecord(rideID) {
    return JSON.parse(localStorage.getItem(rideID));
} 

function saveRideRecord(rideID, rideRecords) { 
    localStorage.setItem(rideID, JSON.stringify(rideRecords)); 
}

function addPosition(rideID, record) {
    const rideRecord = getRideRecord(rideID); 
    const newData = {
        accuracy: record.coords.accuracy, 
        altitude: record.coords.altitude,
        altitudeAccuracy: record.coords.altitudeAccuracy,
        heading: record.coords.heading,
        latitude: record.coords.latitude, 
        longitude: record.coords.longitude, 
        speed: record.coords.speed, 
        timestamp: record.timestamp,  
    }
    rideRecord.data.push(newData); 
    saveRideRecord(rideID, rideRecord); 
}

function upDateStopTime(rideID) {
    const rideRecord = getRideRecord(rideID);
    rideRecord.stopTime = Date.now();
    saveRideRecord(rideID, rideRecord); 
}