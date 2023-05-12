import React, { useState } from 'react'
import CloseButton from './closeButton'

const PopUpDirections = ({
    startTime,
    startStop,
    destinationStop,
    route,
    numberOfStops,
    setValue
}) => {
    const [xFill, setXFill] = useState("#A30F33")
    const [bgFill, setBGFill] = useState("#E9C6CB")
    const hoverFills = () => {
        setXFill("#FFFFFF")
        setBGFill("#A30F33")
    }
    const regularFills = () => {
        setXFill("#A30F33")
        setBGFill("#E9C6CB")
    }

    return (
        <div className='directions'>
            <div className='closeButton' onMouseOver={() => { hoverFills() }} onMouseOut={() => { regularFills() }} onClick={() => { setValue(false) }}><CloseButton xFill={xFill} bgFill={bgFill} /></div>
            <h2 className='routeTitle' style={{ background: "#" + route.route_color, color: "#" + route.route_text_color }}>{route.route_long_name}</h2>
            <h3 className='smallHeader'>Depart From:</h3>
            <h2 className='stopTitle'><span className='stopName'>{startStop.stop_name}</span> at {startTime.toLocaleTimeString()}</h2>
            <h3 className='smallHeader'>Arrive At:</h3>
            <h2 className='stopTitle'><span className='stopName'>{destinationStop.stop_name}</span> after {numberOfStops - 1} stops</h2>
        </div>
    )
}

export default PopUpDirections
