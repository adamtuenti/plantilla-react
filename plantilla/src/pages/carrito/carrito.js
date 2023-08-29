import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCarouselHome } from '../../api/api';
import { Button, Col, Row } from 'react-bootstrap';
import Portada from "../../share/images/portada.png"
import PortadaPequena from "../../share/images/eren.png"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import portada from "../../share/images/portada.png"

import InfiniteCarousel from 'react-leaf-carousel';



import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'






import "./home.css"


export default function Carrito() {

    const history = useNavigate();

    let carrito = JSON.parse(localStorage.getItem("productos"))

    const [datosCarrito, setDatosCarrito] = useState([])
    //let totalSinEnvio = 0
    const [totalSinEnvio, setTotalSinEnvio] = useState(0)
    const [cantidad, setCantidad] = useState(0)

    let tamanoMaximo = 750
    let tamanoPantalla = window.innerWidth




    const [nivel, setNivel] = useState('A')

    const [datosCarousel, setDatosCarousel] = useState([])



    useEffect(() => {



        let carrito = JSON.parse(localStorage.getItem("productos"))

        if (carrito != null) {

            getAllProducts(carrito)








        }







    }, [])






    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }





    function getAllIndexes(arr, val) {
        var indexes = [], i = -1;
        while ((i = arr.indexOf(val, i + 1)) != -1) {
            indexes.push(i);
        }
        return indexes;
    }




    function obtenerObjetosUnicosConCantidad(arreglo) {
        const objetosVistos = {};
        const objetosUnicos = [];

        for (const objeto of arreglo) {
            const stringificado = JSON.stringify(objeto);

            if (!objetosVistos[stringificado]) {
                objetosVistos[stringificado] = { ...objeto, cantidad: 1 };
                objetosUnicos.push(objetosVistos[stringificado]);
            } else {
                objetosVistos[stringificado].cantidad++;
            }
        }

        return objetosUnicos;
    }








    const getCountProducts = async (carrito) => {

        return (obtenerObjetosUnicosConCantidad(carrito))

        let uniqueObjArray = [...new Map(carrito.map((item) => [item["id"], item])).values()];
        console.log('ojala: ', uniqueObjArray)




        var arr = carrito.filter(onlyUnique)
        let nuevo = {}

        console.log('carrito: ', carrito)

        let ind = 0

        carrito.forEach(prod => {
            console.log('leer: ', prod)
            //prod = JSON.stringify(prod)
            nuevo[prod] = (nuevo[prod] || 0) + 1

            //ind  = ind + 1
        });

        console.log('Nuevito: ', nuevo)

        console.log('arr: ', arr)

        let final = []

        arr.map((dato) => (

            console.log('indices: ', getAllIndexes(carrito, dato)),

            final.push(dato)
        ))

        let indices = []




        console.log('aqui nuevo: ', nuevo)

        return nuevo



    }



    const getAllProducts = async (carrito) => {


        let total = 0
        let cantidadProductos = 0








        let nuevoArray = await obtenerObjetosUnicosConCantidad(carrito)

        setDatosCarrito(nuevoArray)

        console.log('salida: ', nuevoArray)



        nuevoArray.map((dato) => {
            total = total + dato.Precio * dato.cantidad
            cantidadProductos = cantidadProductos + dato.cantidad
        })

        setTotalSinEnvio(total)
        setCantidad(cantidadProductos)









    }









    return (
        <div style={{ padding: "45px" }}>

            {carrito === null ?
                <div>

                    vacio

                </div>

                :


                <Row>
                    <Col lg="2">

                    </Col>
                    <Col lg="5">

                        {datosCarrito.map((producto) => (
                            <Row style={{ marginBottom: '32.5px' }}>
                                <Col>

                                    <img src={producto.Imagen} style={{ width: '275px' }} />

                                </Col>

                                <Col>

                                    <p style={{ fontWeight: 'bold' }}>{producto.Titulo}</p>
                                    <p>Talla: {producto.Talla}</p>
                                    <p>Precio: ${producto.Precio}</p>
                                    <p>Color: {producto.Color}</p>
                                    <p>Cantidad: {producto.cantidad}</p>

                                </Col>

                            </Row>
                        ))}


                    </Col>

                    <Col lg="3" style={{ backgroundColor: '#DCD4D4', borderRadius: '12.5px', height: '325px' }}>

                        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Resumen de la compra</p>


                        <p>Cantidad de productos: {cantidad}</p>

                        {datosCarrito.map((dato) => (
                            <div>

                                <p>{"(" + dato.cantidad + ")"} {dato.Titulo} - {dato.Talla} ${dato.Precio* dato.cantidad}</p>
                            </div>
                        ))}

                        <p>Total sin envío: ${totalSinEnvio}</p>


                    </Col>
                </Row>
            }





        </div>
    )
}