import { LocationMarker } from 'Commons/maps/Maps.LocationMarker'
import { useOpenweatherServices } from 'Modules/openweather/Openweather.services'
import React, { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import styled from 'styled-components'

const MapContainerStyled = styled(MapContainer)`
  width: 80%;
  height: 80vh;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid #999;
`
const HomeContainer = styled.div`
  text-align: center;
`

const SearchButton = styled.div`
  border: ${props => `1px solid ${props.theme.mainColor}`};
  cursor: pointer;
  display: inline-block;
  color: #fff;
  background-color: ${props => props.theme.mainColor};
  border-radius: 50px;
  margin-top: 25px;
  padding: 12px 30px;
  font-size: ${props => props.theme.pxToRem(22)};
`

export const HomePage = () => {
  const [position, setPosition] = useState()
  const [citiesData, setCitiesData] = useState([])
  const { getAroundCities } = useOpenweatherServices()

  const onClickMarker = latlng => setPosition(latlng)

  const doSearch = async () => {
    const getCities = await getAroundCities(position)

    setCitiesData(getCities.data.list)
  }

  return (
    <HomeContainer>
      <MapContainerStyled center={{ lat: -23.5486, lng: -46.6382 }} zoom={13}>
        <LocationMarker onClickMarker={onClickMarker} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainerStyled>
      <SearchButton onClick={doSearch}>Search</SearchButton>
      <table>
        <tbody>
          {citiesData?.map(city => (
            <tr key={city.id}>
              <td>{city.id}</td>
              <td>{city.name}</td>
              <td>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => console.log(city)}
                >
                  see more
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </HomeContainer>
  )
}
