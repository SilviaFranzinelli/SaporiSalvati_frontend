import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecipeCard from "../ricette/RecipeCard";

const MyHomePage = ({ recipes = [], onDelete, onFavorite, onUpdate }) => {
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/access");
    }
  }, [navigate]);

  const filteredRecipes = filter
    ? recipes.filter(recipe => recipe.category === filter)
    : recipes;

  const categories = [...new Set(recipes.map(recipe => recipe.category))];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Ricette</h2>
        <Link className="btn btn-primary" to="/add/scelta">Aggiungi Ricetta</Link>
      </div>
      <div className="mb-3">
        <select className="form-select" onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="">Tutte le categorie</option>
          {categories.map(category => <option key={category}>{category}</option>)}
        </select>
      </div>
      <div className="row">
        {filteredRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onDelete={onDelete}
            onFavorite={onFavorite}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default MyHomePage;