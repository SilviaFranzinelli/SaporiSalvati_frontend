import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import MyHomePage from "./components/home/MyHomePage";
import Login from "./components/login/Login";
import Registrazione from "./components/login/Registrazione";
import MyNavBar from "./components/navbar/MyNavbar";
import AddRecipeChoice from "./components/ricette/AddRecipeChoice";
import AddRecipeManual from "./components/ricette/AddRecipeManual";
import AddRecipeUrl from "./components/ricette/AddRecipeUrl"

import AccessPage from "./components/login/AccessPage";
import FavoritesPage from "./components/ricette/FavoritePage";

function App() {
  

  return (
    <>
      <BrowserRouter>
        
        <MyNavBar />

        <Routes>
          <Route path="*" element={<AccessPage />} />
          <Route path="/home" element={<MyHomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registrazione />} />
          <Route path="/add/manuale" element={<AddRecipeManual />} />
          <Route path="/add/url" element={<AddRecipeUrl />} />
          <Route path="/add/scelta" element={<AddRecipeChoice/>} />
          <Route path="/" element={<AccessPage />} />
          <Route path="/preferiti" element={<FavoritesPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;