import React from 'react'

import Navbar from '../components/Navbar'
import Rotas from './Rotas'

import 'toastr/build/toastr.min.js'
import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'

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
