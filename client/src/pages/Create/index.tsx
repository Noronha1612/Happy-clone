import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import HappyPoint from '../../assets/HappyPoint.png'

import './styles.css';

const Create: React.FC = () => {
    const [ openOnWeekends, setOpenOnWeekends ] = useState(false);
    const [ formFull, setFormFull ] = useState(true);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    return (
        <div className="create-container" >
            <aside>
                <img src={HappyPoint} alt="Happy" className="happy-point"/>

                <Link to="/map" className="return-btn" >
                    <FaArrowLeft size={17} /> 
                </Link>
            </aside>

            <div className="content-container">
                <h4>Adicione um orfanato</h4>

                <fieldset>
                    <form onSubmit={ handleSubmit }>
                        <h2 className="section-title" >Dados</h2>

                        {/* <div>Mapa</div> */}

                        <section className="input-box">
                            <label htmlFor="nameForm">Nome</label>
                            <input type="text" id="nameForm" />
                        </section>
                        
                        <section className="input-box">
                            <span>
                                <label htmlFor="aboutForm">Sobre</label>
                                <span className="aditional" >Máximo de 300 caracteres</span>
                            </span>
                            <textarea id="aboutForm" maxLength={300} />
                        </section>

                        <section className="input-box">
                            <label htmlFor="whatsappForm">Número de Whatsapp</label>
                            <input type="text" id="whatsappForm" />
                        </section>

                        {/* <div>Fotos</div> */}

                        <h2 className="section-title">Visitação</h2>
                        
                        <section className="input-box">
                            <label htmlFor="instructionsForm">Instruções</label>
                            <textarea id="instructionsForm" />
                        </section>
                        
                        <section className="input-box">
                            <label htmlFor="hoursForm">Horário das visitas</label>
                            <input type="text" id="hoursForm" />
                        </section>

                        <section className="bool-section">
                            <label htmlFor="openOnWeekends">Atende fim de semana?</label>
                            <input type="checkbox" id="openOnWeekends" onChange={e => setOpenOnWeekends(e.target.checked)} />
                            <label htmlFor="openOnWeekends"  className={`checkbox ${openOnWeekends ? 'active' : ''}`} />
                        </section>

                        <button type="submit" disabled={!formFull} className={!formFull ? 'disabled': ''} >Confirmar</button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}

export default Create;