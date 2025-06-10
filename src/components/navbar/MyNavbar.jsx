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
    <Navbar expand="lg" className="custom-navbar px-3">
      <Container >
          <img src="src/assets/titolo.png" alt="Logo" className='h-100' style={{width: 300}} />
          <Nav className="d-flex flex-row">
            <Link to="/home" className="nav-link me-5">Home</Link>
            <Link to="/preferiti" className="nav-link">Preferiti</Link>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
