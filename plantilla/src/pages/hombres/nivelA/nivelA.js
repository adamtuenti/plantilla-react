import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNivelA } from '../../../api/api';
import { Col, Row, Card } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './hombres.css';
import Portada from '../../../share/images/gymPortada.jpg';
import PortadaPequena from '../../../share/images/gymPortadaPequena.jpg';

export default function NivelA() {
    const [nivelA, setNivelA] = useState([]);
    const history = useNavigate();
    const tamanoPantalla = window.innerWidth;
    const tamanoMaximo = 750;

    useEffect(() => {
        const ejecutarPrimero = async () => {
            setNivelA(await getNivelA('M'));
        };
        ejecutarPrimero();
    }, []);

    const irAlSiguienteNivel = async (nivelAplastar, id, data) => {
        history('/hombres/paso2', { state: { data: data } });
    };

    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div style={{ paddingBottom: '34.5px' }}>
            <div
  style={{
    backgroundImage: `url(${tamanoPantalla < tamanoMaximo ? PortadaPequena : Portada})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: `${tamanoPantalla < tamanoMaximo ? '457px' : '550px'}`,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '24.5px',
  }}
></div>

            <div style={{ paddingLeft: '24.5px', paddingRight: '24.5px' }}>
                <p className='seleccione'>Para él</p>

                {nivelA.length > 0 ? (
                    <div>
                        {tamanoPantalla > tamanoMaximo ? (
                            <Row style={{ textAlign: 'center' }}>
                                {nivelA.map((data, index) => (
                                    <Col lg='3' md='3' xs='12' style={{ marginTop: '14.5px' }} key={data.Id}>
                                        <Card
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            onClick={() => irAlSiguienteNivel('B', data.Id, data)}
                                            style={{
                                                width: '94.5%',
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                height: '450px',
                                                transform: `scale(${hoveredIndex === index ? 1.05 : 1})`,
                                                transition: 'transform 0.3s ease-in-out',
                                            }}
                                        >
                                            <Card.Img
                                                className='imagenA'
                                                variant='top'
                                                src={hoveredIndex === index ? data.ImagenPosterior : data.Imagen}
                                                style={{ transition: 'background-image 0.3s ease-in-out' }}
                                            />
                                            <Card.Body className='mx-0 px-0' style={{ textAlign: 'left', padding: 'none' }}>
                                                <p style={{ fontWeight: 'bold', fontSize: '18.5px', lineHeight: '5px', marginLeft: '7.5px' }}>
                                                    {data.Titulo}
                                                </p>
                                                <p style={{ fontStyle: 'italic', marginLeft: '7.5px' }}>{data.Tela}</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Row style={{ textAlign: 'center' }}>
                                {nivelA.map((data, index) => (
                                    <Col lg='3' md='3' xs='12' style={{ marginTop: '14.5px' }} key={data.Id}>
                                        <Card
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            onClick={() => irAlSiguienteNivel('B', data.Id, data)}
                                            style={{
                                                width: '99.5%',
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                height: '375px',
                                                transform: `scale(${hoveredIndex === index ? 1.05 : 1})`,
                                                transition: 'transform 0.3s ease-in-out',
                                            }}
                                        >
                                            <Card.Img
                                                className='imagenA'
                                                variant='top'
                                                src={hoveredIndex === index ? data.ImagenPosterior : data.Imagen}
                                                style={{ transition: 'background-image 0.3s ease-in-out', height: '97.5%' }}
                                            />
                                            <Card.Body className='mx-0 px-0' style={{ textAlign: 'left', padding: 'none' }}>
                                                <p style={{ fontWeight: 'bold', fontSize: '16.75px', lineHeight: '5px', marginLeft: '7.5px' }}>
                                                    {data.Titulo}
                                                </p>
                                                <p style={{ fontStyle: 'italic', marginLeft: '7.5px' }}>{data.Tela}</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </div>
                ) : (
                    <div>
                        <Row style={{ textAlign: 'center' }}>
                            {[{}, {}, {}, {}].map((data, index) => (
                                <Col lg='3' md='3' xs='12' style={{ marginTop: '14.5px' }} key={index}>
                                    <Card style={{ width: '92.5%', marginLeft: 'auto', marginRight: 'auto', height: '450px' }}>
                                        <Skeleton variant='top' height={353} />
                                        <Card.Body className='mx-0 px-0' style={{ textAlign: 'left', paddingLeft: '7.5px' }}>
                                            <Skeleton width={225} height={24} />
                                            <Skeleton width={175} height={19} />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
            </div>
        </div>
    );
}
