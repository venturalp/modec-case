import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { sleepTest, ThemeWrapper } from 'Commons/tests/Tests.Helpers'
import React from 'react'
import { HomePage } from '../Home.page'
import userEvent from '@testing-library/user-event'
import { rest, server } from 'Commons/tests/Tests.MockServer'

describe('test Home Page', () => {
  it('search without map clicking', async () => {
    render(
      <ThemeWrapper>
        <HomePage />
      </ThemeWrapper>,
    )

    const btnSearch = screen.getByRole('button', { name: 'Search' })
    userEvent.click(btnSearch)
    await waitFor(() => {
      expect(
        screen.queryByText('Please check a place on the map first!'),
      ).not.toBeNull()
    })
  })
  it('search with map clicking', async () => {
    const { container } = render(
      <ThemeWrapper>
        <HomePage />
      </ThemeWrapper>,
    )
    const mapContainer = container.querySelector(
      '.leaflet-tile-container img:first-child',
    )
    userEvent.click(mapContainer)
    const btnSearch = screen.getByRole('button', { name: 'Search' })
    userEvent.click(btnSearch)
    await waitFor(() => {
      expect(screen.getByTestId('cityList')).not.toBeNull()
    })
  })
  it('search map error', async () => {
    const { container } = render(
      <ThemeWrapper>
        <HomePage />
      </ThemeWrapper>,
    )
    server.use(
      rest.get(
        'https://api.openweathermap.org/data/2.5/find',
        (req, res, ctx) => res(ctx.status(400)),
      ),
    )

    const mapContainer = container.querySelector(
      '.leaflet-tile-container img:first-child',
    )
    userEvent.click(mapContainer)
    const btnSearch = screen.getByRole('button', { name: 'Search' })
    userEvent.click(btnSearch)
    await waitFor(() => {
      expect(
        screen.queryByText(
          'Something wrong trying to fetch cities information, please try again!',
        ),
      ).not.toBeNull()
    })
  })
  it('search with map clicking and open modal then close it', async () => {
    const { container } = render(
      <ThemeWrapper>
        <HomePage />
      </ThemeWrapper>,
    )
    const mapContainer = container.querySelector(
      '.leaflet-tile-container img:first-child',
    )
    userEvent.click(mapContainer)
    const btnSearch = screen.getByRole('button', { name: 'Search' })
    userEvent.click(btnSearch)
    await sleepTest()
    let btnCity
    await waitFor(() => {
      // eslint-disable-next-line prefer-destructuring
      btnCity = screen.queryAllByRole('button', { name: 'see more >' })[0]
    })
    userEvent.click(btnCity)
    let modalCity
    waitFor(() => {
      modalCity = screen.queryByTestId('modalCity')
    })
    expect(modalCity).toBeInTheDocument()

    fireEvent.keyDown(modalCity, {
      charCode: 27,
      code: 27,
      key: 'Esc',
      keyCode: 27,
    })

    waitFor(() => {
      expect(modalCity).not.toBeInTheDocument()
    })
    userEvent.click(btnCity)

    waitFor(() => {
      modalCity = screen.queryByTestId('modalCity')
    })
    expect(modalCity).toBeInTheDocument()
    const btnCloseModal = screen.queryByTestId('btnCloseModal')
    userEvent.click(btnCloseModal)

    waitFor(() => {
      expect(modalCity).not.toBeInTheDocument()
    })
  })
})
