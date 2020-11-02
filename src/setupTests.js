import '@testing-library/jest-dom/extend-expect'
import { server } from 'Commons/tests/Tests.MockServer'

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => server.close())
