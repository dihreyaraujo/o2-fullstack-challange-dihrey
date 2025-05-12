import React, { useEffect, useState } from 'react';
import { fetchMovements, fetchCreateMovement } from '../services/movementService';
import { StockMovement, Product } from '../types';
import '../styles/Movements.css';
import { fetchProducts } from '../services/productService';

const MovementsPage: React.FC = () => {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ productId: '', type: 'entrada', quantity: '', date: new Date().toISOString() });

  useEffect(() => {
    fetchMovements().then(setMovements)
      .catch((err) => console.error('Erro ao buscar movimentações:', err));
    fetchProducts().then(setProducts)
      .catch((err) => console.error('Erro ao buscar produtos:', err));
  }, []);

  const openModal = () => {
    setFormData({ productId: '', type: 'entrada', quantity: '', date: new Date().toISOString() });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ productId: '', type: 'entrada', quantity: '', date: new Date().toISOString() });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCreateMovement({...formData, quantity: Number(formData.quantity)})
      .then(() => {
        // Atualiza a lista após o envio
        return fetchMovements().then(setMovements)
            .catch((err) => console.error('Erro ao buscar movimentações:', err));
      })
      .catch((err) => window.alert(err.response.data.error))
      .finally(() => closeModal());
  };

  return (
    <div className="movement-container">
      <h1 className="movement-title">Movimentações de Estoque</h1>
      <button className="movement-add-button" onClick={openModal}>
        Nova Movimentação
      </button>
      <div className="movement-grid">
        {movements.map((m) => (
          <div key={m.id} className="movement-card">
            <h2>{products.find((p) => p.id === m.productId)!.name}</h2>
            <p><strong>Tipo:</strong> {m.type}</p>
            <p><strong>Quantidade:</strong> {m.quantity}</p>
            <p><strong>Data:</strong> {new Date(m.date).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Registrar Movimentação</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Produto:
                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Tipo:
                <select name="type" value={formData.type} onChange={handleChange}>
                  <option value="entrada">entrada</option>
                  <option value="saida">saida</option>
                </select>
              </label>
              <label>
                Quantidade:
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Data:
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="modal-actions">
                <button type="submit">Salvar</button>
                <button type="button" onClick={closeModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovementsPage;
