import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ComparePage from "./pages/ComparePage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </main>
        <footer className="bg-gray-100 py-6 text-center text-gray-600">
          <p>DiffCompare AI &copy; {new Date().getFullYear()}</p>
          <p className="text-sm mt-1">Powered by Google Gemini</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
