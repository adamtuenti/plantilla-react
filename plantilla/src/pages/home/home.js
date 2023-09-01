import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCarouselHome } from '../../api/api';
import { Col, Row } from 'react-bootstrap';
import InfiniteCarousel from 'react-leaf-carousel';
import Skeleton from 'react-loading-skeleton';
import "./home.css";

import Portada from "../../share/images/portada.png";
import PortadaPequena from "../../share/images/eren.png";

export default function Home() {
    const history = useNavigate();
    const [datosCarousel, setDatosCarousel] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);



    const [typedText, setTypedText] = useState('');
    const text = "Hay un modelo para todos\nTe animas a buscar el tuyo?";
    let index = 0;

    let tamanoMaximo = 750;
    let tamanoPantalla = window.innerWidth;



    const lines = typedText.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));



    useEffect(() => {
        const typingInterval = setInterval(() => {
            setTypedText(text.slice(0, index));
            index++;

            if (index > text.length) {
                clearInterval(typingInterval);
            }
        }, 14.5); // Cambia la velocidad aquí

        return () => {
            clearInterval(typingInterval);
        };
    }, []);





    useEffect(() => {
        const funcionInicial = async () => {
            const carousel = await getCarouselHome();
            setDatosCarousel(carousel);
        };
        funcionInicial();
    }, []);

    return (
        <div style={{ paddingBottom: "45px" }}>
            {tamanoMaximo <= tamanoPantalla ?
                <div>
                    <div style={{
                        backgroundImage: `url(${Portada})`, backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover', width: '100%', height: '515px', display: 'flex', alignItems: 'center', paddingLeft: '24.5px'
                    }}>
                        <p style={{ fontWeight: 'none', fontSize: '34.5px', marginLeft: '42.5px', verticalAlign: 'middle', textAlign: 'left', color: 'black' }}>
                            {lines}
                        </p>
                    </div>
                    <div></div>
                    {datosCarousel.length > 0 ?
                        <div style={{ marginTop: '12.5px', marginBottom: '59.7px' }} id='divCarrousel'>
                            <p style={{ fontSize: '37.5px', fontWeight: 'bold', textAlign: 'center', marginTop: '24.5px', marginBottom: '24.5px' }}>Destacados</p>
                            <InfiniteCarousel
                                pauseOnHover={false}
                                autoCycle={true}
                                cycleInterval={3500}
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
                                slidesToShow={window.innerWidth <= tamanoMaximo ? 1 : 3}
                                scrollOnDevice={false}
                            >
                                {datosCarousel.map((dato, index) => (
                                    <div
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            transform: `scale(${hoveredIndex === index ? 1.05 : 1})`,
                                            transition: 'transform 0.3s ease-in-out'
                                        }}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        key={dato.Id}
                                    >
                                        <img
                                            id='domicilio'
                                            className='miniIconos'
                                            style={{
                                                width: '435px',
                                                height: '554px',
                                                maxWidth: '100%'
                                            }}
                                            src={dato.Imagen}
                                            alt={dato.Titulo}
                                            onClick={() => { history('/hombres/paso2', { state: { data: { Titulo: dato.Titulo, Id: dato.Id } } }) }}
                                        />
                                        <p style={{ fontSize: '17.75px', marginTop: '14.5px' }}>{dato.Titulo}</p>
                                    </div>
                                ))}
                            </InfiniteCarousel>
                        </div>
                        :
                        <div>
                            <Row>
                                <Col lg='4' className='colSkeletonCarousel'>
                                    <Skeleton height={475} style={{ width: '75.5%', marginRight: '74.5px' }} />
                                </Col>
                                <Col lg='4' className='colSkeletonCarousel'>
                                    <Skeleton height={475} style={{ width: '75.5%', marginRight: '74.5px' }} />
                                </Col>
                                <Col lg='4' className='colSkeletonCarousel'>
                                    <Skeleton height={475} style={{ width: '75.5%', marginRight: '74.5px' }} />
                                </Col>
                            </Row>
                        </div>
                    }
                </div>
                :
                <div>
                    <div style={{
                        backgroundImage: `url(${PortadaPequena})`, position: 'relative',
                        backgroundSize: '100%', width: '100%', height: '484.5px', backgroundRepeat: 'no-repeat', display: 'flex', alignItems: 'start', paddingLeft: '24.5px'
                    }}>
                        <p style={{ fontWeight: 'bold', fontSize: '29.5px', textAlign: 'center', color: 'white' }}>Selecciona el modelo que más te guste</p>
                    </div>
                    {datosCarousel.length > 0 ?
                        <div style={{ marginTop: '12.5px', marginBottom: '59.7px' }} id='divCarrousel'>
                            <InfiniteCarousel
                                pauseOnHover={false}
                                autoCycle={true}
                                cycleInterval={3500}
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
                                slidesToShow={window.innerWidth <= tamanoMaximo ? 1 : 3}
                                scrollOnDevice={false}
                            >
                                {datosCarousel.map((dato, index) => (
                                    <div
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            transform: `scale(${hoveredIndex === index ? 1.05 : 1})`,
                                            transition: 'transform 0.3s ease-in-out'
                                        }}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        key={dato.Id}
                                    >
                                        <img
                                            id='domicilio'
                                            className='miniIconos'
                                            style={{
                                                width: '249px',
                                                height: '342px',
                                                maxWidth: '100%'
                                            }}
                                            src={dato.Imagen}
                                        //alt={dato.Titulo}
                                        />
                                    </div>
                                ))}
                            </InfiniteCarousel>
                        </div>
                        :
                        <div align='center'>
                            <Skeleton height={342} style={{ width: '75.5%' }} />
                        </div>
                    }
                </div>
            }
        </div>
    )
}
