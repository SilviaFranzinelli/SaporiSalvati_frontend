import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { fetchWithAuth } from '../../utility/Api';

function MyNavbar() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const apiUrl = import.meta.env.VITE_API_URL;

    fetchWithAuth(`${apiUrl}/api/auth/me`, {})
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Errore nella fetch dell'utente:", error));
  }, []);

  if (['/', '*', '/login', '/register'].includes(location.pathname)) {
  return null;
}
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary px-3">
      <Container>
          <img src="src/assets/titolo.png" alt="Logo" height={50} />
          <Nav className="me-auto">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/preferiti" className="nav-link">Preferiti</Link>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
