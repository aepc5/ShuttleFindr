import React, { useState, useEffect, useContext } from 'react'
import { GoogleMap, Polyline, OverlayView, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { STOPS } from '../helper/stops'
import { SHAPES } from '../helper/shapes'
import { TRIPS } from '../helper/trips'
import { ROUTES } from '../helper/routes'
import { ROUTEID_TO_STOPS } from '../helper/routeIDtoStops'
import { Context } from '../helper/context'
import BusIcon from './busIcon.js'
import { hexToRGB } from '../helper/helper'

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 42.3744942914744,
  lng: -71.11721497643681
};

function MapComponent() {
  const { tripData, vehicleData } = useContext(Context)
  const [activeStops, setActiveStops] = useState([])
  const [activeRoutes, setActiveRoutes] = useState([])
  const [lines, setLines] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [routeToStops, setRouteToStops] = useState({})
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCFrWnJYo6glM057RxZaykS_ybYAWRc1fo"
  })

  useEffect(() => {
    const temp = {}
    Object.keys(ROUTEID_TO_STOPS).forEach(key => {
      const { stops, route_id } = ROUTEID_TO_STOPS[key]
      stops.forEach(stop => {
        if (temp[route_id]) {
          temp[route_id].add(STOPS.find(element => element.stop_name === stop.stop_name).stop_code)
        } else {
          temp[route_id] = new Set([STOPS.find(element => element.stop_name === stop.stop_name).stop_code])
        }
      })
    })
    setRouteToStops(temp)
  }, [])

  // FETCH VEHICLE DATA
  useEffect(() => {
    const vehicles = []
    if (vehicleData && vehicleData.entity) {
      vehicleData.entity.forEach(v => {
        const trip = TRIPS.find(t => t.trip_id === Number(v.vehicle.trip.trip_id))
        if (trip) {
          const vehicleRoute = ROUTES.find(route => route.route_id === trip.route_id)
          vehicles.push({ position: v.vehicle.position, route: vehicleRoute })
        }
      })
    }
    setVehicles(vehicles)
  }, [vehicleData])

  // SET LINES OF ROUTES BASED ON FETCHED DATA
  useEffect(() => {
    if (tripData && tripData.entity) {
      const shapes = {}
      const tripIDs = tripData.entity.map(trip => trip.trip_update.trip.trip_id)
      tripIDs.forEach(id => {
        const trip = TRIPS.find(t => t.trip_id === Number(id))
        if (trip) {
          shapes[trip.shape_id] = ROUTES.find(r => r.route_id === trip.route_id)
        }
      })
      const lines = Object.keys(shapes).map(key => ({
        route_id: shapes[key].route_id,
        line: SHAPES[key],
        color: "#" + shapes[key].route_color
      }))

      setLines(lines)
    }
  }, [tripData])

  // FIND ACTIVE ROUTES
  useEffect(() => {
    if (tripData && tripData.entity) {
      const activeRoutesTemp = []
      const tripIDs = tripData.entity.map(t => t.trip_update.trip.trip_id)
      tripIDs.forEach(id => {
        const trip = TRIPS.find(t => t.trip_id === Number(id))
        if (trip) {
          activeRoutesTemp.push(ROUTES.find(r => r.route_id === trip.route_id).route_id)
        }
      })
      let filteredActiveRoutes = [];
      activeRoutesTemp.forEach((route) => {
        if (!filteredActiveRoutes.includes(route)) {
          filteredActiveRoutes.push(route);
        }
      });
      setActiveRoutes(filteredActiveRoutes)
    }
  }, [tripData])

  //FIND ACTIVE STOPS
  useEffect(() => {
    const tempActiveStopIDs = []
    activeRoutes.forEach(route => {
      const iterableSetOfStops = Array.from(routeToStops[route])
      iterableSetOfStops.forEach(stopCode => {
        if (!tempActiveStopIDs.includes(stopCode)) {
          tempActiveStopIDs.push(stopCode);
        }
      })
    })

    const tempActiveStops = []
    STOPS.forEach(stop => {
      if (tempActiveStopIDs.includes(stop.stop_code)) {
        tempActiveStops.push(stop)
      }
    })

    setActiveStops(tempActiveStops)

  }, [activeRoutes])

  const [map, setMap] = React.useState(null)
  const [selectedMarker, setSelectedMarker] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
  }

  return isLoaded ? (
    // CONCEPT: MAP
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      clickableIcons={false}
      onUnmount={onUnmount}
    >
      {activeStops.map(s => (
        <OverlayView
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          position={{ lat: s.stop_lat, lng: s.stop_lon }}
          label={s.stop_name}
          key={s.stop_code}
          onMouseOver={() => {
            setSelectedMarker(s)
          }}
          onMouseOut={() => {
            setSelectedMarker("")
          }}
        >
          <div className='stop' onClick={() => { setSelectedMarker(s) }}></div>
        </OverlayView>
      ))}

      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.stop_lat, lng: selectedMarker.stop_lon }}
          options={{ pixelOffset: new window.google.maps.Size(0, -10) }}
          onCloseClick={() => {
            setSelectedMarker("");
          }}
        >
          <div style={divStyle}>
            <h1>{selectedMarker.stop_name}</h1>
          </div>
        </InfoWindow>
      )}

      {/* CONCEPT: ACTIVE ROUTES */}
      {lines
        .map(({ line, color }, i) => (
          <Polyline path={line} key={i} options={{
            strokeColor: color,
            strokeOpacity: 1,
            strokeWeight: 5,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            clickable: true,
            draggable: false,
            editable: false,
            visible: true,
            radius: 30000,
            zIndex: 1
          }} />
        ))}

      {/* CONCEPT: ACTIVE SHUTTLES */}
      {vehicles.map((v, i) => (
        <OverlayView key={i} position={{ lat: v.position.latitude, lng: v.position.longitude }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div className='bus' style={{ boxShadow: hexToRGB('#' + v.route.route_color, 0.5) + ' 0 0 12px', transformOrigin: 'center', transform: 'translate(-50%, -50%) ' + 'rotate(' + (v.position.bearing % 360) + 'deg)' }} onClick={() => { setSelectedVehicle(v) }}>
            <BusIcon color={v.route.route_color}></BusIcon>
          </div>
        </OverlayView>
      ))}

      {selectedVehicle && (
        <InfoWindow
          position={{ lat: selectedVehicle.position.latitude, lng: selectedVehicle.position.longitude }}
          options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
          onCloseClick={() => {
            setSelectedVehicle("")
          }}
        >
          <div style={divStyle}>
            <h1>{selectedVehicle.route.route_long_name}</h1>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <></>
}

export default React.memo(MapComponent)