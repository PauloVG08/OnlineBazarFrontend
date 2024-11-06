import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function Busqueda() {
    const location = useLocation();
    const navigate = useNavigate();
    const parametrosBusqueda = new URLSearchParams(location.search);
    const searchTerm = parametrosBusqueda.get('search') || '';
    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/items?q=${searchTerm}`);
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

    const handleClickDetalle = (id) => {
        navigate(`/item/${id}`);
    };

    return (
        <Container className="my-4">
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
