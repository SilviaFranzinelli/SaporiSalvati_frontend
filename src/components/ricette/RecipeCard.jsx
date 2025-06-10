import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe, onFavorite }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ricetta/${recipe.id}`);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
     if (typeof onFavorite === 'function') {
      onFavorite(recipe.id);
    }
  };

  return (
    <Card 
      style={{ width: '18rem', cursor: 'pointer', margin: '0.5rem' }} 
      onClick={handleClick}
      className='card'
    >
      {recipe.imageUrl && (
        <Card.Img 
          variant="top" 
          src={recipe.imageUrl || "src/assets/placeholder.png"} 
          alt={recipe.title} 
          style={{ height: '200px', objectFit: 'cover' }} 
          className='cardimg mt-2'
        />
      )}
      <Card.Body className="d-flex justify-content-between align-items-center">
        <Card.Title className="mb-0">{recipe.title}</Card.Title>
        <div>
          {onFavorite && (
          <Button 
            variant="light" 
            aria-label={recipe.favorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
            title={recipe.favorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"} 
            onClick={handleFavorite}
            
            style={{ fontSize: '1.5rem', border: 'none', background: 'transparent', padding: 0 }}
          >
            {recipe.favorite ? '❤️' : '🤍'}
          </Button>
        )}
        </div>
        
      </Card.Body>
    </Card>
  );
  
};

export default RecipeCard;