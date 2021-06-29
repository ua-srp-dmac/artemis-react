import React from "react";
import '../App.css';


const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

function Logo({ position, zoom }) {

  // Memoize the minimap so it's not affected by position changes
  const logo = React.useMemo(
    () => (
      <div id="logoContainer" className="leaflet-credits-control">
        <a><img src="srp-logo.png" alt="Logo"></img></a>
      </div>
    ),
    [],
  )

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className="leaflet-control">
        {logo}
      </div>
    </div>
  )
}

export default Logo;