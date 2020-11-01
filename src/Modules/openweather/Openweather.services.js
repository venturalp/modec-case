import axios from 'axios'

const apiKey = 'a79899327add58055c26a0389b23fd8c'

const getAroundCities = async ({ lat, lng } = {}) =>
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/find?units=metric&lat=${lat}&lon=${lng}&cnt=15&APPID=${apiKey}`,
    )
    .then(response => ({ success: true, data: response.data }))
    .catch(e => ({ succes: false, error: e }))

export const useOpenweatherServices = () => ({
  getAroundCities,
})
