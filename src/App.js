import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditUsers from "./components/EditUsers";
import Home from "./components/Home";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />        
        <Route path="/:id" element={<EditUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
