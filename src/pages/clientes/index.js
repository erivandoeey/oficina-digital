
import { useState, useEffect } from 'react';
import Cliente from '../../models/Cliente';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Clientes({ clientes }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [mostrarClientes, setMostrarClientes] = useState(false); // Estado para controle da exibição de clientes
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editandoId) {
      // Atualizar cliente
      await axios.put(`/api/clientes/${editandoId}`, { nome, email, telefone });
      setEditandoId(null);
    } else {
      // Adicionar novo cliente
      await axios.post('/api/clientes', { nome, email, telefone });
    }

    // Limpar os campos após a submissão
    setNome('');
    setEmail('');
    setTelefone('');

    // Recarregar a página para atualizar a lista de clientes
    router.replace(router.asPath);
  };

  const [perfil, setPerfil] = useState('');

  useEffect(() => {
    const userPerfil = localStorage.getItem('perfil');
    if (userPerfil) {
      setPerfil(userPerfil);
    }
  }, []);

  const handleEdit = (cliente) => {
    setNome(cliente.nome);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setEditandoId(cliente.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/clientes/${id}`);
    router.replace(router.asPath);
  };

  const handleGoBack = () => {
    router.push('/'); // Redireciona para a página principal
  };

  // Alternar visibilidade da lista de clientes
  const toggleMostrarClientes = () => {
    setMostrarClientes(!mostrarClientes);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gerenciar Clientes</h1>
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button} type="submit">
            {editandoId ? 'Atualizar' : 'Adicionar'}
          </button>
        </form>

        <button style={styles.toggleButton} onClick={toggleMostrarClientes}>
          {mostrarClientes ? 'Ocultar Clientes' : 'Listar Clientes'}
        </button>

        {mostrarClientes && (
          <ul>
            {clientes.map((cliente) => (
              <li style={styles.listItem} key={cliente.id}>
                {cliente.nome} - {cliente.email} - {cliente.telefone}
                <button style={styles.button} onClick={() => handleEdit(cliente)}>Editar</button>

                {/* Renderizar botões apenas se o perfil não for "funcionario" */}
                {perfil !== 'funcionario' && (
                    <>
                    <button style={styles.deleteButton} onClick={() => handleDelete(cliente.id)}>Deletar</button>
                    </>
                      )}
                
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
  const clientes = await Cliente.listar();
  return { props: { clientes } };
}

// Estilos em JS
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
