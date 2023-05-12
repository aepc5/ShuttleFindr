// Avoid CORS error with proxy
const proxy = `https://corsproxy.io/?${encodeURIComponent('https://passio3.com/')}`

export const TRIP_UPDATES = `${proxy}/harvard/passioTransit/gtfs/realtime/tripUpdates.json`
export const VEHICLE_POS = `${proxy}/harvard/passioTransit/gtfs/realtime/vehiclePositions.json`
