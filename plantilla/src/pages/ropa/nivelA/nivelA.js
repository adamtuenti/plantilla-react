import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNivelA } from '../../../api/api';
import { Col, Row, Card } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './nivelA.css';

import hombrePc from '../../../share/images/hombres/gymPortada.jpg'
import hombreCell from '../../../share/images/hombres/gymPortadaPequena.jpg'



import mujerPc from '../../../share/images/mujeres/gymMujeres.jpg'



import mujerCell from '../../../share/images/mujeres/gymMujeresPequeno.jpg'


// Componente para Pantalla Grande
function PantallaGrande({ genero }) {
    const [nivelA, setNivelA] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setNivelA(await getNivelA(genero == 'hombres' ? 'M' : 'F'));
        };
        fetchData();
    }, [genero]);

    const goToNextLevel = (nivelAplastar, id, data) => {
        history(`/${genero.toLowerCase()}/paso2`, { state: { data: data } });
    };


    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div>



            <div
                style={{
                    backgroundImage: `url(${genero == 'hombres' ? hombrePc : mujerPc})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    width: '100%',
                    height: '550px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '24.5px',
                }}
            ></div>






<div style = {{ paddingLeft: '24.5px', paddingRight: '24.5px', paddingBottom: '45.5px' }}>




            <p className='seleccione'>Para {genero === 'hombres' ? 'él' : 'ella'}</p>
            <Row style={{ textAlign: 'center' }}>
                {nivelA.map((data, index) => (
                    <Col lg='3' md='3' xs='12' style={{ marginTop: '14.5px' }} key={data.Id}>
                        <Card
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => goToNextLevel('B', data.Id, data)}
                            style={{
                                width: '97.5%',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                height: '450px',
                                //transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                                transition: 'transform 0.3s ease-in-out'
                            }}
                        >
                            <Card.Img
                                className='imagenA'
                                variant='top'
                                src={hoveredIndex === index ? data.ImagenPosterior : data.Imagen}
                            />
                            <Card.Body className='mx-0 px-0' style={{ textAlign: 'left', padding: 'none' }}>
                                <p style={{ fontWeight: 'bold', fontSize: '18.5px', lineHeight: '5px', marginLeft: '7.5px' }}>{data.Titulo}</p>
                                <p style={{ fontStyle: 'italic', marginLeft: '7.5px' }}>{data.Tela}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            
            
            </div>
        </div>
    );
}






function PantallaPequena({ genero }) {

    const [nivelA, setNivelA] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setNivelA(await getNivelA(genero == 'hombres' ? 'M' : 'F'));
        };
        fetchData();
    }, [genero]);

    const goToNextLevel = (nivelAplastar, id, data) => {
        history(`/${genero.toLowerCase()}/paso2`, { state: { data: data } });
    };


    const [hoveredIndex, setHoveredIndex] = useState(null);




    return (
        <div>
            <div
                style={{
                    backgroundImage: `url(${genero == 'hombres' ? hombreCell : mujerCell })`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    width: '100%',
                    height: '475px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '24.5px',
                }}
            ></div>








            <p style = {{ textAlign: 'center', marginTop: '24.75px', fontWeight: 'bold', fontSize: '19.75px', lineHeight: '14.5px' }}>Para {genero === 'hombres' ? 'él' : 'ella'}</p>




            <Row style={{ textAlign: 'center', marginTop: '7.5px' }}>
                {nivelA.map((data, index) => (
                    <Col lg='3' md='3' xs='12' style={{ marginTop: '19.75px' }} key={data.Id}>
                        <Card
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => goToNextLevel('B', data.Id, data)}
                            style={{
                                width: '68.75%',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                height: '327.5px',
                                transform: `scale(${hoveredIndex === index ? 1.05 : 1})`,
                                transition: 'transform 0.3s ease-in-out',
                            }}
                        >
                            <Card.Img
                                variant='top'
                                src={hoveredIndex === index ? data.ImagenPosterior : data.Imagen}
                                style={{ transition: 'background-image 0.3s ease-in-out', height: '97.5%' }}
                            />
                            <Card.Body className='mx-0 px-0' style={{ textAlign: 'left', padding: 'none' }}>
                                <p style={{ fontWeight: 'bold', fontSize: '16.75px', lineHeight: '5px', marginLeft: '7.5px' }}>
                                    {data.Titulo}
                                </p>
                                <p style={{ fontStyle: 'italic', marginLeft: '7.5px', fontSize: '14.95px' }}>{data.Tela}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        
        </div>
    );
}





export default function NivelA({ genero }) {
    // Determina si la pantalla es pequeña (puedes ajustar esta lógica según tus necesidades)
    const isPantallaPequena = window.innerWidth < 768;

    const { sexo } = useParams();

    return (
        <div style={{ paddingBottom: '34.5px' }}>
            {isPantallaPequena ? (
                <PantallaPequena genero={sexo} />
            ) : (
                <PantallaGrande genero={sexo} />
            )}
        </div>
    );
}
