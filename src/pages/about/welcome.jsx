import React, { useEffect } from 'react';
import './welcome.css'; 
import { UCR } from '../../declarations/imageExports';
import { CIMPA } from '../../declarations/imageExports';
import { usePage } from '../../context/pageContext';

const Welcome= () => {

  return(
    <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/app/welcome">Inicio</a></li>
                </ol>
            </nav>
    <div className='welcome-container'>
      <div>
        <h2 className='title'><b>Bienvenidos al Sistema IMPACT del CIMPA</b></h2>
        <p className='paragraph'> El sistema <i>IMPACT</i> es una plataforma web diseñada para 
        gestionar los activos y el inventario del <i>Centro de Investigación de Matemática 
        Pura y Aplicada </i> de manera eficiente. Permite llevar un control detallado
        de los bienes del centro, incluyendo equipos, productos de limpieza y material 
        de oficina, así como la administración de espacios comunes para eventos. Además 
        le permite a los usuarios solicitar un préstamo de un material o un espacio que 
        requieran para su trabajo.</p>
      </div>
      <div className='entities'>
        <div className='UCR'>
        <img src={UCR} alt="Escudo UCR" className="escudo-img" />
        {/* <br></br> */}
            <h5 className='title'><b>Universidad de Costa Rica</b></h5>
            <p className='paragraph'>
            La Universidad de Costa Rica es una institución de educación superior y cultura, 
            autónoma constitucionalmente y democrática, constituida por una comunidad de 
            profesores y profesoras, estudiantes, funcionarias y funcionarios administrativos,
            dedicada a la enseñanza, la investigación, la acción social, el estudio, la meditación, 
            la creación artística y la difusión del conocimiento. 
            </p>
            <a href="https://www.ucr.ac.cr/" target="_blank" rel="noopener noreferrer" className="ucr-link">
                Visita la UCR  {'\u2192'}
            </a>
        </div>
        <div className='CIMPA'>
        <img src={CIMPA} alt="Escudo UCR" className="escudo-img2" />
        <h5 className='title'><b>CIMPA</b></h5>
        <p className='paragraph'>
        El Centro de Investigación en Matemática Pura y Aplicada (CIMPA) es una unidad especializada 
        en la investigación avanzada en matemáticas, tanto en las ramas teóricas como en las aplicaciones.
        El Centro ha tenido un rol fundamental en el desarrollo de la investigación matemática a nivel 
        nacional y regional. Se encuentra adscrito a la Vicerrectoría de Investigación de la Universidad 
        de Costa Rica.
        </p>
        <a href="https://www.cimpa.ucr.ac.cr/" target="_blank" rel="noopener noreferrer" className="ucr-link">
                Visita al CIMPA  {'\u2192'}
            </a>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Welcome;