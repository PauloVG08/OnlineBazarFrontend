import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ListGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar, FaSearch } from 'react-icons/fa';
import config from '../../config';

function Busqueda() {
    const location = useLocation();
    const navigate = useNavigate();
    const parametrosBusqueda = new URLSearchParams(location.search);
    const [searchTerm, setSearchTerm] = useState(parametrosBusqueda.get('search') || '');
    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`${config.backendUrl}/api/items?q=${searchTerm}`);
                if (!response.ok) {
                    throw new Error('Error en la búsqueda');
                }
                const data = await response.json();
                setResultados(data);
            } catch (error) {
                console.error('Error al buscar productos:', error);
            }
        };

        if (searchTerm) {
            fetchProductos();
        }
    }, [searchTerm]);

    const renderRating = (rating) => {
        const estrellasLlenas = Math.floor(rating);
        const mediaEstrella = rating % 1 !== 0;
        const estrellasVacias = 5 - estrellasLlenas - (mediaEstrella ? 1 : 0);

        return (
            <>
                {[...Array(estrellasLlenas)].map((_, i) => <FaStar key={`full-${i}`} />)}
                {mediaEstrella && <FaStarHalfAlt />}
                {[...Array(estrellasVacias)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
            </>
        );
    };

    const handleBusqueda = () => {
        if (searchTerm.trim()) {
            navigate(`/items?search=${searchTerm}`);
        }
    };

    const handleClickDetalle = (id) => {
        navigate(`/item/${id}`);
    };

    const handleVolver = () => {
        navigate('/');
    };

    return (
        <Container className="my-4">
            {/* Campo de búsqueda */}
            <Row className="mb-4">
                <Col xs={12} md={10} lg={8} className="mx-auto">
                    <InputGroup>
                        <InputGroup.Text><FaSearch /></InputGroup.Text>
                        <FormControl
                            placeholder="Buscar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleBusqueda()}
                        />
                        <Button variant="outline-dark" onClick={handleBusqueda}>Buscar</Button>
                        <Button variant="outline-secondary" onClick={handleVolver}>Volver</Button>
                    </InputGroup>
                </Col>
            </Row>

            <Row className="text-center mb-4">
                <Col>
                    <img src="https://img.icons8.com/ios-filled/100/000000/shopping-bag.png" alt="logo" className="mb-3" />
                    <h2>Resultados de la búsqueda de {searchTerm}: {resultados.length}</h2>
                </Col>
            </Row>
            <ListGroup variant="flush">
                {resultados.map(item => (
                    <ListGroup.Item key={item.id} className="py-3" onClick={() => handleClickDetalle(item.id)} style={{ cursor: 'pointer' }}>
                        <Row>
                            <Col xs={3} className="d-flex justify-content-center align-items-center">
                                <img src={item.thumbnail} alt={item.title} className="rounded-circle" style={{ width: '100px' }} />
                            </Col>
                            <Col xs={6}>
                                <h5>{item.title}</h5>
                                <p className="text-muted">{item.category}</p>
                                <p>{item.description}</p>
                            </Col>
                            <Col xs={3} className="text-end">
                                <h4>${item.price}</h4>
                                <div className="text-warning">{renderRating(item.rating)}</div>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default Busqueda;
