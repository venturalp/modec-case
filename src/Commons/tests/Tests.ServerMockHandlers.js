import { CityWeatherMock } from 'Modules/openweather/__mocks__/Openweather.Mocks'
import { rest } from 'msw'

const handlers = [
  // Weather
  rest.get('https://api.openweathermap.org/data/2.5/find', (req, res, ctx) =>
    res(ctx.json(CityWeatherMock)),
  ),
  rest.get('http://foo.bar', (req, res, ctx) =>
    res(ctx.json({ success: true })),
  ),
]

export { handlers }
