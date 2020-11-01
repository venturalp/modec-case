import { CityList } from 'Commons/city/City.CityList'
import { LocationMarker } from 'Commons/maps/Maps.LocationMarker'
import { ErrorMessage } from 'Commons/message/Message.ErrorMessage'
import { scrollTo } from 'Commons/scroll/Scroll.Helpers'
import { useOpenweatherServices } from 'Modules/openweather/Openweather.services'
import React, { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Element } from 'react-scroll'
import styled from 'styled-components'

const MapContainerStyled = styled(MapContainer)`
  width: 100%;
  height: 60vh;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid #999;
  @media (min-width: 768px) {
    width: 80%;
    height: 80vh;
  }
`
const HomeContainer = styled.div`
  text-align: center;
  & .city-list {
    margin: 25px auto;
  }
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
  const [errorMessage, setErrorMessage] = useState('')
  const { getAroundCities } = useOpenweatherServices()

  const onClickMarker = latlng => setPosition(latlng)

  const doSearch = async () => {
    setErrorMessage('')
    if (!position) {
      setErrorMessage('Please check a place in the map first!')

      return
    }
    const getCities = await getAroundCities(position)

    if (getCities.success) {
      setCitiesData(getCities.data.list)
      scrollTo('cities-table')
    } else {
      setErrorMessage(
        'Something wrong trying to fetch cities information, please try again!',
      )
    }
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
      <ErrorMessage error={errorMessage} />
      <SearchButton onClick={doSearch}>Search</SearchButton>
      {citiesData?.length > 0 && (
        <Element name="cities-table">
          <CityList
            cities={citiesData}
            showDetails={city => console.log(city)}
          />
        </Element>
      )}
    </HomeContainer>
  )
}
