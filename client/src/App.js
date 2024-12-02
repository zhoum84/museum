import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import { SearchPage } from "./pages/SearchPage";
import { CuratorPage } from "./pages/CuratorPage";
import { ArtistPage } from "./pages/ArtistPage";
import { ExhibitPage } from "./pages/ExhibitPage";
function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/curators' element={<CuratorPage/>}/>
          <Route path='/artists' element={<ArtistPage/>}/>
          <Route path='/exhibits' element={<ExhibitPage/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;