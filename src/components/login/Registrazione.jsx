import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function Registrazione() {
  const navigate = useNavigate();

  function handlesubmit(event) {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;

    fetch(import.meta.env.VITE_API_URL + "/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((resp) => {
        if (resp.ok) {
          alert("Registrazione avvenuta con successo");
        } else {
          alert("Errore nella registrazione");
        }
      })

      .then((data) => {
        localStorage.setItem("token", data.token)
        navigate("/home")
      })

      .catch((error) => {
        console.error("Errore nella fetch della registrazione", error);
        alert("Errore durante la registrazione");
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" >
      <div className="text-center">
        <h1>Registrazione</h1>
        <Form onSubmit={handlesubmit}>
          <FormLabel>Username</FormLabel>
          <FormControl type="text" placeholder="Username" required />
          <FormLabel>Password</FormLabel>
          <FormControl type="password" placeholder="Password" required />
          <Button type="submit" className="btn mt-3">Registrati</Button>
        </Form>
      </div>
      
    </div>
  );
}

export default Registrazione;
