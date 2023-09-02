import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useContext';
import { Col, Row, Card, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import logo from "../../share/images/logoZeusNegro.png";
import { BsFillArchiveFill } from "react-icons/bs";
import 'jspdf-autotable';
import html2pdf from 'html2pdf.js';



import carritoVacio from "../../share/images/carritoComprasVacio.png"

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



    const SharePDFButton = async ({ }) => {

        let pdf = await generateAndDownloadPDF()




        //sharePDF()

    }







    const generateAndDownloadPDF = async () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        for (let i = 0; i < datosCarrito.length; i += 10) {
            if (i > 0) {
                doc.addPage();
            }

            doc.setFontSize(14.75);
            doc.setTextColor(0, 0, 128);
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
                styles: { cellPadding: 2.5, valign: 'middle', halign: 'center' },
            });

            const startY = doc.autoTable.previous.finalY || 40;

            doc.setFontSize(14.5);
            doc.setTextColor(0, 0, 128);
            doc.text('Información adicional', pageWidth / 2, startY + 12.5, { align: 'center' });

            const additionalTableData = [
                ['Total sin envío', `$${totalSinEnvio}`],
                ['Cantidad de productos', `${cantidad}`],
            ];

            const autoTable = {
                startY: startY + 19.75,
                body: additionalTableData,
                tableWidth: 'auto',
                columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 30 } },
                didDrawCell: data => {
                    // Resto del código para dibujar los bordes de la tabla
                },
            };

            doc.addImage(logo, 'PNG', 2, 2, 34.5, 18.5);
            doc.autoTable(autoTable);
            doc.rect(1, 1, pageWidth - 2, pageHeight - 2, 'S');

            if (i + 10 < datosCarrito.length) {
                doc.setFontSize(10);
                doc.setTextColor(128, 128, 128);
                doc.text(`Página ${Math.ceil((i + 1) / 10)} de ${Math.ceil(datosCarrito.length / 10)}`, pageWidth - 10, pageHeight - 10, { align: 'right' });
            }
        }

        let pdf = doc.output('blob');



        const sharePDF = async () => {
            try {
                await navigator.share({
                    title: 'Compartir PDF',
                    text: '¡Echa un vistazo a este PDF!',
                    files: [new File([pdf], 'archivo.pdf', { type: 'application/pdf' })],
                });



                doc.save('detallesPedido.pdf');




            } catch (error) {
                doc.save('detallesPedido.pdf');
            }
        };



        sharePDF()






    };

    const removeObject = (objectToDelete) => {

        const { cantidad, ...objectWithoutCantidad } = objectToDelete;
        let datosProcesar = JSON.parse(localStorage.getItem('productos'))
        console.log('procesar: ', datosProcesar)

        let datosCarritoTemp = datosProcesar.map(({ cantidad, ...rest }) => ({ ...rest }));




        console.log('object: ', objectToDelete)
        delete objectToDelete.cantidad;
        console.log(objectToDelete)
        console.log('carrito antes: ', datosCarritoTemp)
        datosCarritoTemp = datosCarritoTemp.map(({ cantidad, ...rest }) => ({ ...rest }));
        console.log('carrito quitar: ', datosCarritoTemp)
        const updatedData = datosCarritoTemp.filter(item => !isObjectEqual(item, objectToDelete));
        console.log('al final: ', updatedData)
        setDatosCarrito(updatedData);
        updateLocalStorage(updatedData);
        //getAllProducts(updatedData)
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
        let sexo = producto.Sexo;

        if (sexo === 'M') {
            history('/hombres/paso2', { state: { data: producto } });
        }
    }

    const procesarArreglo = async (arr) => {
        const arrSinCantidad = arr.map(({ cantidad, ...rest }) => ({ ...rest }));
        const uniqueObjects = {};
        arrSinCantidad.forEach(objeto => {
            const stringificado = JSON.stringify(objeto, Object.keys(objeto).sort());
            if (!uniqueObjects[stringificado]) {
                uniqueObjects[stringificado] = { ...objeto, cantidad: 1 };
            } else {
                uniqueObjects[stringificado].cantidad++;
            }
        });
        return Object.values(uniqueObjects);
    };

    return (
        <div style={{ padding: "45px" }}>
            {(carrito === null || datosCarrito.length == 0) ?
                <div style = {{ padding: '25px', textAlign: 'center' }}>
                    <p style = {{ fontSize: '24.5px' }}>Aún no hay productos en tu carrito</p>
                    <img src = {carritoVacio}  style = {{ width: '157.5px', marginTop: '24.5px' }} className = 'img-fluid'/>
                </div>
                :
                <Row>
                    <Col lg='1'></Col>
                    <Col lg="5" xs = "12">
                        <Row>
                            {datosCarrito.map((producto) => (
                                <Col lg='6'  xs = "12" style={{ marginBottom: '32.5px' }}>
                                    <Card style={{ width: '250px', padding: '0px', height: '325px' }}>
                                        <Card.Img onClick={() => navegarProducto(producto)} src={producto.Imagen} style={{ width: '100%', height: '78.5%' }} />
                                        <Card.Body className='mx-0 px-0' style={{ textAlign: 'left', padding: 'none', height: '14.75%' }}>
                                            <Row>
                                                <p style={{ fontWeight: 'bold', fontSize: '14.5px', lineHeight: '5px', marginLeft: '7.5px' }}>{producto.Titulo}</p>
                                                <Col lg='10' xs = "10">
                                                    <p style={{ fontStyle: 'italic', marginLeft: '7.5px' }}>C. {producto.cantidad} {' '} <b> | </b> {' '} {producto.Talla} <b> | </b> {producto.Color}</p>
                                                </Col>
                                                <Col lg='2' xs = "2">
                                                    <BsFillArchiveFill onClick={() => { removeObject(producto) }} color="red" />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col lg="5" xs = "12" style={{ backgroundColor: '', borderRadius: '12.5px' }}>
                        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Resumen de la compra</p>
                        <div className="table-responsive table-bordered table-striped">
                            <table className="table table-striped table-responsive">
                                <thead>
                                    <tr>
                                        <th>Cant.</th>
                                        <th>Nombre</th>
                                        <th>Talla</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosCarrito.map(item => (
                                        <tr key={item.Id}>
                                            <td>{item.cantidad}</td>
                                            <td>{item.Titulo}</td>
                                            <td>{item.Talla}</td>
                                            <td>${item.Precio * item.cantidad}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p>Cantidad de productos: {cantidad}</p>
                        <p>Total sin envío: ${totalSinEnvio}</p>
                        <Button onClick={() => generateAndDownloadPDF(carrito)}>Descargar PDF</Button>
                    </Col>
                </Row>
            }
        </div>
    );
}
