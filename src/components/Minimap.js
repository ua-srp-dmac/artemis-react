import React, { useState, Component, Fragment } from "react";
import { 
  MapContainer,
  TileLayer,
  Rectangle,
  useMap,
  useMapEvent,
  useMapEvents } from 'react-leaflet';

import {useEventHandlers} from '@react-leaflet/core';

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const BOUNDS_STYLE = { weight: 1 }

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap()


  // Clicking a point on the minimap sets the parent's map center
  const onClick = React.useCallback(
    (e) => {
      console.log(parentMap.getZoom())
      parentMap.setView(e.latlng, parentMap.getZoom())
    },
    [parentMap],
  )
  useMapEvent('click', onClick)

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = React.useState(parentMap.getBounds())
  const onChange = React.useCallback(() => {
    setBounds(parentMap.getBounds())
    // Update the minimap's view to match the parent map's center and zoom
    let parentZoom = parentMap.getZoom();
    minimap.setView(parentMap.getCenter(), parentZoom < 8 ? parentZoom * .6 : 8)
  }, [minimap, parentMap, zoom])

  // Listen to events on the parent map
  const handlers = React.useMemo(() => ({ move: onChange, zoom: onChange }), [])
  useEventHandlers({ instance: parentMap }, handlers)

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
}

function Minimap({ position, zoom }) {

  
  const parentMap = useMap()
  const mapZoom = zoom || 0

  console.log(parentMap)
  console.log(mapZoom)

  // Memoize the minimap so it's not affected by position changes
  const minimap = React.useMemo(
    () => (
      <MapContainer
        style={{ height: 150, width: 150 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [],
  )

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  )
}


export default Minimap;