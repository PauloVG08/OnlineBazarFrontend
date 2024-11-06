import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleBusqueda = () => {
        if (searchTerm.trim()) {
            navigate(`/items?search=${searchTerm}`);
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
            <Row className="mb-4">
                <Col className="text-center">
                    <img src="https://img.icons8.com/ios-filled/100/000000/shopping-bag.png" alt="logo" className="mb-3" />
                    <h1 className="display-4">Bazar Online</h1>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12} md={10} lg={8}>
                    <InputGroup>
                        <InputGroup.Text><FaSearch /></InputGroup.Text>
                        <FormControl
                            placeholder="Buscar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleBusqueda()}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <Button variant="outline-dark" onClick={handleBusqueda}>Buscar</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
