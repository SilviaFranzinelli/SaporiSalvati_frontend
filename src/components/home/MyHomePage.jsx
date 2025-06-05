import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecipeCard from "../ricette/RecipeCard";
import { fetchWithAuth } from '../../utility/Api';

const MyHomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWithAuth(`${apiUrl}/api/user/recipes/myrecipes`);
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Errore nel caricare le ricette: ${response.status} - ${errorData || response.statusText}`);
      }
      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      console.error("Errore fetchRecipes:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/access");
    } else {
      fetchRecipes()
    }
    
  }, [navigate, fetchRecipes]);



  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Ricette</h2>
        <Link className="btn btn-primary" to="/add/scelta">Aggiungi Ricetta</Link>
      </div>

      {loading && <p>Caricamento in corso...</p>}
      {error && <p className="text-danger">Errore: {error}</p>}

      <div className="row">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default MyHomePage;