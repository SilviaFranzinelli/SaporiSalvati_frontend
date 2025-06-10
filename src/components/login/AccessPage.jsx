import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function AccessPage() {
    // const navigate = useNavigate();

    // // useEffect(() => {
    // //     const token = localStorage.getItem("token");
    // //     if (token) {
    // //     navigate("/home");
    // //     }
    // // }, [navigate]);

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">

            <div className="text-center">
                <Container className="py-2 mx-auto my-3 rounded-pill text-center text-dark" >
                    <h1 className="fw-bold" style={{ fontSize: "3rem" }}>
                    Sapori Salvati
                    </h1>
                </Container>
                <Row>
                    <Col className="d-flex">
                    <Link
                        to="/login"
                        className="btn my-3 mx-auto rounded-pill py-2 px-5 fw-bold fs-3 text-decoration-none text-center text-dark"
                    >
                        Entra
                    </Link>
                    </Col>
                    <Col className="d-flex">
                    <Link
                        to="/register"
                        className="btn my-3 mx-auto rounded-pill py-2 px-5 fw-bold fs-3 text-decoration-none text-center text-dark"
                    >
                        Registrati
                    </Link>
                    </Col>
                </Row>
            </div>  
        </Container>
    );
}

export default AccessPage;
