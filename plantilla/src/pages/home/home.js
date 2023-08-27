import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { funcionEjemplo, getNivelA, getNivelB } from '../../api/api';
import { Button, Col, Row } from 'react-bootstrap';
import Portada from "../../share/images/portada.png"
import PortadaPequena from "../../share/images/eren.png"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import portada from "../../share/images/portada.png"




import "./home.css"


export default function Home() {

    const history = useNavigate();

    const [nivelA, setNivelA] = useState([])
    const [index, setIndex] = useState(1)

    const [nivelB, setNivelB] = useState([])
    let windWith = 750
    let tamanoPantalla = window.innerWidth




    const [nivel, setNivel] = useState('A')



    useEffect(() => {
        console.log('Hola home')
        //funcionEjemplo()

        const ejecutarPrimero = async () => {
            //setNivelA(await getNivelA())
            //


        }

        ejecutarPrimero()
    }, [])

    const irAlSiguienteNivel = async (nivelAplastar, id) => {

        setNivel(nivelAplastar)
        if (nivelAplastar == 'B') {
            setIndex(35)

            console.log('aqui: ', getNivelB(id))
            setNivelB(await getNivelB(id))
        }




    }

    return (
        <div style={{ paddingBottom: "45px" }}>

            {windWith <= tamanoPantalla ?

                <div style={{
                    backgroundImage: `url(${Portada})`, position: 'relative',
                    backgroundSize: '100%', width: '100%', height: '425px', backgroundRepeat: 'no-repeat', display: 'flex', alignItems: 'center', paddingLeft: '24.5px'
                }}>



                    <p style={{ fontWeight: 'bold', fontSize: '42px', marginLeft: '42.5px', verticalAlign: 'middle', textAlign: 'left', color: 'black' }}>Hay un modelo para todos<br />Te animas a buscar el tuyo?</p>

                </div>



                :



                <div style={{
                    backgroundImage: `url(${PortadaPequena})`, position: 'relative',
                    backgroundSize: '100%', width: '100%', height: '850px', backgroundRepeat: 'no-repeat', display: 'flex', alignItems: 'center', paddingLeft: '24.5px'
                }}>


                    <p style={{ fontWeight: 'bold', fontSize: '34.5px', verticalAlign: 'middle', textAlign: 'left', color: 'black' }}>Selecciona el modelo que más te guste</p>

                </div>



        }











        </div>
    )
}