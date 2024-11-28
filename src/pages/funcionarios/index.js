

import { useState } from 'react';
import Funcionario from '../../models/Funcionario';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Funcionarios({ funcionarios }) {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [mostrarFuncionarios, setMostrarFuncionarios] = useState(false); // Controla a exibição da lista de funcionários
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editandoId) {
      // Atualizar
      await axios.put(`/api/funcionarios/${editandoId}`, { nome, cargo, email });
      setEditandoId(null);
    } else {
      // Adicionar
      await axios.post('/api/funcionarios', { nome, cargo, email });
    }

    // Limpar os campos
    setNome('');
    setCargo('');
    setEmail('');

    // Recarregar a página para atualizar a lista de funcionários
    router.replace(router.asPath);
  };

  const handleEdit = (funcionario) => {
    setNome(funcionario.nome);
    setCargo(funcionario.cargo);
    setEmail(funcionario.email);
    setEditandoId(funcionario.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/funcionarios/${id}`);
    router.replace(router.asPath);
  };

  // Função para voltar à página principal
  const handleGoBack = () => {
    router.push('/'); // Redireciona para a página principal
  };

  // Alternar visibilidade da lista de funcionários
  const toggleMostrarFuncionarios = () => {
    setMostrarFuncionarios(!mostrarFuncionarios);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gerenciar Funcionários</h1>
      <div style={styles.listar}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button} type="submit">
            {editandoId ? 'Atualizar' : 'Adicionar'}
          </button>
        </form>

        <button style={styles.toggleButton} onClick={toggleMostrarFuncionarios}>
          {mostrarFuncionarios ? 'Ocultar Funcionários' : 'Listar Funcionários'}
        </button>

        {mostrarFuncionarios && (
          <ul>
            {funcionarios.map((funcionario) => (
              <li style={styles.listItem} key={funcionario.id}>
                {funcionario.nome} - {funcionario.cargo} - {funcionario.email}
                <button style={styles.button} onClick={() => handleEdit(funcionario)}>Editar</button>
                <button style={styles.deleteButton} onClick={() => handleDelete(funcionario.id)}>Deletar</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Botão para voltar à página principal */}
      <button style={styles.goBackButton} onClick={handleGoBack}>
        Voltar à Página Principal
      </button>
    </div>
  );
}

export async function getServerSideProps() {
  const funcionarios = await Funcionario.listar();
  return { props: { funcionarios } };
}

// Estilos em JS reutilizados e refinados
const styles = {
  container: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  listar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    margin: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    margin: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    alignSelf: 'flex-end',
  },
  toggleButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    margin: '1rem 0',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  goBackButton: {
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    marginTop: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0.75rem 1rem',
    margin: '0.5rem 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
};


