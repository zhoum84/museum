import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import { SearchPage } from "./pages/SearchPage";
import { CuratorPage } from "./pages/CuratorPage";

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
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;