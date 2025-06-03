import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe, onFavorite, readOnly }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ricetta/${recipe.id}`);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (onFavorite) onFavorite(recipe.id);
  };

  return (
    <div className="card m-2" style={{ width: '18rem', cursor: 'pointer' }} onClick={handleClick}>
      {recipe.imageUrl && (
        <img src={recipe.imageUrl} className="card-img-top" alt={recipe.title} style={{ height: '200px', objectFit: 'cover' }} />
      )}
      <div className="card-body d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{recipe.title}</h5>
        {onFavorite && !readOnly && (
            <button
                onClick={handleFavorite}
                className="btn btn-link"
                style={{ color: recipe.favorite ? 'black' : 'red', fontSize: '1.5rem' }}
                aria-label={recipe.favorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                title={recipe.favorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                >
                <i className={recipe.favorite ? "bi bi-heart" : "bi bi-heart-fill"}></i>
            </button>

        )}
        {readOnly && (
          <span style={{ color: recipe.favorite ? 'black' : 'red', fontSize: '1.5rem' }}>
            <i className={recipe.favorite ? "bi bi-heart" : "bi bi-heart-fill"}></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;