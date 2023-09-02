import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import NivelA from "./pages/ropa/nivelA/nivelA";
import NivelB from "./pages/ropa/nivelB/nivelB";
import NivelAF from "./pages/mujeres/nivelA/nivelA";
import NivelBF from "./pages/mujeres/nivelB/nivelB"
import Mujeres from "./pages/mujeres/mujeres";
import Carrito  from "./pages/carrito/carrito"
import NotFound from "./pages/notFound/notFound";
import ContactPage from "./pages/contacto/contacto";


const RouterPage = () => {

    return (


            <Routes>
                <Route exact path = '/' element = {<Home/>} />
                <Route exact path = '/home' element = {<Home/>} />
                <Route path="/:sexo/paso1" element={<NivelA />} />
                <Route path="/:sexo/paso2" element={<NivelB />} />
                {/*<Route exact path = '/hombres/paso1' element = {<NivelA/>} />
                <Route exact path = '/hombres/paso2' element = {<NivelB/>} />
                <Route exact path = '/mujeres/paso1' element = {<NivelAF/>} />
    <Route exact path = '/mujeres/paso2' element = {<NivelBF/>} />*/}
                <Route exact path = '/carrito' element = {<Carrito/>} />
                <Route exact path = '/contacto' element = {<ContactPage/>} />
                <Route exact path = '*' element = {<NotFound/>} />

            </Routes>


    )
}



export default RouterPage;