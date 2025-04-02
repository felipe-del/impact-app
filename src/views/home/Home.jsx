import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="row">
                <div className="row">
                    <div className="col-md-6 mb-4 d-flex">
                        <div className="entity-card flex-fill">
                            <img src="/logo_3_lightblue.png" alt="Escudo IMPACT" className="impact-img" />
                            <h5 className="entity-title"><b>IMPACT</b></h5>
                            <p className="paragraph">
                                El sistema <i>IMPACT</i> es una plataforma web diseñada para gestionar el inventario
                                del <i>Centro de Investigación de Matemática Pura y Aplicada</i> de manera eficiente. Permite controlar
                                detalladamente los bienes del centro, incluyendo activos, productos y espacios comunes para eventos.
                                Además, le permite a los usuarios solicitar un préstamo de un material o un espacio que requieran para su trabajo.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4 d-flex">
                        <div className="entity-card flex-fill">
                            <img src="/workTeam.png" alt="Equipo de Trabajo" className="workTeam-img" />
                            <h5 className="entity-title"><b>Equipo de Trabajo</b></h5>
                            <p className="paragraph" style={{textAlign: 'center'}}>
                                Raquel Alfaro Barrantes <i>(Scrum Master)</i><br/>
                                Nazareth Maria Gonzalez Benavides <br/>
                                Isaac Felipe Brenes Calderón<br/>
                                Marco Leandro Chacón<br/>
                                Dilan Hernández Ulate<br/>
                                Joel Ramírez Vargas<br/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="row">
                    <div className="col-md-6 mb-4 d-flex">
                        <div className="entity-card flex-fill">
                            <img src="/Escudo_UCR.png" alt="Escudo UCR" className="escudo-img" />
                            <h5 className="entity-title"><b>Universidad de Costa Rica</b></h5>
                            <p className="paragraph">
                                La Universidad de Costa Rica es una institución de educación superior y cultura, autónoma y
                                democrática, dedicada a la enseñanza, la investigación, la acción social, la creación artística
                                y la difusión del conocimiento.
                            </p>
                            <a href="https://www.ucr.ac.cr/" target="_blank" rel="noopener noreferrer" className="ucr-link">
                                Visita la UCR <i className="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4 d-flex">
                        <div className="entity-card flex-fill">
                            <img src="/CIMPA.png" alt="Escudo CIMPA" className="escudo-img cimpa-img" />
                            <h5 className="entity-title"><b>CIMPA</b></h5>
                            <p className="paragraph">
                                El Centro de Investigación en Matemática Pura y Aplicada (CIMPA) se especializa en la
                                investigación avanzada en matemáticas, tanto en las ramas teóricas como en las aplicaciones,
                                y ha tenido un papel clave en el desarrollo matemático a nivel nacional y regional.
                            </p>
                            <a href="https://www.cimpa.ucr.ac.cr/" target="_blank" rel="noopener noreferrer" className="ucr-link">
                                Visita el CIMPA <i className="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Home;
