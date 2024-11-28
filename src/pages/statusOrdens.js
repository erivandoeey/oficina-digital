
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function StatusOrdens() {
  const [ordens, setOrdens] = useState([]);
  const [mostrarOrdens, setMostrarOrdens] = useState(false); // Estado para controlar exibição
  const [error, setError] = useState(null);
  const router = useRouter(); // Hook para navegação

  // Buscar ordens de serviço do cliente
  useEffect(() => {
    async function fetchOrdens() {
      try {
        const response = await fetch('/api/ordensDeServico?usuario=cliente'); // Ajuste a URL conforme necessário
        if (!response.ok) throw new Error('Erro ao buscar ordens de serviço');
        const data = await response.json();
        setOrdens(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchOrdens();
  }, []);

  if (error) return <p>{error}</p>;

  // Função para alternar a exibição das ordens de serviço
  const toggleMostrarOrdens = () => {
    setMostrarOrdens((prev) => !prev);
  };

  // Função para voltar à página principal
  const handleGoBack = () => {
    router.push('/'); // Redireciona para a página principal
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Minhas Ordens de Serviço</h1>

      {/* Botão para listar/ocultar ordens */}
      <button style={styles.toggleButton} onClick={toggleMostrarOrdens}>
        {mostrarOrdens ? 'Ocultar Ordens' : 'Listar Ordens'}
      </button>

      {/* Lista de ordens de serviço */}
      {mostrarOrdens && (
        ordens.length > 0 ? (
          <ul style={styles.orderList}>
            {ordens.map((ordem) => (
              <li key={ordem.id} style={styles.orderItem}>
                <p><strong>Descrição:</strong> {ordem.descricao}</p>
                <p><strong>Status:</strong> {ordem.status}</p>
                <p><strong>Cliente:</strong> {ordem.cliente.nome}</p>
                <p><strong>Equipamento:</strong> {ordem.equipamento.nome}</p>
                <p><strong>Funcionario:</strong> {ordem.funcionario.nome}</p>
                <p><strong>Criado Em:</strong> {new Date(ordem.criadoEm).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma ordem de serviço encontrada.</p>
        )
      )}

      {/* Botão para voltar à página principal */}
      <button style={styles.goBackButton} onClick={handleGoBack}>
        Voltar à Página Principal
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: '0 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    textAlign: 'center',
  },
  toggleButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    marginTop: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  orderList: {
    marginTop: '1rem',
    padding: '0',
    listStyleType: 'none',
  },
  orderItem: {
    padding: '1rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
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
};
