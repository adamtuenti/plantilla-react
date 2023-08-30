import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useContext';
import { Col, Row, Card, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import logo from "../../share/images/logo.png"
import { BsFillArchiveFill } from "react-icons/bs";








import 'jspdf-autotable'; // Importa la librería



import html2pdf from 'html2pdf.js';




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

            doc.setFontSize(14.75);
            doc.setTextColor(0, 0, 128); // Color del título (azul oscuro)
            doc.text('Detalles del pedido', pageWidth / 2, 20, { align: 'center' });



            const tableData = [];
            for (let j = i; j < Math.min(i + 10, datosCarrito.length); j++) {
                const item = datosCarrito[j];
                tableData.push([`${item.cantidad}`, `${item.Titulo}`, `${item.Talla}`, `${item.Color}`, `$${item.Precio * item.cantidad}`]);
            }










            doc.autoTable({
                startY: 28.5,
                head: [['Cantidad', 'Producto', 'Talla', 'Color', 'Total']],
                body: tableData,
                styles: { cellPadding: 2.5, valign: 'middle', halign: 'center' }, // Estilos de celda centrada
            });




            const startY = doc.autoTable.previous.finalY || 40; // Obtiene la posición final de la tabla anterior


            //doc.addPage();
            doc.setFontSize(14.5);
            doc.setTextColor(0, 0, 128);
            doc.text('Información adicional', pageWidth / 2, startY + 12.5, { align: 'center' });

            const additionalTableData = [
                ['Total sin envío', `$${totalSinEnvio}`],
                ['Cantidad de productos', `${cantidad}`],
            ];

            const autoTable = {
                startY: startY + 19.75,
                //head: [['Descripción', 'Valor']],
                body: additionalTableData,
                tableWidth: 'auto',
                columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 30 } }, // Ancho de columnas manual
                didDrawCell: data => {
                    if (data.row.index === 0) { // Borde superior solo para la primera fila
                        doc.setDrawColor(0); // Color del borde (negro)
                        doc.setLineWidth(0.1); // Grosor del borde
                        doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y); // Dibuja el borde
                    }
                    if (data.row.index === data.table.body.length - 1) { // Borde inferior solo para la última fila
                        doc.setDrawColor(0); // Color del borde (negro)
                        doc.setLineWidth(0.1); // Grosor del borde
                        doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Dibuja el borde
                    }
                    if (data.column.index === 0) { // Borde izquierdo solo para la primera columna
                        doc.setDrawColor(0); // Color del borde (negro)
                        doc.setLineWidth(0.1); // Grosor del borde
                        doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height); // Dibuja el borde
                    }
                    if (data.column.index === data.table.columns.length - 1) { // Borde derecho solo para la última columna
                        doc.setDrawColor(0); // Color del borde (negro)
                        doc.setLineWidth(0.1); // Grosor del borde
                        doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Dibuja el borde
                    }
                },
            };



            doc.addImage(logo, 'PNG', 2, 2, 34.5, 18.5);



            doc.autoTable(autoTable)

            doc.rect(1, 1, pageWidth - 2, pageHeight - 2, 'S');






            //doc.setFontSize(12.45);


            //doc.text(`Total del pedido sin envío $${totalSinEnvio}`, 42.5, 45, { align: 'center' });









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

    const navegarProducto = (producto) => {
        console.log(producto)

        let sexo = producto.Sexo



        if (sexo == 'M') {
            history('/hombres/paso2', { state: { data: producto } })
        }
        //alert(sexo)

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

                    <Col lg='1'>

                    </Col>

                    <Col lg="5">

                        <Row>
                            {datosCarrito.map((producto) => (
                                <Col lg='6' style={{ marginBottom: '32.5px' }}>


                                    <Card style={{ width: '250px', padding: '0px', height: '325px' }}>

                                        <Card.Img onClick={() => navegarProducto(producto)} src={producto.Imagen} style={{ width: '100%', height: '78.5%' }} />

                                        <Card.Body className='mx-0 px-0' style={{ textAlign: 'left', padding: 'none', height: '14.75%' }}>
                                            <Row>


                                                <p style={{ fontWeight: 'bold', fontSize: '14.5px', lineHeight: '5px', marginLeft: '7.5px' }}>{producto.Titulo}</p>

                                                <Col lg='10'>
                                                    <p style={{ fontStyle: 'italic', marginLeft: '7.5px' }}>C. {producto.cantidad} {' '} <b> | </b> {' '} {producto.Talla} <b> | </b> {producto.Color}</p>
                                                </Col>

                                                <Col lg='2'>
                                                    <BsFillArchiveFill onClick={() => { removeObject(producto) }} color = "red"/>
                                                </Col>
                                            </Row>
                                        </Card.Body>




                                    </Card>
                                    {/*<Col>
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

                        */}
                                </Col>
                            ))}
                        </Row>
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



                        <Button onClick={() => generateAndDownloadPDF(carrito)}>Descargar PDF</Button>




                    </Col>
                </Row>
            }
        </div>
    );
}
