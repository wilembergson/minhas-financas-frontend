import React from 'react'

import Navbar from '../components/Navbar'
import Rotas from './Rotas'

import 'toastr/build/toastr.min.js'
import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'
import ProvedorAutenticacao from './ProvedorAutenticacao'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'


function App() {
  return (
    <ProvedorAutenticacao>
      <Navbar/>
      <div>
        <Rotas/>
      </div>
    </ProvedorAutenticacao>
  );
}

export default App;
