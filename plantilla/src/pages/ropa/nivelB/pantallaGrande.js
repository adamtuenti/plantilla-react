import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getNivelB, getDetalleFotoA } from '../../../api/api';
import { Button, Col, Row, Card } from 'react-bootstrap';
import { useCart } from '../../../hooks/useContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import InfiniteCarousel from 'react-leaf-carousel';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import './nivelB.css'


export default function PantallaGrande({
    dataListaB,
    abrirMedidas,
    dataNivelA,
    nombreCamiseta,
    detalleA,
    nivelB,
    selectedCardIndex,
    setSelectedCardIndex,
    showOptions,
    botonColor,
    colorSeleccionado,
    tallasDisponibles,
    handleCardClick
}) {
    return (
        <div>
            {dataListaB ? (
                <div>
                    <Row>
                        <Col lg="7">
                            <Row style={{ textAlign: 'center', marginBottom: '24.5px' }}>
                                <div align='center'>
                                    <Row>
                                        <Col lg="6" s="12" style={{ textAlign: 'right' }}>
                                            <img src={detalleA.ImagenFrontal} style={{ width: '100%', marginRight: '74.5px' }} />
                                        </Col>
                                        <Col lg="6" s="12" style={{ textAlign: 'left' }}>
                                            <img src={detalleA.ImagenPosterior} style={{ width: '100%' }} />
                                        </Col>
                                    </Row>
                                </div>
                            </Row>
                        </Col>
                        <Col lg="5">
                            <p style={{ fontSize: '28.5px', fontWeight: 'bold' }}>{nombreCamiseta}</p>
                            <p>$ {dataNivelA.Precio}</p>
                            <p style={{ fontSize: '19.5px', fontWeight: 'bold', fontStyle: 'italic' }}>Seleccione el color de la camiseta</p>
                            <a onClick={() => { abrirMedidas() }} style={{ fontStyle: 'italic', textDecoration: 'underline' }}>Guía de las medidas</a>
                            <Col>
                                <Row>
                                    {nivelB.length > 0 ? (
                                        <Row>
                                            {nivelB.map((data, index) => (
                                                <Col lg='3' md='3' key={index} style={{ marginTop: '19.5px' }}>
                                                    <CardA
                                                        data={data}
                                                        isSelected={index === selectedCardIndex}
                                                        onClick={() => handleCardClick(data, index)}
                                                    />
                                                </Col>
                                            ))}
                                        </Row>
                                    ) : (
                                        <div>No hay diseños disponibles</div>
                                    )}
                                </Row>
                                <Row>
                                    {colorSeleccionado && (
                                        <div>
                                            <p style={{ fontSize: '19.5px', fontWeight: 'bold', fontStyle: 'italic', marginTop: '14.5px' }}>Seleccione la talla</p>
                                            <Row>
                                                {tallasDisponibles.map((talla, index) => (
                                                    <Col lg="1" key={index} className='mx-0 px-0' style={{ marginRight: '2.5px' }}>
                                                        <div onClick={() => { showOptions(talla) }} style={{ height: '34.5px', border: 'solid 0.5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <p style={{ borderColor: 'black', color: 'black', textAlign: 'center' }}>{talla}</p>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    )}
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                </div>
            ) : (
                <div>
                    <Row>
                        <Col lg="7">
                            <Row style={{ textAlign: 'center', marginBottom: '24.5px' }}>
                                <div align='center'>
                                    <Row>
                                        <Col lg="6" s="12" style={{ textAlign: 'right' }}>
                                            <Skeleton height={475} style={{ width: '100%', marginRight: '74.5px' }} />
                                        </Col>
                                        <Col lg="6" s="12" style={{ textAlign: 'right' }}>
                                            <Skeleton height={475} style={{ width: '100%', marginRight: '74.5px' }} />
                                        </Col>
                                    </Row>
                                </div>
                            </Row>
                        </Col>
                        <Col lg="5">
                            <p style={{ fontSize: '28.5px', fontWeight: 'bold' }}>{nombreCamiseta}</p>
                            <Skeleton height={18.75} width={75.5} variant='top' />
                            <p className='seleccione'>Seleccione el color de la camiseta</p>
                            <Col>
                                <Row>
                                    {[{}, {}].map((data, index) => (
                                        <Col lg='4' md='3' key={index} style={{ marginTop: '24.5px' }}>
                                            <Card style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', height: '254.5px', borderRadius: '7.5px' }}>
                                                <Skeleton height={199} variant='top' src={data.Imagen} />
                                                <Card.Body style={{}}>
                                                    <Skeleton style={{ textAlign: 'left', fontWeight: 'bold' }} />
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                                <Row>
                                    {colorSeleccionado && (
                                        <div>
                                            <p style={{ marginTop: '24.5px' }}>Seleccione la talla grande</p>
                                            <Row>
                                                {tallasDisponibles.map((talla, index) => (
                                                    <Col lg="2" key={index} className='mx-0 px-0'>
                                                        <div onClick={() => { showOptions(talla) }} style={{ height: '34.5px', border: 'solid 0.5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <p style={{ borderColor: 'black', color: 'black', textAlign: 'center' }}>{talla}</p>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    )}
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}






const CardA = ({ data, onClick, isSelected }) => {
    const cardStyles = {
        border: isSelected ? '2px solid red' : '1px solid #ccc',
        boxShadow: isSelected ? '0px 0px 8px rgba(0, 0, 255, 0.5)' : 'none',
        cursor: 'pointer',
    };

    return (
        <Card
            onClick={onClick}
            style={{ ...cardStyles, transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out' }}
        >
            <Card.Img variant='top' src={isSelected ? data.ImagenPosterior : data.Imagen} />
            <Card.Body style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 'bold', fontSize: '16.75px', lineHeight: '5px', marginLeft: '7.5px' }}>{data.Titulo}</p>
                <p style={{ fontStyle: 'italic', marginLeft: '7.5px' }}>{data.Tela}</p>
            </Card.Body>
        </Card>
    );
};