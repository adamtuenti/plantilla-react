import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNivelA } from '../../../api/api';
import { Col, Row, Card } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './hombres.css';

export default function NivelAF() {
    const [nivelA, setNivelA] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        const ejecutarPrimero = async () => {
            setNivelA(await getNivelA('F'));
        };
        ejecutarPrimero();
    }, []);

    const irAlSiguienteNivel = async (nivelAplastar, id, data) => {
        history('/mujeres/paso2', { state: { data: data } });
    };

    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div style={{ paddingLeft: '24.5px', paddingRight: '24.5px' }}>
            <div>
                <p className='seleccione'>Para ella</p>
                <Row style={{ textAlign: 'center' }}>
                    {nivelA.map((data, index) => (
                        <Col lg='3' md='3' xs='12' style={{ marginTop: '14.5px' }} key={data.Id}>
                            <Card
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => irAlSiguienteNivel('B', data.Id, data)}
                                style={{
                                    width: '97.5%',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    height: '450px',
                                    transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                                    transition: 'transform 0.3s ease-in-out'
                                }}
                            >
                                <Card.Img
                                    className='imagenA'
                                    variant='top'
                                    src={data.Imagen}
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
