import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import HappyPoint from '../../assets/HappyPoint.png'

import './styles.css';

const Create: React.FC = () => {
    const [ formFull, setFormFull ] = useState(true);

    // Fields
    const [ name, setName ] = useState('');
    const [ about, setAbout ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ instructions, setInstructions ] = useState('');
    const [ hours, setHours ] = useState('');
    const [ openOnWeekends, setOpenOnWeekends ] = useState(false);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    useEffect(() => {
        function validateInputs() {
            let allValid = true;
    
            if ( 
                name.length < 3 ||
                !about ||
                whatsapp.length !== 11 ||
                !instructions ||
                !hours
            ) allValid = false;
    
            return allValid;
        }

        setFormFull(validateInputs());
    }, [
        name,
        about,
        whatsapp,
        instructions,
        hours
    ]);

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
                            <input type="text" id="nameForm" onChange={e => setName(e.target.value)} />
                        </section>
                        
                        <section className="input-box">
                            <span>
                                <label htmlFor="aboutForm">Sobre</label>
                                <span className="aditional" >Máximo de 300 caracteres</span>
                            </span>
                            <textarea id="aboutForm" maxLength={300} onChange={e => setAbout(e.target.value)} />
                        </section>

                        <section className="input-box">
                            <label htmlFor="whatsappForm">Número de Whatsapp</label>
                            <input type="text" id="whatsappForm" onChange={e => setWhatsapp(e.target.value)} />
                        </section>

                        {/* <div>Fotos</div> */}

                        <h2 className="section-title">Visitação</h2>
                        
                        <section className="input-box">
                            <label htmlFor="instructionsForm">Instruções</label>
                            <textarea id="instructionsForm" onChange={e => setInstructions(e.target.value)} />
                        </section>
                        
                        <section className="input-box">
                            <label htmlFor="hoursForm">Horário das visitas</label>
                            <input type="text" id="hoursForm" onChange={e => setHours(e.target.value)} />
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