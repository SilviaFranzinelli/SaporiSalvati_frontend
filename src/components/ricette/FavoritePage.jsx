
import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { fetchWithAuth } from '../../utility/Api'; 
import RecipeCard from '../../components/ricette/RecipeCard'; 

function FavoritesPage() {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchFavoriteRecipes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchWithAuth(`${apiUrl}/api/recipes/favorites`);
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Errore nel caricare i preferiti: ${response.status} - ${errorData || response.statusText}`);
            }
            const data = await response.json();
            setFavoriteRecipes(data);
        } catch (err) {
            console.error("Errore fetchFavoriteRecipes:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    useEffect(() => {
        fetchFavoriteRecipes();
    }, [fetchFavoriteRecipes]);

    const handleRemoveFromFavorites = async (recipeId) => {
        try {
            const response = await fetchWithAuth(`${apiUrl}/api/recipes/favorites/remove?recipeId=${recipeId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Errore nella rimozione dai preferiti: ${response.status} - ${errorData}`);
            }
            
            setFavoriteRecipes(prevFavorites => prevFavorites.filter(recipe => recipe.id !== recipeId));
           
        } catch (err) {
            console.error("Errore handleRemoveFromFavorites:", err);
            setError(err.message || "Impossibile rimuovere la ricetta dai preferiti.");
        }
    };



    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Caricamento...</span>
                </Spinner>
                <p>Caricamento ricette preferite...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <Alert.Heading>Oops! Qualcosa è andato storto.</Alert.Heading>
                    <p>{error}</p>
                    <Button onClick={fetchFavoriteRecipes} variant="outline-danger">Riprova</Button>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Le Mie Ricette Preferite</h1>
            {favoriteRecipes.length === 0 ? (
                <Alert variant="info">
                    Non hai ancora aggiunto nessuna ricetta ai tuoi preferiti. Inizia ad esplorare e clicca sul cuore!
                </Alert>
            ) : (
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {favoriteRecipes.map(recipe => (
                        <Col key={recipe.id}>
                            <RecipeCard
                                recipe={{ ...recipe, favorite: true }} 
                                onFavorite={() => handleRemoveFromFavorites(recipe.id)} 
                                readOnly={false} 
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default FavoritesPage;