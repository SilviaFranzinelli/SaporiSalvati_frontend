import { Card } from 'react-bootstrap';
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
    <Card 
      style={{ width: '18rem', cursor: 'pointer', margin: '0.5rem' }} 
      onClick={handleClick}
    >
      {recipe.imageUrl && (
        <Card.Img 
          variant="top" 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          style={{ height: '200px', objectFit: 'cover' }} 
        />
      )}
      <Card.Body className="d-flex justify-content-between align-items-center">
        <Card.Title className="mb-0">{recipe.title}</Card.Title>
        {onFavorite && !readOnly ? (
        <Button 
          variant="link" 
          onClick={(e) => { e.stopPropagation(); handleFavorite(); }}
          style={{ color: recipe.favorite ? 'black' : 'red', fontSize: '1.5rem' }}
          aria-label={recipe.favorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
          title={recipe.favorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
          <i className={recipe.favorite ? "bi bi-heart" : "bi bi-heart-fill"}></i>
        </Button>
        ) : readOnly ? (
          <span style={{ color: recipe.favorite ? 'black' : 'red', fontSize: '1.5rem' }}>
            <i className={recipe.favorite ? "bi bi-heart" : "bi bi-heart-fill"}></i>
          </span>
        ) : null}
      </Card.Body>
    </Card>
  );
  
};

export default RecipeCard;