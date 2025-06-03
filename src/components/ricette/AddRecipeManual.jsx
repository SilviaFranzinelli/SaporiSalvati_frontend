import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = ({ onAdd }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ imageUrl, title, ingredients, instructions, category });
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h3>Scrivi la ricetta a mano</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" placeholder="URL immagine" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <input className="form-control my-2" placeholder="Nome ricetta" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="form-control my-2" placeholder="Ingredienti" rows="3" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <textarea className="form-control my-2" placeholder="Procedimento" rows="4" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        <input className="form-control my-2" placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button type="submit" className="btn btn-success mt-2">Salva</button>
      </form>
    </div>
  );
};

export default AddRecipeForm;