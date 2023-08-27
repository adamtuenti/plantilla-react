import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { funcionEjemplo, getNivelA, getNivelB, getDetalleFotoA } from '../../api/api';
import { Button, Col, Row, Card } from 'react-bootstrap';
import "./seleccion.css"
import Loading from "../../share/images/loadingGris.gif"
import { ProgressBar, Step } from "react-step-progress-bar";

import pasoListoA from "../../share/images/bob.png";
import pasoActualA from "../../share/images/pikachu.jpg";
import pasoVacioA from "../../share/images/pikachu.jpg";


import pasoListoB from "../../share/images/pikachu.jpg";
import pasoActualB from "../../share/images/pikachu.jpg";
import pasoVacioB from "../../share/images/pikachu.jpg";

import pasoListoC from "../../share/images/pikachu.jpg";
import pasoActualC from "../../share/images/pikachu.jpg";
import pasoVacioC from "../../share/images/pikachu.jpg";


export default function Seleccion() {

    const [nivelA, setNivelA] = useState([])
    const [index, setIndex] = useState(1)

    const [nivelB, setNivelB] = useState([])
    const [detalleA, setDetalleA] = useState([])


    const [colorSeleccionado, setColorSeccionado] = useState(false)
    const [tallasDisponibles, setTallasDisponibles] = useState([])

    const [botonEstampado, setBotonEstampado] = useState(false)
    const [nombreCamiseta, setNombreCamiseta] = useState('')
    const [idB, setIdB] = useState('')
    const tallasCamisetas = ['xs', 's', 'm', 'l']




    let windWith = 750




    const [nivel, setNivel] = useState('A')



    useEffect(() => {
        console.log('Hola home')
        //funcionEjemplo()

        const ejecutarPrimero = async () => {
            setNivelA(await getNivelA())
            //


        }

        ejecutarPrimero()
    }, [])

    const irAlSiguienteNivel = async (nivelAplastar, id, data) => {

        setNivel(nivelAplastar)
        if (nivelAplastar == 'B') {
            let detalle = await getDetalleFotoA(id)
            setDetalleA(detalle)
            setIndex(35)
            setNombreCamiseta(data.Titulo)

            console.log('aqui: ', getNivelB(id))
            setNivelB(await getNivelB(id))
        }




    }

    return (
        <div style={{ padding: "28.5px" }}>

            <div>



            </div>



            {false && <Col md={12} sm={9} xs={9}>


                <div style={{ marginLeft: 'auto', marginTop: '21.5px', backgroundColor: 'green', marginRight: 'auto', marginBottom: '34.5px', textAlign: 'center', width: '25%' }}>

                    <ProgressBar
                        percent={index}
                        filledBackground="linear-gradient(to left, #d2d2d2, #d2d2d2)"
                        filledBackground="linear-gradient(to right, #e42320, #e42320)"
                        //strokeWidth={3.5}
                        //trailWidth={1}
                        height={4.5}
                        style={{ backgroundColor: 'yellow' }}
                    >
                        <Step transition="scale">
                            {({ accomplished }) => (

                                <div>
                                    <img
                                        //style = {{width: "75px"}}
                                        width={125}
                                        src={index > 2 ? pasoListoA : accomplished ? pasoActualA : pasoVacioA}//"https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/9d/Pichu.png/revision/latest?cb=20170407222851"
                                    />

                                </div>
                            )}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) => (

                                <div style={{}}>
                                    <img
                                        style={{ width: "75px" }}
                                        src={index > 34 ? pasoListoB : index === 33 ? pasoActualB : pasoVacioB}//"https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/97/Pikachu_%28Smiling%29.png/revision/latest?cb=20170410234508"
                                    />

                                </div>

                            )}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) => (

                                <div style={{}}>
                                    <img
                                        style={{ width: "75px" }}
                                        src={index > 66 ? pasoListoC : index === 66 ? pasoActualC : pasoVacioC}//"https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
                                    />

                                </div>
                            )}
                        </Step>
                    </ProgressBar>



                </div>



            </Col>

            }





            {nivel === 'A' &&



                <div>

                    {nivelA.length > 0 ?


                        <div>

                            <p className='seleccione'>Hombres</p>

                            <Row style={{ textAlign: 'center' }}>



                                {
                                    nivelA.map((data) => (

                                        <Col lg='3' md='3' xs = '12' style={{ marginTop: '14.5px', backgroundColor: 'red' }}>


                                            <Card onClick={() => { irAlSiguienteNivel('B', data.Id, data) }} style={{ width: '92.5%', marginLeft: 'auto', marginRight: 'auto', height: '450px' }}>

                                                <Card.Img className='imagenA' variant='top' src={data.Imagen} />

                                                <Card.Body className = 'mx-0 px-0' style = {{ textAlign: 'left', padding: 'none', backgroundColor: 'yellow' }}>
                                                    <p style = {{ fontWeight: 'bold', fontSize: '18.5px', lineHeight: '5px', marginLeft: '7.5px'}}>{data.Titulo}</p>
                                                    <p style = {{fontStyle: 'italic', marginLeft: '7.5px' }}>{data.Tela}</p>

                                                </Card.Body>

                                            </Card>



                                        </Col>

                                    )
                                    )
                                }






                            </Row>



                            <p className='seleccioneMujeres' >Mujeres</p>

                            <Row style={{ textAlign: 'center' }}>



                                {
                                    nivelA.map((data) => (

                                        <Col lg='3' md='3' xs = '12' style={{ marginTop: '14.5px', backgroundColor: 'red' }}>


                                            <Card onClick={() => { irAlSiguienteNivel('B', data.Id, data) }} style={{ width: '92.5%', marginLeft: 'auto', marginRight: 'auto', height: '450px' }}>

                                                <Card.Img className='imagenA' variant='top' src={data.Imagen} />

                                                <Card.Body className = 'mx-0 px-0' style = {{ textAlign: 'left', padding: 'none', backgroundColor: 'yellow' }}>
                                                    <p style = {{ fontWeight: 'bold', fontSize: '18.5px', lineHeight: '5px', marginLeft: '7.5px'}}>{data.Titulo}</p>
                                                    <p style = {{fontStyle: 'italic', marginLeft: '7.5px' }}>{data.Tela}</p>

                                                </Card.Body>

                                            </Card>



                                        </Col>

                                    )
                                    )
                                }






                            </Row>



                        </div>

                        :

                        <div align='center'>

                            <p className="loading">Cargando los modelos..</p>
                            <img src={Loading} className="loadingImage" />

                        </div>



                    }



                </div>







            }



            {nivel === 'B' &&



                <div>

                    {nivelB.length > 0 ?

                        <div>

                            <Row>

                                <Col lg="7">

                                    <Row style={{ textAlign: 'center', marginBottom: '24.5px' }}>






                                        <div align='center'>



                                            <Row>



                                                <Col lg="6" s="12" style={{ textAlign: 'right', backgroundColor: 'red' }}>

                                                    <img src={detalleA.ImagenFrontal} style={{ width: '100%', marginRight: '74.5px' }} />

                                                </Col>

                                                <Col lg="6" s="12" style={{ textAlign: 'left', backgroundColor: 'green' }}>




                                                    <img src={detalleA.ImagenPosterior} style={{ width: '100%' }} />


                                                </Col>

                                            </Row>


                                        </div>



                                    </Row>



                                </Col>


                                <Col lg="5" style={{ backgroundColor: 'red' }}>

                                    <p style={{ fontSize: '28.5px', fontWeight: 'bold' }}>{nombreCamiseta}</p>



                                    <p className='seleccione'>Seleccione el color de la camiseta</p>



                                    <Col>


                                        <Row style={{ backgroundColor: 'blue' }}>
                                            {
                                                nivelB.map((data) => (

                                                    <Col lg='4' md='3' style={{ marginTop: '24.5px' }}>



                                                        <Card onClick={() => { setBotonEstampado(true); setIdB(data.Id); setColorSeccionado(true); setTallasDisponibles(data.Tallas) }} style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', height: '225px', borderRadius: '7.5px' }}>

                                                            <Card.Img className='imagenA' variant='top' src={data.Imagen} style={{ backgroundColor: 'blue' }} />

                                                            <Card.Body style={{ backgroundColor: 'green' }}>
                                                                <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{data.Color}</p>



                                                            </Card.Body>

                                                        </Card>




                                                        {// <Button className='bottonB' onClick={() => { setBotonEstampado(true); setIdB(data.Id) }}><img src={data.Imagen} className='imagenB' /></Button>
                                                        }
                                                    </Col>


                                                )
                                                )
                                            }
                                        </Row>



                                        <Row>



                                            {colorSeleccionado &&

                                                <div>



                                                    <p>Seleccione la talla</p>





                                                    <Row>

                                                        {tallasDisponibles.map((talla) => (


                                                            <Col>


                                                                <Button style={{ backgroundColor: 'transparent', height: '34.5px', borderColor: 'black' }}>
                                                                    <p style={{ borderColor: 'black', color: 'black' }}>{talla}</p>

                                                                </Button>


                                                            </Col>


                                                        ))}

                                                    </Row>



                                                </div>



                                            }



                                        </Row>




                                        {botonEstampado &&



                                            <div style={{ marginTop: '24.5px', textAlign: 'center' }}>
                                                <p>Deseas agregarle un estampado a tu camiseta?</p>

                                                <Button onClick={() => { irAlSiguienteNivel('B', idB) }}>Si</Button>
                                                <Button onClick={() => { irAlSiguienteNivel('B', idB) }}>No</Button>


                                            </div>

                                        }

                                    </Col>



                                </Col>


                            </Row>



                        </div>

                        :

                        <div align='center'>

                            <p className="loading">Cargando los colores..</p>
                            <img src={Loading} className="loadingImage" />

                        </div>


                    }



                </div>







            }




        </div>
    )
}