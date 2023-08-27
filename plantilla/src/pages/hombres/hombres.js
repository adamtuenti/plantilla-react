import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { funcionEjemplo, getNivelA, getNivelB, getDetalleFotoA } from '../../../api/api';
import { Button, Col, Row, Card } from 'react-bootstrap';
import "./hombres.css"
import Loading from "../../../share/images/loadingGris.gif"


export default function NivelB() {

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
            setNivelA(await getNivelA('M'))
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









            {nivel === 'A' &&



                <div>

                    {nivelA.length > 0 ?


                        <div>

                            <p className='seleccione'>Hombres</p>

                            <Row style={{ textAlign: 'center' }}>



                                {
                                    nivelA.map((data) => (

                                        <Col lg='3' md='3' xs = '12' style={{ marginTop: '14.5px' }}>


                                            <Card onClick={() => { irAlSiguienteNivel('B', data.Id, data) }} style={{ width: '92.5%', marginLeft: 'auto', marginRight: 'auto', height: '450px' }}>

                                                <Card.Img className='imagenA' variant='top' src={data.Imagen} />

                                                <Card.Body className = 'mx-0 px-0' style = {{ textAlign: 'left', padding: 'none' }}>
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



                                                <Col lg="6" s="12" style={{ textAlign: 'right', backgroundColor: '' }}>

                                                    <img src={detalleA.ImagenFrontal} style={{ width: '100%', marginRight: '74.5px' }} />

                                                </Col>

                                                <Col lg="6" s="12" style={{ textAlign: 'left', backgroundColor: '' }}>




                                                    <img src={detalleA.ImagenPosterior} style={{ width: '100%' }} />


                                                </Col>

                                            </Row>


                                        </div>



                                    </Row>



                                </Col>


                                <Col lg="5" style={{  }}>

                                    <p style={{ fontSize: '28.5px', fontWeight: 'bold' }}>{nombreCamiseta}</p>



                                    <p className='seleccione'>Seleccione el color de la camiseta</p>



                                    <Col>


                                        <Row style={{  }}>
                                            {
                                                nivelB.map((data) => (

                                                    <Col lg='4' md='3' style={{ marginTop: '24.5px' }}>



                                                        <Card onClick={() => { setBotonEstampado(true); setIdB(data.Id); setColorSeccionado(true); setTallasDisponibles(data.Tallas) }} style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', height: '254.5px', borderRadius: '7.5px' }}>

                                                            <Card.Img className='imagenA' variant='top' src={data.Imagen} style={{ backgroundColor: 'blue' }} />

                                                            <Card.Body style={{  }}>
                                                                <p style={{ textAlign: 'left', fontWeight: 'bold' }}>{data.Color}</p>



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



                                                    <p style = {{ marginTop: '24.5px' }}>Seleccione la talla</p>





                                                    <Row>

                                                        {tallasDisponibles.map((talla) => (


                                                            <Col lg = "2">


                                                                <div style={{ backgroundColor: 'transparent', height: '34.5px', borderColor: 'black', border: 'solid 0.5px', borderRadius: '7.5px' }}>
                                                                    <p style={{ borderColor: 'black', color: 'black', textAlign: 'center', marginTop: 'auto' }}>{talla}</p>

                                                                </div>


                                                            </Col>


                                                        ))}

                                                    </Row>



                                                </div>



                                            }



                                        </Row>




                                        {
                                        //botonEstampado &&



                                           // <div style={{ marginTop: '24.5px', textAlign: 'center' }}>
                                          //      <p>Deseas agregarle un estampado a tu camiseta?</p>

                                           //     <Button onClick={() => { irAlSiguienteNivel('B', idB) }}>Si</Button>
                                          //      <Button onClick={() => { irAlSiguienteNivel('B', idB) }}>No</Button>


                                          //  </div>

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