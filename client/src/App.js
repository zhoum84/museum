import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import { SearchPage } from "./pages/SearchPage";
function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/search' element={<SearchPage/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;