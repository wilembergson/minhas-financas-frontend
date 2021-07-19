import React from 'react'

import Navbar from '../components/Navbar'
import Rotas from './Rotas'

import 'toastr/build/toastr.min.js'
import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'


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
