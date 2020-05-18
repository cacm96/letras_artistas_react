import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const Lyrics = ({letra}) =>  {
    if(letra.length === 0) return null;

    return ( 
        <Fragment>
            <h2>Letra canción</h2>
            <p className="letra">{letra}</p>
        </Fragment>
        
    );
 }

 Lyrics.propTypes = {
    letra: PropTypes.string.isRequired
}

export default Lyrics;