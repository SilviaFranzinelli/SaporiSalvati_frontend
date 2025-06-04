import { Button, Form } from "react-bootstrap";

function Login() {
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

      .then((data) => localStorage.setItem("token", data.token))

      .catch((error) => alert.error(error))
      
      .finally(() => (window.location.href = "/"));
  };
  return (
    <div className= "container d-flex flex-column align-items-center mt-5">
      <Form onSubmit={(event) => handlesubmit(event)} >
        <h1>Login</h1> 
        <Form.Label>username</Form.Label>
        <Form.Control type="text" />
        <Form.Label>password</Form.Label>
        <Form.Control type="password" />
        <Button type="submit">login</Button>
      </Form>
    </div>
  );
}

export default Login;