import { useNavigate } from 'react-router-dom';

const AddRecipeChoice = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <h3>Come vuoi aggiungere la ricetta?</h3>
      <button className="btn btn-secondary m-2" onClick={() => navigate('/add/manuale')}>Scrivi la ricetta a mano</button>
      <button className="btn btn-secondary m-2" onClick={() => navigate('/add/url')}>Trascrizione automatica della ricetta</button>
    </div>
  );
};

export default AddRecipeChoice;