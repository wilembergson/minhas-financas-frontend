import React from 'react'

import Navbar from '../components/Navbar'
import Rotas from './Rotas'
import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'

function App() {
  return (
    <>
      <Navbar/>
      <div>
        <Rotas/>
      </div>
    </>
  );
}

export default App;
