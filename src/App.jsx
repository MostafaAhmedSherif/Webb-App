import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import MainPage from './Pages/MainPage';
// import ViewRecipe from './Pages/ViewRecipe';
import Signup from './Pages/Signup';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
// import CreateRecipe from './Pages/CreateRecipe';
// import MyRecipes from './Pages/MyRecipes';
// import EditRecipe from './Pages/EditRecipe';
import NavbarComponent from './Components/Navbar';
import SearchWithMainDish from './Pages/SearchWithMainDish';
import SearchWithOptions from './Pages/SearchWithOptions';
import ViewRecipe from './Pages/ViewRecipe';
import UserRecipes from './Pages/UserRecipes';
import CreateRecipe from './Pages/CreateRecipe';
import EditRecipe from './Pages/EditRecipe';
function App() {
  return (
    <BrowserRouter>
    <NavbarComponent />
    <Routes>
      <>
  
    <Route path="/" element={<HomePage />} />
    <Route path="/viewRecipe/:id" element={<ViewRecipe />} />
    <Route path="/searchwithmaindish" element={<SearchWithMainDish />} />
    <Route path="/searchwithoptions" element={<SearchWithOptions />} />
    <Route path="/myrecipes" element={<UserRecipes />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/addRecipe" element={<CreateRecipe />} />
    <Route path="/edit/:id" element={<EditRecipe />} />
    {/* <Route path="/create" element={<CreateRecipe />} />
    <Route path="/myrecipes" element={<MyRecipes />} />
    <Route path="/edit/:id" element={<EditRecipe />} /> */}
    
  
    </>
    </Routes>
    </BrowserRouter>
    );
}

export default App;
