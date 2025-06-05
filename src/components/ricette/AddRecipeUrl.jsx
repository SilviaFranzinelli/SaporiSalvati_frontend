import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../utility/Api';

const AddRecipeFromURL = () => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleFetch = async () => {
        const allowedDomains = [
        'https://ricette.giallozafferano.it',
        'https://www.cucchiaio.it',
        'https://www.fattoincasadabenedetta.it'
    ];
    
    if (!allowedDomains.some(domain => url.startsWith(domain))) {
      setError('Errore: link non valido. Sono supportati solo Giallo Zafferano, Cucchiaio d\'Argento e Fatto in casa da Benedetta.');
      return;
    }

    try {
      const response = await fetchWithAuth(`${apiUrl}/api/parse?url=${encodeURIComponent(url)}`, { 
        method: 'POST', 
        headers: {'Content-Type' : 'application/json'},});
      if (!response.ok) throw new Error();
      navigate('/home');
    } catch {
      setError('Errore nella trascrizione: link non valido o sito non accessibile.');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Trascrizione automatica della ricetta</h3>
      <input className="form-control my-2" placeholder="Inserisci il link della ricetta" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button className="btn btn-primary" onClick={handleFetch}>Trascrivi</button>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default AddRecipeFromURL;