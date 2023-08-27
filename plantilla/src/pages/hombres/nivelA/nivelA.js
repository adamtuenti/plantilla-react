import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { funcionEjemplo, getNivelA, getNivelB, getDetalleFotoA } from '../../../api/api';
import { Button, Col, Row, Card } from 'react-bootstrap';
import "./hombres.css"
import Loading from "../../../share/images/loadingGris.gif"



import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'




export default function NivelA() {

    const [nivelA, setNivelA] = useState([])
    const [index, setIndex] = useState(1)

    const history = useNavigate();








    let windWith = 750




    const [nivel, setNivel] = useState('A')



    useEffect(() => {

        const ejecutarPrimero = async () => {
            setNivelA(await getNivelA('M'))
            //


        }

        ejecutarPrimero()
    }, [])

    const irAlSiguienteNivel = async (nivelAplastar, id, data) => {

        history('/hombres/paso2', { state: { data: data } })





    }

    return (
        <div style={{ padding: "28.5px" }}>
















            <div>

                {nivelA.length > 0 ?


                    <div>

                        <p className='seleccione'>Hombres</p>

                        <Row style={{ textAlign: 'center' }}>



                            {
                                nivelA.map((data) => (

                                    <Col lg='3' md='3' xs='12' style={{ marginTop: '14.5px' }}>


                                        <Card onClick={() => { irAlSiguienteNivel('B', data.Id, data) }} style={{ width: '92.5%', marginLeft: 'auto', marginRight: 'auto', height: '450px' }}>

                                            <Card.Img className='imagenA' variant='top' src={data.Imagen} />

                                            <Card.Body className='mx-0 px-0' style={{ textAlign: 'left', padding: 'none' }}>
                                                <p style={{ fontWeight: 'bold', fontSize: '18.5px', lineHeight: '5px', marginLeft: '7.5px' }}>{data.Titulo}</p>
                                                <p style={{ fontStyle: 'italic', marginLeft: '7.5px' }}>{data.Tela}</p>

                                            </Card.Body>

                                        </Card>



                                    </Col>

                                )
                                )
                            }






                        </Row>






                    </div>

                    :

                    




                    < div >

                            <p className='seleccione'>Hombres</p>

                            <Row style={{ textAlign: 'center' }}>



                                {
                                    [{}, {}, {}, {}].map((data) => (

                                        <Col lg='3' md='3' xs = '12' style={{ marginTop: '14.5px' }}>


                                            <Card style={{ width: '92.5%', marginLeft: 'auto', marginRight: 'auto', height: '450px' }}>

                                                <Skeleton className='imagenA' variant='top' height={353}/>

                                                <Card.Body className = 'mx-0 px-0' style = {{ textAlign: 'left', padding: 'none' }}>
                                                    <Skeleton width={225} height = {24}/>
                                                    <Skeleton width={175} height={19}/>

                                                </Card.Body>

                                            </Card>



                                        </Col>

                                    )
                                    )
                                }






                            </Row>



       


                        </div>



                    }



        </div>














        </div >
    )
}