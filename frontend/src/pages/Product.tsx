import React, { useEffect, useState } from 'react';
import { 
  fetchProducts,
  fetchCreateProducts,
  fetchDeleteProduct,
  fetchUpdateProduct
} from '../services/productService';
import { Product } from '../types';
import '../styles/Product.css';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ name: '', price: '', quantity: '', category: '', description: '' });

  useEffect(() => {
    fetchProducts().then(setProducts).catch((error) => {
      console.error('Erro ao buscar produtos:', error);
      alert('Erro ao buscar produtos. Tente novamente mais tarde.');
    });
  }, []);

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        quantity: product.quantity.toString(),
        category: product.category,
        description: product.description,
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', quantity: '', category: '', description: '' });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ name: '', price: '', quantity: '', category: '', description: '' });
    setEditingProduct(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      fetchUpdateProduct(editingProduct.id!, {
        ...formData,
        price: Number(formData.price),
        quantity: parseInt(formData.quantity, 10)
      })
        .then(() => {
          // Recarregar produtos após a operação
          return fetchProducts().then(setProducts).catch((error) => {
            console.error('Erro ao buscar produtos:', error);
            alert('Erro ao buscar produtos. Tente novamente mais tarde.');
          });
        })
        .catch((err) => console.error('Erro ao atualizar produto:', err))
        .finally(() => closeModal());
    } else {
      fetchCreateProducts({
        ...formData,
        price: Number(formData.price),
        quantity: parseInt(formData.quantity, 10)
      })
      .then(() => {
        // Recarregar produtos após a operação
        return fetchProducts().then(setProducts).catch((error) => {
          console.error('Erro ao buscar produtos:', error);
          alert('Erro ao buscar produtos. Tente novamente mais tarde.');
        });
      })
      .catch((err) => console.error('Erro ao salvar produto:', err))
      .finally(() => closeModal());
    }
  };

  const handleDelete = (id: string) => {
    fetchDeleteProduct(id)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((err) => console.error('Erro ao excluir produto:', err));
  };

  return (
    <div className="product-container">
      <div className="nav-buttons">
        <button onClick={() => window.location.href = '/'}>Dashboard</button>
        <button onClick={() => window.location.href = '/movements'}>Movimentações</button>
        <button onClick={() => window.location.href = '/agent'}>Agente IA</button>
      </div>
      <h1 className="product-title">Gerenciar Produtos</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p><strong>Categoria</strong>: {product.category}</p>
            <p><strong>Descrição</strong>: {product.description}</p>
            <p><strong>Preço</strong>: R$ {product.price}</p>
            <p><strong>Estoque</strong>: {product.quantity}</p>
            <div className="product-actions">
              <button className='editBtn' onClick={() => openModal(product)}>Editar</button>
              <button className='deleteBtn' onClick={() => handleDelete(product.id!)}>Excluir</button>
            </div>
          </div>
        ))}
        <div className="product-card add-product-card" onClick={() => openModal()}>
          <h2>+</h2>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Nome:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Categoria:
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Descrição:
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Preço:
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
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

export default ProductPage;
