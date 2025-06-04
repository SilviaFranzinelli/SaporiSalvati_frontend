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

    fetchWithAuth(`${apiUrl}/api/auth/me`, { method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
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
        <Link to="/">
          <img src="./assets/titolo.png" alt="Logo" height={50} />
        </Link>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">Preferiti</Link>
            {user && <Link to="/user" className="nav-link">Profilo</Link>}
          </Nav>
          {user && (
            <Link to="/user">
              <img
                src={user.avatar || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}
                alt="user"
                height={50}
                className="rounded-circle"
              />
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
