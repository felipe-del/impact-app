import React, { useState, useEffect } from 'react';
 import './Register.css';

const Register = () => {
    const [types, setTypes] = useState([]);
    const [measureU, setMeasureU] = useState([]);
    const [name, setName] = useState(''); // State for name
    const [minQuantity, setMinQuantity] = useState(''); // State for min quantity
    const [type, setType] = useState(''); // State for product type
    const [measureUnit, setMeasureUnit] = useState(''); // State for unit of measurement

    useEffect(() => {
        fetch('http://localhost:8080/product/units')
            .then(response => response.json())
            .then(data => {setMeasureU(data)
                if (data.length > 0) {
                    setMeasureUnit(data[0].id);
                }
            })
            .catch(error => console.error('Fetch error:', error));

        fetch('http://localhost:8080/product/types')
            .then(response => response.json())
            .then(data => {setTypes(data);
        if (data.length > 0) {
            setType(data[0].id);
        }})
            .catch(error => console.error('Fetch error:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCategory = {
            name,
            cantidadMinima: minQuantity,
            categoryType:  type,
            unit_of_measurement:  measureUnit
        };
        console.log(newCategory);
        fetch('http://localhost:8080/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert('Categoría guardada exitosamente');
            })
            .catch(error => {
                console.error('Error al guardar categoría:', error);
            });
    };
    const handdleRegisterP= ()=>{
        window.location.href='\productRegister'
    }
    return (
        <div className="main-container">
            <div className="button-container">
                <h1>Registro de categorías</h1>
                <div className="ver-inventario">
                    <button className="button-5" role="button" onClick={handdleRegisterP} >Registro productos</button>
                </div>
            </div>

            <div className="container">
                <h3>Datos de la categoría</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="input-group">
                            <label htmlFor="name">Nombre del producto</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="min-quantity">Cantidad mínima</label>
                            <input
                                type="number"
                                id="min-quantity"
                                value={minQuantity}
                                onChange={(e) => setMinQuantity(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <label htmlFor="type">Tipo del producto</label>
                            <select
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="measure_unit">Unidad de medida</label>
                            <select
                                id="measure_unit"
                                value={measureUnit}
                                onChange={(e) => setMeasureUnit(e.target.value)}
                                required
                            >
                                {measureU.map((measure) => (
                                    <option key={measure.id} value={measure.id}>
                                        {measure.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="button">
                        <button className="button-5" type="submit" role="button">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
