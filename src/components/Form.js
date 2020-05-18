import React, {useState} from 'react';
import Error from  './Error';
import PropTypes from 'prop-types';


const Form = ({guardarBusquedaLetra}) => {

    //state de la busqueda
    const [busqueda, guardarBusqueda] = useState({
        artista: '',
        cancion: ''
    });
    //state de error
    const [error, guardarError] = useState(false);

    //extraer artista y cancion
    const {artista, cancion} = busqueda;

    //funcion a cada input para leer su contenido
    const actualizarState = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    }

    //consultar APIs
    const buscarInformacion = e => {
        e.preventDefault();

        //validar
        if(artista.trim() === '' || cancion.trim() === '') {
            guardarError(true);
            return;
        }

        guardarError(false);
        //pasar la busqueda al app.js
        guardarBusquedaLetra(busqueda);
    }


    return ( 
        <div className="bg-info">

            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}

            <div className="container">
                <div className="row">

                    <form
                        className="col card text-white bg-transparent mb-5 pt-5 pb-2"
                        onSubmit={buscarInformacion}
                    >
                        <fieldset>
                            <legend className="text-center">Buscador letras canciones</legend>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="artista"
                                            placeholder="Nombre del artista"
                                            onChange={actualizarState}
                                            value={artista}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Canción</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="cancion"
                                            placeholder="Nombre de la canción"
                                            onChange={actualizarState}
                                            value={cancion}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary float-right"
                            >Buscar</button>

                        </fieldset>
             
                    </form>
                </div>
            </div>
        </div>
        
     );
}

Form.propTypes = {
    guardarBusquedaLetra: PropTypes.func.isRequired
}
 
export default Form;