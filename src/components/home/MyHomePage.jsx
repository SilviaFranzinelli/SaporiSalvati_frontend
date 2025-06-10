import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecipeCard from "../ricette/RecipeCard";
import { fetchWithAuth } from '../../utility/Api';
import { Col, Row } from 'react-bootstrap';

const MyHomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [recipesResponse, favoritesResponse] = await Promise.all([
        fetchWithAuth(`${apiUrl}/api/user/recipes/myrecipes`), // Le tue ricette
        fetchWithAuth(`${apiUrl}/api/recipes/favorites`)      // I tuoi preferiti
      ]);
       if (!recipesResponse.ok || !favoritesResponse.ok) {
        throw new Error(`Errore nel caricare i dati`);
      }
      const recipesData = await recipesResponse.json();
      const favoritesData = await favoritesResponse.json();
      setRecipes(recipesData);
      setFavoriteIds(new Set(favoritesData.map(fav => fav.id)));

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

  const handleToggleFavorite = useCallback(async (recipeId) => {
    const isFavorite = favoriteIds.has(recipeId);
    const originalFavorites = new Set(favoriteIds);
    const updatedFavorites = new Set(originalFavorites);

    if (isFavorite) {
      updatedFavorites.delete(recipeId);
    } else {
      updatedFavorites.add(recipeId);
    }
    setFavoriteIds(updatedFavorites);

    try {
      const endpoint = isFavorite ? 'remove' : 'add';
      const method = isFavorite ? 'DELETE' : 'POST';
      
      const response = await fetchWithAuth(`${apiUrl}/api/recipes/favorites/${endpoint}?recipeId=${recipeId}`, { method });

      if (!response.ok) {
        setFavoriteIds(originalFavorites);
        console.error("Errore API, ripristino stato preferiti");
      }
    } catch (error) {
      console.error("Errore handleToggleFavorite:", error);
      setFavoriteIds(originalFavorites);
    }
  }, [favoriteIds, apiUrl]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Ricette</h2>
        <Link className="btn " to="/add/scelta">Aggiungi Ricetta</Link>
      </div>

      {loading && <p>Caricamento in corso...</p>}
      {error && <p className="text-danger">Errore: {error}</p>}

      <Row>
        {recipes.map(recipe => (
           <Col key={recipe.id} xs={12} md={6} lg={4} className="mb-4">
            <RecipeCard
              recipe={{
                ...recipe,
                favorite: favoriteIds.has(recipe.id)
              }}
              onFavorite={handleToggleFavorite}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyHomePage;