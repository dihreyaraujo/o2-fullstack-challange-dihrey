import { useState } from 'react';
import '../styles/Agent.css';

export default function Agent() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnswer('');

    try {
      const response = await fetch('http://localhost:4000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer('Erro ao buscar resposta da IA.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agent-container">
      <h2>Agente de IA</h2>
      <form onSubmit={handleSubmit} className="agent-form">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Digite sua pergunta..."
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Consultando...' : 'Perguntar'}
        </button>
      </form>
      {answer && (
        <div className="agent-response">
          <strong>Resposta:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
