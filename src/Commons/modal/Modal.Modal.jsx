import { ClickOutside } from 'Commons/containers/Containers.ClickOutside'
import React from 'react'
import styled from 'styled-components'
import IcoClose from 'Assets/close.svg'

const ModalStyled = styled(ClickOutside)`
  border-radius: ${props => props.theme.modalRadius};
  box-shadow: 0 16px 10px 0 rgba(0, 0, 0, 0.16);
  z-index: 99;
  background-color: #ffffff;
  max-width: 90%;
  padding: 24px;
  position: relative;
  @media (min-width: 650px) {
    width: auto;
  }
`

const BtnClose = styled(IcoClose)`
  cursor: pointer;
  position: absolute;
  right: 2px;
  top: 2px;
  fill: #000;
  width: 20px;
  height: 20px;
`

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
`

const ModalBg = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
`

export const Modal = ({ children, onClose, open, testid }) =>
  open ? (
    // eslint-disable-next-line react/destructuring-assignment
    <ModalWrapper data-testid={testid}>
      <ModalBg data-testid="modalBg" />
      <ModalStyled onClickOutisde={onClose}>
        <>
          <BtnClose onClick={onClose} data-testid="btnCloseModal" />
          {children}
        </>
      </ModalStyled>
    </ModalWrapper>
  ) : null
