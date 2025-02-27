import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="welcome-container">
                <h2 className="title">
                    <b>Sistema IMPACT del CIMPA</b>
                </h2>
                <p className="paragraph">
                    El sistema <i>IMPACT</i> es una plataforma web diseñada para gestionar los activos y el inventario
                    del <i>Centro de Investigación de Matemática Pura y Aplicada</i> de manera eficiente. Permite llevar
                    un control detallado de los bienes del centro, incluyendo equipos, productos de limpieza y material
                    de oficina, así como la administración de espacios comunes para eventos. Además, le permite a los
                    usuarios solicitar un préstamo de un material o un espacio que requieran para su trabajo.
                </p>
            </div>

            <div className="entities">
                <div className="entity-card">
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

                <div className="entity-card">
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
    );
};

export default Home;
