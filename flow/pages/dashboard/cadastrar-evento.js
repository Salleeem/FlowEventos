'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CadastrarEvento() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleCadastrar = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Obtém o token do armazenamento local

    const response = await fetch('/api/eventos/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Inclui o token no header
      },
      body: JSON.stringify({ titulo, descricao, dataInicio, capacidade })
    });

    if (response.ok) {
      setMessage('Evento cadastrado com sucesso!');
      router.push('/dashboard/organizador'); // Redireciona para a dashboard do organizador
    } else {
      const data = await response.json();
      setMessage(`Erro: ${data.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '300px', textAlign: 'center' }}>
        <h2>Cadastrar Evento</h2>
        <form onSubmit={handleCadastrar}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="datetime-local"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="number"
            placeholder="Capacidade"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <button
            type="submit"
            style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cadastrar
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
