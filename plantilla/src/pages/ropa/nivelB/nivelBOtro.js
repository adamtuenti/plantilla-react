import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getNivelB, getDetalleFotoA } from '../../../api/api';
import { Button, Col, Row, Card } from 'react-bootstrap';
import { useCart } from '../../../hooks/useContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import InfiniteCarousel from 'react-leaf-carousel';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import PantallaGrande from './pantallaGrande'
import PantallaPequena from './pantallaPequena'


export default function NivelB() {
    const location = useLocation();
    const history = useNavigate();
    const { addToCart } = useCart();

    const [nivelB, setNivelB] = useState([]);
    const [detalleA, setDetalleA] = useState([]);
    const [dataNivelA, setDataNivelA] = useState('');
    const [colorSeleccionado, setColorSeleccionado] = useState(false);
    const [tallasDisponibles, setTallasDisponibles] = useState([]);
    const [botonEstampado, setBotonEstampado] = useState(false);
    const [nombreCamiseta, setNombreCamiseta] = useState('');
    const [idB, setIdB] = useState('');
    const [dataListaB, setDataListaB] = useState('');
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
        
            <tbody>
                <td align = "center">S</td>
                <td align = "center">${dataNivelA.TallaS.Ancho}</td>
                <td align = "center">${dataNivelA.TallaS.Largo}</td>
            
            <tr>
                <td align = "center">M</td>
                <td align = "center">${dataNivelA.TallaM.Ancho}</td>
                <td align = "center">${dataNivelA.TallaM.Largo}</td>
            </tr>
            <tr>
                <td align = "center">L</td>
                <td align = "center">${dataNivelA.TallaL.Ancho}</td>
                <td align = "center">${dataNivelA.TallaL.Largo}</td>
            </tr>
            </tbody>

            </thead>
           
            </table>
            </div>`;
        Swal.fire({ title: "Tamaño de las tallas (en cm)", text: 'Unidades en cm', html: swal_html, confirmButtonColor: 'red', confirmButtonText: 'Listo' });
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
        console.log(dato)

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
        setColorSeleccionado(true);
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
                <PantallaGrande
                    dataListaB={dataListaB}
                    abrirMedidas={abrirMedidas}
                    dataNivelA={dataNivelA}
                    nombreCamiseta={nombreCamiseta}
                    detalleA={detalleA}
                    nivelB={nivelB}
                    selectedCardIndex={selectedCardIndex}
                    setSelectedCardIndex={setSelectedCardIndex}
                    showOptions={showOptions}
                    botonColor={botonColor}
                    colorSeleccionado={colorSeleccionado}
                    tallasDisponibles={tallasDisponibles}
                    handleCardClick={handleCardClick} // Agrega esta línea
                />
            ) : (
                <PantallaPequena
                    dataListaB={dataListaB}
                    abrirMedidas={abrirMedidas}
                    dataNivelA={dataNivelA}
                    nombreCamiseta={nombreCamiseta}
                    detalleA={detalleA}
                    nivelB={nivelB}
                    selectedCardIndex={selectedCardIndex}
                    setSelectedCardIndex={setSelectedCardIndex}
                    showOptions={showOptions}
                    botonColor={botonColor}
                    colorSeleccionado={colorSeleccionado}
                    tallasDisponibles={tallasDisponibles}
                    handleCardClick={handleCardClick} // Agrega esta línea
                />
            )}
        </div>
    );
}






