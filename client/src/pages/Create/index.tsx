import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import HappyPoint from '../../assets/HappyPoint.png'

import './styles.css';

const Create: React.FC = () => {
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

            <fieldset>
                <form onSubmit={ handleSubmit }>
                    <h2 className="section-title" >
                        Dados
                    </h2>

                    {/* <div>Mapa</div> */}

                    <section className="input-box">
                        <label htmlFor="nameForm">Nome</label>
                        <input type="text" id="nameForm" />
                    </section>
                </form>
            </fieldset>
        </div>
    );
}

export default Create;