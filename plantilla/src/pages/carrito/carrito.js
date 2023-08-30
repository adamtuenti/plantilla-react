import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useContext';
import { Col, Row } from 'react-bootstrap';
import jsPDF from 'jspdf';
import logo from "../../share/images/pikachu.jpg"








import 'jspdf-autotable'; // Importa la librería



import html2pdf from 'html2pdf.js';


const Card = ({ name, value }) => {
    return (
        <div className="card">
            <h2>{name}</h2>
            <p>{value}</p>
        </div>
    );
};


export default function Carrito() {
    const history = useNavigate();
    const { removeFromCart } = useCart();
    const [datosCarrito, setDatosCarrito] = useState([]);
    const [totalSinEnvio, setTotalSinEnvio] = useState(0);
    const [cantidad, setCantidad] = useState(0);

    const carrito = JSON.parse(localStorage.getItem("productos"));

    useEffect(() => {
        if (carrito != null) {
            getAllProducts(carrito);
        }
    }, []);



    const generateAndDownloadPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Agrega una página por cada 10 elementos en datosCarrito
        for (let i = 0; i < datosCarrito.length; i += 10) {
            if (i > 0) {
                doc.addPage();
            }

            doc.setFontSize(18);
            doc.setTextColor(0, 0, 128); // Color del título (azul oscuro)
            doc.text('Resumen de la compra', pageWidth / 2, 20, { align: 'center' });



            const tableData = [];
            for (let j = i; j < Math.min(i + 10, datosCarrito.length); j++) {
                const item = datosCarrito[j];
                tableData.push([`${item.cantidad}`, `${item.Titulo}`, `${item.Talla}`, `${item.Color}`, `${item.Precio * item.cantidad}`]);
            }







            doc.autoTable({
                startY: 40,
                head: [['Cantidad', 'Producto', 'Talla', 'Color', 'Total']],
                body: tableData,
            });









            // Agrega contenido al PDF
            for (let j = i; j < Math.min(i + 10, datosCarrito.length); j++) {
                const item = datosCarrito[j];
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0); // Color del texto (negro)
                //doc.text(`${item.cantidad} - ${item.Titulo} - Talla: ${item.Talla} - Total: $${item.Precio * item.cantidad}`, 10, 40 + (j - i) * 10);
            }

            // Si hay más páginas, agrega el número de página actual
            if (i + 10 < datosCarrito.length) {
                doc.setFontSize(10);
                doc.setTextColor(128, 128, 128); // Color del número de página (gris)
                doc.text(`Página ${Math.ceil((i + 1) / 10)} de ${Math.ceil(datosCarrito.length / 10)}`, pageWidth - 10, pageHeight - 10, { align: 'right' });
            }
        }

        // Descargar el PDF
        doc.save('carrito.pdf');

    };





    const removeObject = (objectToDelete) => {
        delete objectToDelete.cantidad;
        const updatedData = datosCarrito.filter(item => !isObjectEqual(item, objectToDelete));
        setDatosCarrito(updatedData);
        updateLocalStorage(updatedData);
    };

    const isObjectEqual = (obj1, obj2) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    };

    const updateLocalStorage = (updatedData) => {
        localStorage.setItem('productos', JSON.stringify(updatedData));
        getAllProducts(updatedData);
        removeFromCart();
    };


    const getAllProducts = async (carrito) => {
        let total = 0;
        let cantidadProductos = 0;
        let nuevoArray = await procesarArreglo(carrito);
        setDatosCarrito(nuevoArray);

        nuevoArray.map((dato) => {
            total = total + dato.Precio * dato.cantidad;
            cantidadProductos = cantidadProductos + dato.cantidad;
        });

        setTotalSinEnvio(total);
        setCantidad(cantidadProductos);
    }

    const procesarArreglo = async (arr) => {
        const uniqueObjects = {};
        arr.forEach(objeto => {
            const stringificado = JSON.stringify(objeto);
            if (!uniqueObjects[stringificado]) {
                uniqueObjects[stringificado] = { ...objeto, cantidad: 1 };
            } else {
                uniqueObjects[stringificado].cantidad++;
            }
        });
        return Object.values(uniqueObjects);
    }

    return (
        <div style={{ padding: "45px" }}>
            {carrito === null ?
                <div>
                    vacio
                </div>
                :
                <Row>
                    <Col lg="1"></Col>
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



                        <button onClick={() => generateAndDownloadPDF(carrito)}>Descargar PDF</button>




                    </Col>
                </Row>
            }
        </div>
    );
}
