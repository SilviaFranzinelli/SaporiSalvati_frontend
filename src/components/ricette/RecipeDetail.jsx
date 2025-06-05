import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../utility/Api';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState({});
  const navigate = useNavigate();


  useEffect(() => {

    const apiUrl = import.meta.env.VITE_API_URL;
  
    fetchWithAuth(`${apiUrl}/api/user/recipes/${id}`) 
      .then(res => {
        if (!res.ok) throw new Error('Recipe not found or error fetching');
        return res.json();
      })
      .then(data => {
        setRecipe(data);
        setEdited(data); 
      })
      .catch(error => {
          console.error("Error fetching recipe details:", error);
          setRecipe(null); 
      });
  }, [id]);

    
  const handleDelete = () => {
    if (window.confirm("Sei sicuro di voler eliminare definitivamente la ricetta?")) {
      const apiUrl = import.meta.env.VITE_API_URL; 

      fetchWithAuth(`${apiUrl}/api/user/recipes/${recipe.id}`, { method: 'DELETE' })
        .then(res => {
          if (!res.ok) throw new Error('Errore durante l\'eliminazione della ricetta');
          navigate('/home', { state: { deleted: true }});
        })
        .catch(error => {
          console.error("Errore eliminazione ricetta:", error);
          alert("Errore durante l'eliminazione della ricetta.");
        });
    }
  };

  const handleUpdate = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetchWithAuth(`${apiUrl}/api/user/recipes/${recipe.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(edited)
    })
      .then(res => {
        if (!res.ok) throw new Error('Errore durante l\'aggiornamento della ricetta');
        return res.json();
      })
      .then(updatedRecipe => {
        setRecipe(updatedRecipe);
        setEditing(false);
      })
      .catch(error => {
        console.error("Errore aggiornamento ricetta:", error);
        alert("Errore durante l'aggiornamento della ricetta.");
      });
  };

  if (!recipe) return <div>Caricamento...</div>;

  return (
    <div className="container mt-4">
      <Link to="/home" className="btn btn-secondary mb-3">← Torna indietro</Link>
      {editing ? (
        <>
          <input className="form-control mb-2" placeholder="Nome ricetta" value={edited.title} onChange={(e) => setEdited({ ...edited, title: e.target.value })} />
          <input className="form-control mb-2" placeholder="URL immagine" value={edited.imageUrl} onChange={(e) => setEdited({ ...edited, imageUrl: e.target.value })} />
          <textarea className="form-control mb-2" rows="4" placeholder="Ingredienti" value={edited.ingredients} onChange={(e) => setEdited({ ...edited, ingredients: e.target.value })} />
          <textarea className="form-control mb-2" rows="4" placeholder="Procedimento" value={edited.instructions} onChange={(e) => setEdited({ ...edited, instructions: e.target.value })} />
          <button className="btn btn-success me-2" onClick={handleUpdate}>Salva modifiche</button>
          <button className="btn btn-secondary" onClick={() => setEditing(false)}>Annulla</button>
        </>
      ) : (
        <>
          <h2>{recipe.title}</h2>
          {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} className="img-fluid mb-3" />}
          <h4>Ingredienti</h4>
          <pre>{recipe.ingredients}</pre>
          <h4>Istruzioni</h4>
          <pre>{recipe.instructions}</pre>
          <button className="btn btn-primary me-2" onClick={() => setEditing(true)}>Modifica</button>
          <button className="btn btn-danger" onClick={handleDelete}>Elimina</button>
        </>
      )}
    </div>
  );
};

export default RecipeDetail;