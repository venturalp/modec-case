import React from 'react'
import styled from 'styled-components'

const CityTable = styled.table`
  margin: 25px auto;
  border-collapse: collapse;
  max-width: 95%;
  & td,
  & th {
    padding: 4px 8px;
    font-size: ${props => props.theme.pxToRem(13)};
    border: 1px solid ${props => props.theme.mainColor};
  }
  & thead tr {
    background-color: ${props => props.theme.mainColor};
    color: #fff;
  }
  & tbody tr {
    background-color: #ceddf5;
    &:nth-child(even) {
      background-color: #f5ced2;
    }
  }
  & div[role='button'] {
    font-size: ${props => props.theme.pxToRem(11)};
    font-weight: bold;
  }
  @media (min-width: 768px) {
    & td,
    & th {
      padding: 10px 20px;
      font-size: ${props => props.theme.pxToRem(16)};
    }
    & div[role='button'] {
      font-size: ${props => props.theme.pxToRem(16)};
    }
  }
`

export const CityList = ({ cities, showDetails }) => (
  <CityTable className="city-list" data-testid="cityList">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      {cities?.map(city => (
        <tr key={city.id}>
          <td>{city.id}</td>
          <td>{city.name}</td>
          <td>
            <div role="button" tabIndex={0} onClick={() => showDetails(city)}>
              see more &gt;
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </CityTable>
)
