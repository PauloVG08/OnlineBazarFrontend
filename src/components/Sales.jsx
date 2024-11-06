import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Sales = () => {
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/sales/");
                if (!response.ok) {
                    throw new Error('Error al obtener las compras');
                }
                const data = await response.json();
                setSales(data);
            } catch (error) {
                console.error('Error al obtener las compras:', error);
            }
        };

        fetchSales();
    }, []);

    const handleSalir = () => {
        navigate('/');
    };

    return (
        <Container className="my-4">
            <Row className="text-center mb-4">
                <Col>
                    <h2>Compras Registradas</h2>
                </Col>
            </Row>
            <Row>
                {sales.length > 0 ? (
                    sales.map((sale) => (
                        <Col key={sale.id} md={4} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={sale.thumbnail} alt={sale.title} />
                                <Card.Body>
                                    <Card.Title>{sale.title}</Card.Title>
                                    <Card.Text>{sale.description}</Card.Text>
                                    <Card.Text>
                                        <strong>Precio:</strong> ${sale.price}
                                    </Card.Text>
                                    <Card.Text>
                                        <small className="text-muted">Fecha de compra: {new Date(sale.sale_date).toLocaleDateString()}</small>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col className="text-center">
                        <p>No hay compras registradas</p>
                    </Col>
                )}
            </Row>
            <Row className="text-center mt-4">
                <Col>
                    <Button variant="outline-dark" size="lg" onClick={handleSalir}>Salir</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Sales;
