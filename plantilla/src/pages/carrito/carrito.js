import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCarouselHome } from '../../api/api';
import { Button, Col, Row } from 'react-bootstrap';
import Portada from "../../share/images/portada.png"
import PortadaPequena from "../../share/images/eren.png"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import InfiniteCarousel from 'react-leaf-carousel';



import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { useCart } from '../../hooks/useContext';






import "./home.css"


export default function Carrito() {

    const history = useNavigate();

    const { removeFromCart } = useCart()

    //let carrito = JSON.parse(localStorage.getItem("productos"))

    const [datosCarrito, setDatosCarrito] = useState([])
    //let totalSinEnvio = 0
    const [totalSinEnvio, setTotalSinEnvio] = useState(0)
    const [cantidad, setCantidad] = useState(0)

    let tamanoMaximo = 750
    let tamanoPantalla = window.innerWidth




    const carrito = JSON.parse(localStorage.getItem("productos"))



    useEffect(() => {



        

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




    function procesarArreglo(arr) {
        const uniqueObjects = {}; // Objeto para almacenar objetos únicos y sus cantidades

        // Iterar sobre el arreglo de objetos
        arr.forEach(obj => {
            // Convertir el objeto en una cadena para usarla como clave
            const objKey = JSON.stringify(obj);

            // Si ya existe en el objeto uniqueObjects, incrementar la cantidad
            if (uniqueObjects[objKey]) {
                uniqueObjects[objKey].cantidad++;
            } else {
                // Si no existe, agregarlo al objeto con una cantidad de 1
                uniqueObjects[objKey] = { ...obj, cantidad: 1 };
            }
        });

        // Convertir el objeto de objetos únicos nuevamente a un arreglo
        const resultArray = Object.values(uniqueObjects);

        return resultArray;
    }




    const [data, setData] = useState(getDataFromLocalStorage());

    // Función para eliminar objetos específicos del arreglo
    const removeObject = (objectToDelete) => {
        delete objectToDelete.cantidad
        console.log('ejecuto: ', objectToDelete)
        
        const updatedData = data.filter(item => !isObjectEqual(item, objectToDelete));
        setData(updatedData);



        




        updateLocalStorage(updatedData);
    };

    // Función para comparar si dos objetos son iguales independientemente del orden de sus atributos
    const isObjectEqual = (obj1, obj2) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    };

    // Función para actualizar el localStorage
    const updateLocalStorage = (updatedData) => {
        localStorage.setItem('productos', JSON.stringify(updatedData));
        getAllProducts(updatedData)

        removeFromCart()

        
    };

    // Función para obtener datos del localStorage
    function getDataFromLocalStorage() {
        const storedData = localStorage.getItem('productos');
        return storedData ? JSON.parse(storedData) : [];
    }

    // Cargar la pantalla nuevamente después de actualizar los datos
    const reloadPage = () => {
        window.location.reload();
    };





    const getAllProducts = async (carrito) => {


        let total = 0
        let cantidadProductos = 0


        let nuevoArray = await procesarArreglo(carrito)
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
                    <Col lg="1">

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

                                    <p onClick={() => { removeObject(producto) }}>Borrar</p>

                                </Col>

                            </Row>
                        ))}


                    </Col>

                    <Col lg="5" style={{ backgroundColor: '', borderRadius: '12.5px' }}>



                        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Resumen de la compra</p>



                        <div className="table-responsive table-bordered table-striped">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Cantidad</th>
                                        <th>Nombre</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosCarrito.map(item => (
                                        <tr key={item.Id}>
                                            <td>{item.cantidad}</td>
                                            <td>{item.Titulo}</td>
                                            <td>${item.Precio * item.cantidad}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>





                        <p>Total de productos: {cantidad}</p>


                        <p>Total sin envío: ${totalSinEnvio}</p>


                    </Col>
                </Row>
            }





        </div>
    )
}