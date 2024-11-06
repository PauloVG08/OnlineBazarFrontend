import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import config from '../../config';

const DetalleProd = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`${config.backendUrl}/api/items/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener el producto');
                }
                const data = await response.json();
                setProducto(data);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };

        fetchProductos();
    }, [id]);

    const renderRating = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
                {halfStar && <FaStarHalfAlt />}
                {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
            </>
        );
    };

    const handleCompra = async () => {
        if (!producto) return;

        try {
            const response = await fetch(`${config.backendUrl}/api/addSale`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_id: producto.id,
                    title: producto.title,
                    description: producto.description,
                    price: producto.price,
                    thumbnail: producto.thumbnail,
                }),
            });

            const data = await response.json();
            if (data.success) {
                Swal.fire({
                    title: 'Compra exitosa',
                    text: 'Compra registrada con éxito',
                    icon: 'success',
                    confirmButtonText: 'Ver compras'
                }).then(() => {
                    navigate('/sales');
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al registrar la compra',
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                });
            }
        } catch (error) {
            console.error("Error al registrar la compra:", error);
            Swal.fire({
                title: 'Error',
                text: 'Error al registrar la compra',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        }
    };

    if (!producto) return <div>Cargando...</div>;

    return (
        <Container className="my-4">
            <Row className="text-center mb-4">
                <Col>
                    <img src="https://img.icons8.com/ios-filled/100/000000/shopping-bag.png" alt="logo" className="mb-3" />
                    <h2>{producto.title}</h2>
                    <p className="text-muted">{producto.category}</p>
                </Col>
            </Row>
            <Row className="text-center mb-4">
                {producto.images.map((imgUrl, index) => (
                    <Col key={index} xs={4}>
                        <img src={imgUrl} alt={`${producto.title} ${index + 1}`} className="img-fluid" />
                    </Col>
                ))}
            </Row>
            <Row>
                <Col>
                    <p>{producto.description}</p>
                    <h4>Precio: ${producto.price}</h4>
                    <h5>Marca: {producto.brand}</h5>
                    <h5>Stock: {producto.stock}</h5>
                    <div className="text-warning">{renderRating(producto.rating)}</div>
                </Col>
            </Row>
            <Row className="text-center mt-4">
                <Col>
                    <Button variant="outline-dark" size="lg" onClick={handleCompra}>Comprar</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default DetalleProd;
