import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newRecipe = {
    imageUrl,
    title,
    ingredients,
    instructions,
  };

  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    const response = await fetch(`${apiUrl}/api/user/recipes/addmyrecipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(newRecipe),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Errore salvataggio ricetta: ${response.status} - ${errorText}`);
    }

    navigate('/home'); // solo dopo salvataggio OK
  } catch (err) {
    console.error(err);
    alert("Errore nel salvataggio della ricetta");
  }
};

  return (
    <div className="container mt-4">
      <h3>Scrivi la ricetta a mano</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" placeholder="URL immagine" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <input className="form-control my-2" placeholder="Nome ricetta" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="form-control my-2" placeholder="Ingredienti" rows="3" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <textarea className="form-control my-2" placeholder="Procedimento" rows="4" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        <button type="submit" className="btn btn-success mt-2">Salva</button>
      </form>
    </div>
  );
};

export default AddRecipeForm;