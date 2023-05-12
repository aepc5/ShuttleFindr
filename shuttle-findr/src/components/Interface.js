import React, { useState, useEffect, useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { STOPS } from '../helper/stops';
import { TRIPS } from '../helper/trips'
import { ROUTES } from '../helper/routes'
import { ROUTEID_TO_STOPS } from '../helper/routeIDtoStops'
import { Context } from '../helper/context'
import PopUpDirections from './popUpDirections.js'

function Interface() {
  const [from, setFrom] = useState(null);
  const [tempFrom, setTempFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [tempTo, setTempTo] = useState(null);
  const [numberOfStops, setNumberOfStops] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [routeToStops, setRouteToStops] = useState({})
  const [stopToRoutes, setStopToRoutes] = useState({})
  const [activeRoutes, setActiveRoutes] = useState([])
  const [activeStopIDs, setActiveStopIDs] = useState([])
  const [availableStops, setAvailableStops] = useState([])
  const [activeStops, setActiveStops] = useState([])
  const [stopSelected, setStopSelected] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [directionsPopup, setDirectionsPopup] = useState(false)
  const { tripData } = useContext(Context)

  const createRoute = (from, to) => {
    if (from == to) {
      console.log("ERROR Your to and from cannot be the same");
      return
    }
    if (from == '' || to == '') {
      console.log("ERROR Fill in both to and from fields");
      return
    }

    //Find possible routes
    const tempRoutes = []
    Array.from(stopToRoutes[from.stop_code]).forEach(fromRoute => {
      Array.from(stopToRoutes[to.stop_code]).forEach(toRoute => {
        if (fromRoute == toRoute) {
          tempRoutes.push(fromRoute)
        }
      })
    })

    const fromArrivalTimes = []
    tripData.entity.forEach(tripUpdate => {
      const trip = TRIPS.find(trip => trip.trip_id === Number(tripUpdate.trip_update.trip.trip_id))
      if (trip != null) {
        tempRoutes.forEach(route => {
          if (trip.route_id == route) {
            tripUpdate.trip_update.stop_time_update.forEach(stopArrival => {
              if (stopArrival.stop_id == from.stop_id) {
                fromArrivalTimes.push({ time: stopArrival.arrival.time, route: trip.route_id, trip: trip.trip_id })
              }
            })
          }
        })
      }
    })

    var soonestPickup = fromArrivalTimes[0]
    Array.from(fromArrivalTimes).forEach(time => {
      if (time.time < soonestPickup.time) {
        soonestPickup = time
      }
    })
    setStartTime(new Date(soonestPickup.time * 1000))

    //Find number of stops between the two
    const route = ROUTES.find(route => route.route_id === soonestPickup.route)
    setSelectedRoute(route)

    const routeWithStops = ROUTEID_TO_STOPS[route.route_id]

    var toRouteStopIndex = 0;
    var fromRouteStopIndex = 0;
    routeWithStops.stops.forEach(stop => {
      if (stop.stop_name == from.stop_name) {
        fromRouteStopIndex = stop.stop_number
      }
      if (stop.stop_name == to.stop_name) {
        toRouteStopIndex = stop.stop_number
      }
    })

    var numberOfStops = 0
    if (toRouteStopIndex > fromRouteStopIndex) {
      numberOfStops = toRouteStopIndex - fromRouteStopIndex
    } else {
      numberOfStops = routeWithStops.stops.length - fromRouteStopIndex + toRouteStopIndex
    }

    setNumberOfStops(numberOfStops)

    setDirectionsPopup(true)
  }

  const selectFromStop = value => {
    setFrom(value)
    if (value != null) {
      filterStopsBasedOnRoute(value)
    } else {
      //Show All active
      if (to != null) {
        filterStopsBasedOnRoute(to)
      } else {
        setAvailableStops(activeStops)
      }
    }

    setStopSelected(true)
  }

  const selectToStop = value => {
    setTo(value)
    if (value != null) {
      filterStopsBasedOnRoute(value)
    } else {
      //Show All active
      setAvailableStops(activeStops)
    }

    if (from != null) {
      filterStopsBasedOnRoute(from)
    } else {
      setAvailableStops(activeStops)
    }

    setStopSelected(true)
  }

  const filterStopsBasedOnRoute = value => {
    const availableStops = new Set()
    const iterableRoutes = Array.from(stopToRoutes[value.stop_code])
    const iterableActiveRoutes = []
    iterableRoutes.forEach(route => {
      if (activeRoutes.includes(route)) {
        iterableActiveRoutes.push(route)
      }
    })

    iterableActiveRoutes.forEach(route => {
      routeToStops[route].forEach(stop => {
        if (!availableStops.has(stop)) {
          availableStops.add(STOPS.find(element => element.stop_code == stop)) //STOPS.find(element => element.stop_name == stop.stop_name)
        }
      })
    })

    setAvailableStops(Array.from(availableStops))
  }

  // FIND ALL ACTIVE ROUTES
  useEffect(() => {
    if (tripData && tripData.entity) {
      const activeRoutesTemp = []
      const tripIDs = tripData.entity.map(t => t.trip_update.trip.trip_id)
      tripIDs.forEach(tripID => {
        const trip = TRIPS.find(t => t.trip_id === Number(tripID))
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

  // CREATE A ROUTE TO STOPS DICTIONARY
  useEffect(() => {
    const temp = {}
    Object.keys(ROUTEID_TO_STOPS).forEach(key => {
      const { stops, route_id } = ROUTEID_TO_STOPS[key]
      stops.forEach(stop => {
        if (temp[route_id]) {
          temp[route_id].add(STOPS.find(element => element.stop_name == stop.stop_name).stop_code)
        } else {
          temp[route_id] = new Set([STOPS.find(element => element.stop_name == stop.stop_name).stop_code])
        }
      })
    })
    setRouteToStops(temp)
  }, [])

  // CREATE A STOP TO ROUTES DICTIONARY
  useEffect(() => {
    const temp = {}
    Object.keys(ROUTEID_TO_STOPS).forEach(key => {
      const { stops, route_id } = ROUTEID_TO_STOPS[key]
      stops.forEach(stop => {
        if (temp[STOPS.find(element => element.stop_name == stop.stop_name).stop_code]) {
          temp[STOPS.find(element => element.stop_name == stop.stop_name).stop_code].add(route_id)
        } else {
          temp[STOPS.find(element => element.stop_name == stop.stop_name).stop_code] = new Set([route_id])
        }
      })
    })
    setStopToRoutes(temp)
  }, [])

  //FIND ACTIVE STOPS
  useEffect(() => {
    if (!stopSelected) {
      const tempActiveStopIDs = []
      activeRoutes.forEach(route => {
        const iterableSetOfStops = Array.from(routeToStops[route])
        iterableSetOfStops.forEach(stopCode => {
          if (!tempActiveStopIDs.includes(stopCode)) {
            tempActiveStopIDs.push(stopCode);
          }
        })
      })

      setActiveStopIDs(tempActiveStopIDs)
      const tempActiveStops = []
      STOPS.forEach(stop => {
        if (activeStopIDs.includes(stop.stop_code)) {
          tempActiveStops.push(stop)
        }
      })

      setActiveStops(tempActiveStops)
      if (!stopSelected) {
        setAvailableStops(tempActiveStops)
      }
    }
  }, [activeRoutes])

  return (
    <div className='pageWrapper'>
      {/* CONCEPT: TRIP */}
      {directionsPopup && (
        <div className='popupWrapper'>
          <PopUpDirections setValue={setDirectionsPopup} startStop={from} destinationStop={to} route={selectedRoute} startTime={startTime} numberOfStops={numberOfStops}></PopUpDirections>
        </div>
      )}

      <div className="interface-container">
        <h2>Find a Route</h2>
        <h4>From</h4>
        <div>
          {/* CONCEPT: STOP SEARCH */}
          <Autocomplete
            disablePortal
            isOptionEqualToValue={(option, value) => {
              return option.stop_code == value.stop_code
            }}
            value={from}
            onChange={(event, newValue) => {
              selectFromStop(newValue);
            }}
            inputValue={tempFrom}
            onInputChange={(event, newInputValue) => {
              setTempFrom(newInputValue);
            }}
            options={availableStops}
            getOptionLabel={(option) => option.stop_name}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input className='stop-input' type="text" {...params.inputProps} placeholder='Search Stops...' />
              </div>
            )}
          />
        </div>

        <h4>To</h4>
        <div>
          {/* CONCEPT: STOP SEARCH */}
          <Autocomplete
            disablePortal
            isOptionEqualToValue={(option, value) => {
              return option.stop_code == value.stop_code
            }}
            value={to}
            onChange={(event, newValue) => {
              selectToStop(newValue);
            }}
            inputValue={tempTo}
            onInputChange={(event, newInputValue) => {
              setTempTo(newInputValue);
            }}
            options={availableStops}
            getOptionLabel={(option) => option.stop_name}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input className='stop-input' type="text" {...params.inputProps} placeholder='Search Stops...' />
              </div>
            )}
          />
        </div>
        <button className='submit-button' onClick={() => createRoute(from, to)} disabled={to == null || to == '' || from == null || from == '' || to == from}>Find</button>
      </div>
    </div>
  )
}

export default Interface;