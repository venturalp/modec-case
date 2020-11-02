/* eslint-disable camelcase */
import { Modal } from 'Commons/modal/Modal.Modal'
import React from 'react'
import styled from 'styled-components'

const ModalCityContainer = styled.div`
  background-color: #ccc;
  padding: 30px;
  border: 1px solid #000;
  color: #000;
  text-align: center;
  & h1 {
    padding: 0;
    margin: 0 0 20px;
    font-size: ${props => props.theme.pxToRem(26)};
  }
  & h2 {
    padding: 0;
    margin: 0 0 10px;
    font-size: ${props => props.theme.pxToRem(20)};
  }
  & p {
    padding: 0;
    margin: 0;
    font-size: ${props => props.theme.pxToRem(16)};
  }
  @media (min-width: 768px) {
    & h1 {
      font-size: ${props => props.theme.pxToRem(34)};
    }
    & h2 {
      font-size: ${props => props.theme.pxToRem(20)};
    }
    & p {
      font-size: ${props => props.theme.pxToRem(18)};
    }
  }
`

export const ModalCity = ({ open, onClose, ...props }) => {
  const { name, main: { temp_max, temp_min } = {} } = props

  return (
    <Modal open={open} onClose={onClose} testid="modalCity">
      <ModalCityContainer>
        <h1>{name}</h1>
        <h2>Temperatures:</h2>
        <p>{`Min: ${temp_min}ºC - Max: ${temp_max}ºC`}</p>
      </ModalCityContainer>
    </Modal>
  )
}
