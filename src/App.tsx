import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { GlobalStyle } from './core/theme/globalStyle'
import { AuthProvider } from './core/contexts/Auth'

function App () {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
