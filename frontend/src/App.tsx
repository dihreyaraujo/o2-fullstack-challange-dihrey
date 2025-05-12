import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Movements from './pages/Movements';
import ProductPage from './pages/Product';
import Agent from './pages/Agent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/movements" element={<Movements />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/agent" element={<Agent />} />
      </Routes>
    </BrowserRouter>
  );
}