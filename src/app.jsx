/* eslint-disable operator-linebreak */
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { routes } from 'Modules/router/Router.routes'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { useApplicationStore } from 'Modules/application/Application.Store'
import { LoadingDefault } from 'Commons/loading/Loading.LoadingDefault'

export const App = () => {
  const { isLoading } = useApplicationStore()
  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  })

  L.Marker.prototype.options.icon = DefaultIcon

  return (
    <BrowserRouter>
      {isLoading && <LoadingDefault />}
      <Switch>
        {routes.map(route => (
          <Route {...route} key={route.path} />
        ))}
      </Switch>
    </BrowserRouter>
  )
}

export default App
