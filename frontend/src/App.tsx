import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DestinationsPage from "./pages/DestinationsPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <header className="bg-white shadow-md">
        <div className="w-11/12 max-w-6xl mx-auto flex justify-between items-center py-4">
          <Link to="/" className="font-bold text-xl text-gray-800">HotelBediaX</Link>

          <nav className="flex gap-6">
            <Link to="/destinations" className="text-gray-600 hover:text-gray-800 transition">Destinations</Link>
          </nav>
        </div>
      </header>

      <main className="w-11/12 max-w-6xl mx-auto mt-6">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-gray-700 text-lg">
                Bienvenido — Selecciona “Destinations” para comenzar
              </div>
            }
          />
          <Route path="/destinations" element={<DestinationsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
