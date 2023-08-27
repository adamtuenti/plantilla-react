import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home"
import Login from "./pages/login/login"
import Seleccion from "./pages/personalizar_camiseta/seleccion";
import NivelA from "./pages/hombres/nivelA/nivelA";
import NivelB from "./pages/hombres/nivelB/nivelB";
import NivelAF from "./pages/mujeres/nivelA/nivelA";
import NivelBF from "./pages/mujeres/nivelB/nivelB"
import Mujeres from "./pages/mujeres/mujeres";


const RouterPage = () => {

    return (


            <Routes>
                <Route exact path = '/' element = {<Home/>} />
                <Route exact path = '/home' element = {<Home/>} />
                <Route exact path = '/personalizacion' element = {<Seleccion/>} />
                <Route exact path = '/hombres/paso1' element = {<NivelA/>} />
                <Route exact path = '/hombres/paso2' element = {<NivelB/>} />
                <Route exact path = '/mujeres/paso1' element = {<NivelAF/>} />
                <Route exact path = '/mujeres/paso2' element = {<NivelBF/>} />

            </Routes>


    )
}



export default RouterPage;