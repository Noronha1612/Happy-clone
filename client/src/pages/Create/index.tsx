import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Marker, useMapEvent } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import Map from '../../components/Map';
import HappyIcon from '../../components/Map/HappyIcon';

import HappyPoint from '../../assets/HappyPoint.png'

import './styles.css';

const MapInteraction: React.FC<{ setCoords: (coords: number[]) => void }> = ({ setCoords }) => {
    useMapEvent('click', handleMapClick);

    function handleMapClick(event: LeafletMouseEvent) {
        setCoords([ event.latlng.lat, event.latlng.lng ]);
    }

    return null;
}

const Create: React.FC = () => {
    const [ formFull, setFormFull ] = useState(true);

    // Fields
    const [ name, setName ] = useState('');
    const [ about, setAbout ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ instructions, setInstructions ] = useState('');
    const [ hours, setHours ] = useState('');
    const [ openOnWeekends, setOpenOnWeekends ] = useState(false);
    const [ coords, setCoords ] = useState<number[]>([]);

    const [ whatsappMask, setWhatsappMask ] = useState('');
    
    useEffect(() => {
        function validateInputs() {
            let allValid = true;
            
            if ( 
                name.length < 3 ||
                !about ||
                whatsapp.length !== 11 ||
                !instructions ||
                !hours ||
                coords.length !== 2
            ) allValid = false;
                
            return allValid;
        }  
        
        setFormFull(validateInputs());
    }, [
        name,
        about,
        whatsapp,
        instructions,
        hours,
        coords
    ]);

    function validateWhatsapp(number: string) {
        const onlyNumbers = number.split('')
            .filter(e => !isNaN(Number(e)) && !!e.trim())
            .join('');

        if ( onlyNumbers.length > 11 ) return;
        
        setWhatsapp(onlyNumbers);
    }

    useEffect(() => {
        const maskPhone = (number: string) => {
            if ( number.length <= 2) 
                return `(${number.slice(0, 2)}`;
            else if ( number.length <= 6 ) 
                return `(${number.slice(0, 2)}) ${number.slice(2)}`;
            else if ( number.length <= 10 ) 
                return `(${number.slice(0, 2)}) ${number.slice(2, 6)}-${number.slice(6)}`
            else
                return `(${number.slice(0, 2)}) ${number.slice(2, 7)}-${number.slice(7)}`
        }

        
        setWhatsappMask(whatsapp.length === 0 ? '' : maskPhone(whatsapp));
    }, [ whatsapp ])
        
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

                        <section className="map-box">
                            <Map 
                                className="map"
                            >
                                {coords.length === 2 && (
                                    <Marker position={[coords[0], coords[1]]} icon={ HappyIcon } />
                                )}
                                <MapInteraction setCoords={ setCoords } />
                            </Map>
                            <span>Clique no mapa para adicionar a localização</span>
                        </section>

                        <section className="input-box">
                            <label htmlFor="nameForm">Nome</label>
                            <input type="text" id="nameForm" value={name} onChange={e => setName(e.target.value)} />
                        </section>
                        
                        <section className="input-box">
                            <span>
                                <label htmlFor="aboutForm">Sobre</label>
                                <span className="aditional" >Máximo de 300 caracteres</span>
                            </span>
                            <textarea id="aboutForm" maxLength={300} value={about} onChange={e => setAbout(e.target.value)} />
                        </section>

                        <section className="input-box">
                            <label htmlFor="whatsappForm">Número de Whatsapp</label>
                            <input type="tel" id="whatsappForm" value={whatsappMask} onChange={e => validateWhatsapp(e.target.value)} />
                        </section>

                        {/* <div>Fotos</div> */}

                        <h2 className="section-title">Visitação</h2>
                        
                        <section className="input-box">
                            <label htmlFor="instructionsForm">Instruções</label>
                            <textarea id="instructionsForm" value={instructions} onChange={e => setInstructions(e.target.value)} />
                        </section>
                        
                        <section className="input-box">
                            <label htmlFor="hoursForm">Horário das visitas</label>
                            <input type="text" id="hoursForm" value={hours} onChange={e => setHours(e.target.value)} />
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