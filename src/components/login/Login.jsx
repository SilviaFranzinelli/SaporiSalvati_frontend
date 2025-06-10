import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
const navigate = useNavigate();

  const handlesubmit = (event) => {
    event.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log("api url", apiUrl);
    fetch(apiUrl + "/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: event.target[0].value,
        password: event.target[1].value,
      }),
    })
      .then((response) => response.json())

      .then((data) => {
        localStorage.setItem("token", data.token)
        navigate("/home");
      })

      .catch((error) => alert.error(error))
      
    
  };
  return (
    <div className= "d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>Login</h1> 
        <Form onSubmit={(event) => handlesubmit(event)} >
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" required/>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
          <Button type="submit" className="btn mt-3">Login</Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;