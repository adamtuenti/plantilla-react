import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getNivelB, getDetalleFotoA } from '../../../api/api';
import { Button, Col, Row, Card } from 'react-bootstrap';
import "./hombres.css"
import { useCart } from '../../../hooks/useContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import InfiniteCarousel from 'react-leaf-carousel';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';


const CardA = ({ data, onClick, isSelected }) => {
    const cardStyles = {
        border: isSelected ? '2px solid blue' : '1px solid #ccc',
        boxShadow: isSelected ? '0px 0px 8px rgba(0, 0, 255, 0.5)' : 'none',
        cursor: 'pointer',
        width: '95%', height: '174.5px', borderRadius: '7.5px',
        textAlign: 'center'
    };
    return (
        <div style={cardStyles} onClick={onClick}>
            <img style={{ height: '100%', borderRadius: '7.5px', width: '92.5%' }} src={data.Imagen} />
        </div>
    );
};



export default function NivelB() {
    const location = useLocation();
    const history = useNavigate();
    const { addToCart } = useCart();

    const [nivelB, setNivelB] = useState([]);
    const [detalleA, setDetalleA] = useState([]);
    const [dataNivelA, setDataNivelA] = useState('');
    const [colorSeleccionado, setColorSeccionado] = useState(false);
    const [tallasDisponibles, setTallasDisponibles] = useState([]);
    const [botonEstampado, setBotonEstampado] = useState(false);
    const [nombreCamiseta, setNombreCamiseta] = useState('');
    const [idB, setIdB] = useState('');
    const [dataListaB, setDataListaB] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const windWith = 750;
    const tamanoPantalla = window.innerWidth;

    useEffect(() => {
        if (location.state != null) {
            let dataA = location.state.data;
            setDataNivelA(dataA);
            const ejecutarPrimero = async () => {
                let datosB = await getNivelB(dataA.Id);
                setNivelB(datosB);
                let detalle = await getDetalleFotoA(dataA.Id, 'Negro');
                if (detalle != undefined) {
                    setNombreCamiseta(dataA.Titulo);
                    setDetalleA(detalle);
                    ponerListoB();
                } else {
                    history('/hombres/paso1');
                }
            };
            ejecutarPrimero();
        } else {
            history('/hombres/paso1');
        }
    }, []);

    const ponerListoB = () => {
        setTimeout(() => {
            setDataListaB(true);
        }, 250);
    }

    const abrirMedidas = () => {
        var swal_html = `
        <div style = "width: 100%; align-text: center" align = "center">
        <table id="table" class = "table table-striped table-bordered" border=1 bordered style = "width: 97.5%">
        <thead>
            <tr>
                <th align = "right">Talla</th>
                <th align = "center">Ancho</th>
                <th align = "center">Largo</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td align = "center">M</td>
                <td align = "center">75</td>
                <td align = "center">125</td>
            </tr>
            <tr>
                <td align = "center">L</td>
                <td align = "center">77</td>
                <td align = "center">127</td>
            </tr>
            <td align = "center">M</td>
                <td align = "center">75</td>
                <td align = "center">125</td>
            </tbody>
            </table>
            </div>`;
        Swal.fire({ title: "Guía de las tallas", html: swal_html, confirmButtonColor: 'red', confirmButtonText: 'Listo' });
    }

    const showOptions = (talla) => {
        Swal.fire({
            title: '¿Desea agregar al carrito?',
            text: nombreCamiseta,
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Agregado!', '', 'success')
                agregarAlCarrito(talla);
                addToCart();
            }
        })
    }

    const agregarAlCarrito = (talla) => {
        let dato = dataNivelA;
        dato.Talla = talla;
        dato.Color = detalleA.Color;
        dato.Imagen = detalleA.ImagenFrontal;

        if (localStorage.getItem("productos") === null) {
            let lista = JSON.stringify([dato]);
            localStorage.setItem("productos", lista);
        } else {
            var arreglo = localStorage.getItem("productos");
            arreglo = JSON.parse(arreglo);
            arreglo.push(dato);
            localStorage.setItem("productos", JSON.stringify(arreglo));
        }
    }

    const botonColor = async (data) => {
        let detalle = await getDetalleFotoA(data.NivelA, data.Color);
        if (detalle != undefined) {
            setDetalleA(detalle);
        } else {
            history('/hombres/paso1');
        }
        setBotonEstampado(true);
        setIdB(data.Id);
        setColorSeccionado(true);
        setTallasDisponibles(data.Tallas);
        window.scrollTo(0, document.body.scrollHeight + 25);
    }

    const handleCardClick = (data, index) => {
        botonColor(data);
        setSelectedCardIndex(index);
    };







    return (
        <div style={{ padding: "28.5px" }}>
            {tamanoPantalla > windWith ? (
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
                                                            <Col lg="2" key={index}>
                                                                <div style={{ backgroundColor: 'transparent', height: '34.5px', borderColor: 'black', border: 'solid 0.5px', borderRadius: '7.5px' }}>
                                                                    <p style={{ borderColor: 'black', color: 'black', textAlign: 'center', marginTop: 'auto' }}>{talla}</p>
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
            ) : (
                <div>
                    {dataListaB ? (
                        <div>
                            <Row>
                                <p style={{ fontSize: '25.5px', fontWeight: 'bold', textAlign: 'center' }}>{nombreCamiseta}</p>
                                <Col lg="7">
                                    <Row style={{ textAlign: 'center', marginBottom: '24.5px' }}>
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
                                                sidesOpacity={.5}
                                                sideSize={.1}
                                                slidesToScroll={1}
                                                slidesToShow={window.innerWidth <= windWith ? 1 : 3}
                                                scrollOnDevice={false}
                                            >
                                                <div style={{ width: '97.5%', textAlign: 'center' }}>
                                                    <img id='domicilio' className='miniIconos' style={{ width: '245px', height: '342px' }} src={detalleA.ImagenFrontal} />
                                                </div>
                                                <div style={{ width: '97.5%', textAlign: 'center' }}>
                                                    <img id='domicilio' className='miniIconos' style={{ width: '245px', height: '342px' }} src={detalleA.ImagenPosterior} />
                                                </div>
                                            </InfiniteCarousel>
                                        </div>
                                    </Row>
                                </Col>
                                <Col lg="5">

                                    <p className='seleccioneColorPeuqe' style = {{ textAlign: 'center' }}>${dataNivelA.Precio}</p>
                                    <p className='seleccioneColorPeque'>Seleccione el color de la camiseta</p>
                                    <Col>
                                            {nivelB.length > 0 ? (
                                                <div>
                                                    {nivelB.map((data, index) => (
                                                        <Col lg='4' md='6' xs = "12" key={index} style={{ marginBottom: '19.5px' }}>
                                                            <Card onClick={() => { botonColor(data); }} style={{ width: '85.5%', marginLeft: 'auto', marginRight: 'auto', height: '253.5px', borderRadius: '7.5px' }}>
                                                                <Card.Img style = {{ height: '97.5%', width: '100%' }} variant='top' src={data.Imagen} />
                                                            </Card>
                                                        </Col>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div>No hay</div>
                                            )}
                                        <Row>
                                            {colorSeleccionado && (
                                                <div>
                                                    <p style={{ marginTop: '24.5px' }}>Seleccione la talla aqui</p>
                                                    <Row>
                                                        {tallasDisponibles.map((talla) => (
                                                            <Col lg="2" xs = "3" key={talla}>
                                                                <div onClick={() => { showOptions(talla) }} style={{ backgroundColor: 'transparent', height: '34.5px', borderColor: 'black', border: 'solid 0.5px', borderRadius: '7.5px' }}>
                                                                    <p style={{ borderColor: 'black', color: 'black', textAlign: 'center', marginTop: 'auto' }}>{talla}</p>
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
                                            </Row>
                                        </div>
                                    </Row>
                                </Col>
                                <Col lg="5">
                                    <p className='seleccioneColorPeque'>Seleccione el color de la camiseta</p>
                                    <Col>
                                        <Row>
                                            {[{}, {}].map((data) => (
                                                <Col lg='4' md='3' style={{ marginTop: '24.5px' }}>
                                                    <Card style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', height: '254.5px', borderRadius: '7.5px' }}>
                                                        <Skeleton height={199} className='imagenA' variant='top' src={data.Imagen} />
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
                                                    <p style={{ marginTop: '24.5px' }}>Seleccione la talla</p>
                                                    <Row>
                                                        {tallasDisponibles.map((talla) => (
                                                            <Col lg="2" key={talla}>
                                                                <div style={{ backgroundColor: 'transparent', height: '34.5px', borderColor: 'black', border: 'solid 0.5px', borderRadius: '7.5px' }}>
                                                                    <p style={{ borderColor: 'black', color: 'black', textAlign: 'center', marginTop: 'auto' }}>{talla}</p>
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
            )}
        </div>
    );

}