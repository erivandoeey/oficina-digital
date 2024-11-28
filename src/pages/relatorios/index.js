
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Relatorios() {
  const [relatorio, setRelatorio] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Buscar os dados do relatório
  useEffect(() => {
    async function fetchRelatorio() {
      try {
        const response = await fetch('/api/relatorios');
        if (!response.ok) throw new Error('Erro ao buscar relatório');
        const data = await response.json();
        setRelatorio(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchRelatorio();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Relatórios</h1>
      {relatorio ? (
        <div style={styles.reportContainer}>
          <h2>Lista Geral</h2>
          <p>Total de Clientes: {relatorio.totalClientes}</p>
          <p>Total de Ordens de Serviço: {relatorio.totalOrdens}</p>
          <p>Total de Equipamentos: {relatorio.totalEquipamentos}</p>
          <p>Total de Funcionários: {relatorio.totalFuncionarios}</p>
          <h2>Ordens de Serviço por Status</h2>
          <p>Ordens Pendentes: {relatorio.resumo.ordensPendentes}</p>
          <p>Ordens Em progresso: {relatorio.resumo.ordensEmProgresso}</p>
          <p>Ordens Concluídas: {relatorio.resumo.ordensConcluidas}</p>
          <p>Ordens Canceladas: {relatorio.resumo.ordensCanceladas}</p>
        </div>
      ) : (
        <p>Carregando relatório...</p>
      )}
      
      
      {/* Botão de Voltar à Página Principal */}
      <button onClick={() => router.push('/')} style={styles.backButton}>
        Voltar à Página Principal
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: '1rem',
    maxWidth: '800px',
    margin: 'auto',
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
  },
  reportContainer: {
    marginTop: '1rem',
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  backButton: {
    marginTop: '1.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
  },
};
