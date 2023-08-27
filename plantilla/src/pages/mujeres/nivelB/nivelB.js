import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { funcionEjemplo, getNivelA, getNivelB, getDetalleFotoA } from '../../../api/api';
import { Button, Col, Row, Card } from 'react-bootstrap';
import "./mujeres.css"
import Loading from "../../../share/images/loadingGris.gif"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function NivelBF() {

    const location = useLocation()
    const history = useNavigate()

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
    const [dataListaB, setDataListaB] = useState(false)




    let windWith = 750




    const [nivel, setNivel] = useState('A')



    useEffect(() => {
        console.log('Hola home')
        //funcionEjemplo()


        if (location.state != null) {

            let dataA = location.state.data
            console.log('data A: ', dataA)

            const ejecutarPrimero = async () => {
                let datosB = await getNivelB(dataA.Id)

                console.log('datos B: ', datosB)


                setNivelB(datosB)
                let detalle = await getDetalleFotoA(dataA.Id)



                console.log('detalle de aca: ', detalle)

                if (detalle != undefined) {

                    console.log('detalle de aca: ', detalle)
                    setNombreCamiseta(dataA.Titulo)
                    setDetalleA(detalle)
                    ponerListoB()

                } else {
                    history('/mujeres/paso1')
                }
                //


            }





            ejecutarPrimero()



        } else {
            history('/mujeres/paso1')
        }
    }, [])



    const ponerListoB = () => {
        setTimeout(() => {
            setDataListaB(true)
        }, 250)
    }

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
                {dataListaB ?
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

                            <Col lg="5" style={{}}>

                                <p style={{ fontSize: '28.5px', fontWeight: 'bold' }}>{nombreCamiseta}</p>

                                <p className='seleccione'>Seleccione el color de la camiseta</p>

                                <Col>

                                    <Row style={{}}>

                                        {nivelB.length > 0 ?

                                            <div>
                                                {
                                                    nivelB.map((data) => (

                                                        <Col lg='4' md='3' style={{ marginTop: '24.5px' }}>



                                                            <Card onClick={() => { setBotonEstampado(true); setIdB(data.Id); setColorSeccionado(true); setTallasDisponibles(data.Tallas) }} style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', height: '254.5px', borderRadius: '7.5px' }}>

                                                                <Card.Img className='imagenA' variant='top' src={data.Imagen} />

                                                                <Card.Body style={{}}>
                                                                    <p style={{ textAlign: 'left', fontWeight: 'bold' }}>{data.Color}</p>

                                                                </Card.Body>

                                                            </Card>


                                                            {// <Button className='bottonB' onClick={() => { setBotonEstampado(true); setIdB(data.Id) }}><img src={data.Imagen} className='imagenB' /></Button>
                                                            }
                                                        </Col>


                                                    )
                                                    )
                                                }



                                            </div>



                                            :



                                            <div>

                                                No hay

                                            </div>



                                        }
                                    </Row>



                                    <Row>



                                        {colorSeleccionado &&

                                            <div>



                                                <p style={{ marginTop: '24.5px' }}>Seleccione la talla</p>





                                                <Row>

                                                    {tallasDisponibles.map((talla) => (


                                                        <Col lg="2">


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

                    <div>

                        <Row>

                            <Col lg="7">

                                <Row style={{ textAlign: 'center', marginBottom: '24.5px' }}>






                                    <div align='center'>



                                        <Row>



                                            <Col lg="6" s="12" style={{ textAlign: 'right', backgroundColor: '' }}>

                                                <Skeleton height={475} style={{ width: '100%', marginRight: '74.5px' }} />

                                            </Col>

                                            <Col lg="6" s="12" style={{ textAlign: 'left', backgroundColor: '' }}>




                                                <Skeleton height={475} style={{ width: '100%' }} />


                                            </Col>

                                        </Row>


                                    </div>



                                </Row>



                            </Col>


                            <Col lg="5" style={{}}>

                                <p style={{ fontSize: '28.5px', fontWeight: 'bold' }}>{nombreCamiseta}</p>



                                <p className='seleccione'>Seleccione el color de la camiseta</p>



                                <Col>


                                    <Row style={{}}>
                                        {
                                            [{}, {}].map((data) => (

                                                <Col lg='4' md='3' style={{ marginTop: '24.5px' }}>



                                                    <Card style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', height: '254.5px', borderRadius: '7.5px' }}>

                                                        <Skeleton height={199} className='imagenA' variant='top' src={data.Imagen} />

                                                        <Card.Body style={{}}>
                                                            <Skeleton style={{ textAlign: 'left', fontWeight: 'bold' }} />



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



                                                <p style={{ marginTop: '24.5px' }}>Seleccione la talla</p>





                                                <Row>

                                                    {tallasDisponibles.map((talla) => (


                                                        <Col lg="2">


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



                }



            </div>












        </div>
    )
}