import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import Busqueda from "./components/Busqueda";
import DetalleProd from "./components/DetalleProd";
import Sales from "./components/Sales";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/items" element={<Busqueda />} />
                <Route path="/item/:id" element={<DetalleProd />} />
                <Route path="/sales" element={<Sales />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
