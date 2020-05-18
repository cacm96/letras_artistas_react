import React, {Fragment, useState, useEffect} from 'react';
import Form from './components/Form';
import Lyrics from './components/Lyrics';
import Info from './components/Info';
import axios from 'axios';

function App() {

  //definir el state
  const [busquedaletra, guardarBusquedaLetra] = useState({}); 
  //state para guardar la letra
  const [letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});


  //useeffect que consulta la api cada vez que se busca algo
  useEffect(() => {
    if(Object.keys(busquedaletra).length === 0) return;

    const consultarAPILetra = async () => {

       //extraer datos de la busqueda
      const {artista, cancion} = busquedaletra;

      const urlLetra = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const urlInfo = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      //hacer la consulta de las dos apis
      const [letra, info] = await Promise.all([
        //ahora con el promise ambas consultas se hacen al mismo tiempo
        axios.get(urlLetra),
        axios.get(urlInfo)
      ]);

      guardarInfo(info.data.artists[0]);
      guardarLetra(letra.data.lyrics);
    }
    consultarAPILetra();

  }, [busquedaletra]);


  return (
    <Fragment>
      <Form 
        guardarBusquedaLetra={guardarBusquedaLetra}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Lyrics
              letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
