import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddClaseForm from "./pages/AddClaseForm";
import EditClase from "./pages/EditClase";
import ConfirmDeleteModal from "./pages/ConfirmDeleteModal";

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-clase" element={<AddClaseForm />} />
        <Route path="/edit-clase/:id" element={<EditClase />} />
        <Route path="/delete-clase/:id" element={<ConfirmDeleteModal />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
