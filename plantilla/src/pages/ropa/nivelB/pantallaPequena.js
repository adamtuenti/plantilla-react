import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import InfiniteCarousel from 'react-leaf-carousel';

export default function PantallaPequena({
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
}) {
    return (
        <div>
            {dataListaB ? (
                <div>
                    <div align='center'>
                        <InfiniteCarousel
                            pauseOnHover={false}
                            autoCycle={true}
                            cycleInterval={4500}
                            breakpoints={[
                                {
                                    breakpoint: 1,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                    },
                                },
                            ]}
                            sidesOpacity={0.5}
                            sideSize={0.1}
                            slidesToScroll={1}
                            slidesToShow={1}
                            scrollOnDevice={false}
                        >
                            <div style={{ width: '92.5%', textAlign: 'center' }}>
                                <img id='domicilio' className='miniIconos' style={{ width: '100%', height: '342px' }} src={detalleA.ImagenFrontal} alt="Imagen Frontal" />
                            </div>
                            <div style={{ width: '92.5%', textAlign: 'center' }}>
                                <img id='domicilio' className='miniIconos' style={{ width: '100%', height: '342px' }} src={detalleA.ImagenPosterior} alt="Imagen Posterior" />
                            </div>
                        </InfiniteCarousel>
                    </div>
                    <Row style={{ textAlign: 'center', marginTop: '24.5px' }}>
                        {nivelB.map((data, index) => (
                            <Col lg='3' md='3' xs='6' style={{ marginTop: '28.5px' }} key={data.Id}>
                                <Card
                                    onClick={() => botonColor(data)}
                                    style={{
                                        width: '89.5%',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        height: '175px',
                                    }}
                                >
                                    <Card.Img
                                        variant='top'
                                        src={selectedCardIndex === index ? data.ImagenPosterior : data.Imagen}
                                        alt="Imagen de la Camiseta"
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            ) : (
                <div>
                    <div style={{
                        //backgroundImage: `url(${dataNivelA.genero === 'hombres' ? hombreCell : mujerPc})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        width: '100%',
                        height: '475px',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '24.5px',
                    }}></div>
                    <Row style={{ textAlign: 'center' }}>
                        {[{}, {}, {}, {}].map((data, index) => (
                            <Col lg='3' md='3' xs='12' style={{ marginTop: '14.5px' }} key={index}>
                                <Card style={{
                                    width: '99.5%',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    height: '375px',
                                    borderRadius: '7.5px',
                                }}>
                                    <Skeleton height={292} variant='top' className='imagenA' />
                                    <Card.Body className='mx-0 px-0' style={{ textAlign: 'left', padding: 'none' }}>
                                        <Skeleton height={22} style={{ textAlign: 'left', fontWeight: 'bold' }} />
                                        <Skeleton height={16} style={{ fontStyle: 'italic' }} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
        </div>
    );
}
