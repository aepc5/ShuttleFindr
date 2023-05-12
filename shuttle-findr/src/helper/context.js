import React, { useEffect, useState, createContext } from 'react'
import { TRIP_UPDATES, VEHICLE_POS } from './urls'

export const Context = createContext("");

export const ContextProvider = ({ children }) => {
  const [tripData, setTripData] = useState(null)
  const [vehicleData, setVehicleData] = useState(null)

  const fetchData = async () => {
    // FETCH TRIP DATA
    await fetch(TRIP_UPDATES)
      .catch(() => { console.log("ERROR") })
      .then(r => r.json())
      .then(newData => {
        let trips = []
        if (newData.entity && newData) {
          trips = newData.entity
        }
        setTripData({ entity: trips })
      })

    // FETCH VEHICLE DATA
    await fetch(VEHICLE_POS)
      .catch(() => { console.log("ERROR") })
      .then(r => r.json())
      .then(d => {
        let vehicles = []
        if (d.entity && d) {
          vehicles = d.entity
        }
        setVehicleData({ entity: vehicles })
      })
  }

  // UPDATE DATA EVERY HALF A SECOND
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <Context.Provider value={{ tripData, vehicleData }}>
      {children}
    </Context.Provider>
  )
}
