import { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import { fetchWithAuth } from '../../utility/Api';
import placeholderImage from "../../assets/placeholder.png"

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState({});



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


  const handleUpdate = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetchWithAuth(`${apiUrl}/api/user/recipes/${id}`, {
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
          <div className='detail p-5'>
            <h2>{recipe.title}</h2>
            {recipe.imageUrl && <img src={recipe.imageUrl || placeholderImage} alt={recipe.title} className="detailimg img-fluid mb-3" />}
            <h4>Ingredienti</h4>
            <ul>
              {recipe.ingredients && recipe.ingredients.split('\n').map((ingredient, index) => (
              ingredient.trim() !== '' && <li key={index}>{ingredient.trim()}</li>
              ))}
            </ul>
            
            <h4>Istruzioni</h4>
            <p>{recipe.instructions}</p>
            <button className="btn btn-primary me-2" onClick={() => setEditing(true)}>Modifica</button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetail;