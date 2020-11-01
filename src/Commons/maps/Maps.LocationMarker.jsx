import React, { useState } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'

export const LocationMarker = ({ onClickMarker }) => {
  const [position, setPosition] = useState(null)
  useMapEvents({
    click(e) {
      setPosition(e.latlng)
      onClickMarker(e.latlng)
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Current Marker position</Popup>
    </Marker>
  )
}
