
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// export default function OrdensDeServico() {
//   const [descricao, setDescricao] = useState('');
//   const [status, setStatus] = useState('');
//   const [clienteId, setClienteId] = useState('');
//   const [equipamentoId, setEquipamentoId] = useState('');
//   const [funcionarioId, setFuncionarioId] = useState('');
//   const [editandoId, setEditandoId] = useState(null);
//   const [ordensDeServico, setOrdensDeServico] = useState([]);
//   const [clientes, setClientes] = useState([]);
//   const [equipamentos, setEquipamentos] = useState([]);
//   const [todosEquipamentos, setTodosEquipamentos] = useState([]);
//   const [funcionarios, setFuncionarios] = useState([]);
//   const [mostrarOrdens, setMostrarOrdens] = useState(false);
//   const [perfil, setPerfil] = useState('');
//   const router = useRouter();

//   // Função para carregar dados iniciais
//   const fetchData = async () => {
//     try {
//       const [ordensRes, clientesRes, equipamentosRes, funcionariosRes] = await Promise.all([
//         axios.get('/api/ordensDeServico'),
//         axios.get('/api/clientes'),
//         axios.get('/api/equipamentos'),
//         axios.get('/api/funcionarios'),
//       ]);

//       setOrdensDeServico(ordensRes.data);
//       setClientes(clientesRes.data);
//       setEquipamentos(equipamentosRes.data);
//       setTodosEquipamentos(equipamentosRes.data);
//       setFuncionarios(funcionariosRes.data);
//     } catch (error) {
//       console.error('Erro ao carregar dados:', error);
//     }
//   };

//   // Função para recarregar ordens de serviço
//   const fetchOrdensDeServico = async () => {
//     try {
//       const ordensRes = await axios.get('/api/ordensDeServico');
//       setOrdensDeServico(ordensRes.data);
//     } catch (error) {
//       console.error('Erro ao carregar ordens de serviço:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();

//     const userPerfil = localStorage.getItem('perfil');
//     if (userPerfil) {
//       setPerfil(userPerfil);
//     }
//   }, []);

//   useEffect(() => {
//     if (clienteId) {
//       const equipamentosFiltrados = todosEquipamentos.filter(
//         (equipamento) => equipamento.clienteId === parseInt(clienteId, 10)
//       );
//       setEquipamentos(equipamentosFiltrados);
//     } else {
//       setEquipamentos([]);
//     }
//   }, [clienteId, todosEquipamentos]);

//   // Submissão do formulário
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editandoId) {
//         await axios.put(`/api/ordensDeServico/${editandoId}`, {
//           descricao,
//           status,
//           clienteId: parseInt(clienteId, 10),
//           equipamentoId: parseInt(equipamentoId, 10),
//           funcionarioId: parseInt(funcionarioId, 10),
//         });
//       } else {
//         await axios.post('/api/ordensDeServico', {
//           descricao,
//           status,
//           clienteId: parseInt(clienteId, 10),
//           equipamentoId: parseInt(equipamentoId, 10),
//           funcionarioId: parseInt(funcionarioId, 10),
//         });
//       }

//       // Limpar os campos do formulário
//       setDescricao('');
//       setStatus('');
//       setClienteId('');
//       setEquipamentoId('');
//       setFuncionarioId('');
//       setEditandoId(null);

//       // Recarregar ordens de serviço
//       await fetchOrdensDeServico();
//     } catch (error) {
//       console.error('Erro ao enviar dados:', error);
//     }
//   };

//   const handleEdit = (ordem) => {
//     setDescricao(ordem.descricao);
//     setStatus(ordem.status);
//     setClienteId(ordem.clienteId);
//     setEquipamentoId(ordem.equipamentoId);
//     setFuncionarioId(ordem.funcionarioId);
//     setEditandoId(ordem.id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/ordensDeServico/${id}`);
//       await fetchOrdensDeServico();
//     } catch (error) {
//       console.error('Erro ao deletar ordem de serviço:', error);
//     }
//   };

//   const handleGoBack = () => {
//     router.push('/');
//   };

//   const toggleMostrarOrdens = () => {
//     setMostrarOrdens(!mostrarOrdens);
//   };


//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Gerenciar Ordens de Serviço</h1>
//       <div style={styles.formContainer}>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Descrição"
//             value={descricao}
//             onChange={(e) => setDescricao(e.target.value)}
//             style={styles.input}
//             required
//           />
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             style={styles.input}
//             required
//           >  
//             <option value="">Selecione o Status</option>
//             <option value="PENDENTE">Pendente</option>
//             <option value="EM_PROGRESSO">Em Progresso</option>
//             <option value="CONCLUIDA">Concluída</option>
//             <option value="CANCELADA">Cancelada</option>
//           </select>
//           <select
//             value={clienteId}
//             onChange={(e) => setClienteId(e.target.value)}
//             style={styles.input}
//             required
//           >
//             <option value="">Selecione o Cliente</option>
//             {clientes.map((cliente) => (
//               <option key={cliente.id} value={cliente.id}>
//                 {cliente.nome}
//               </option>
//             ))}
//           </select>
//           <select
//             value={equipamentoId}
//             onChange={(e) => setEquipamentoId(e.target.value)}
//             style={styles.input}
//             required
//           >
//             <option value="">Selecione o Equipamento</option>
//             {equipamentos.map((equipamento) => (
//               <option key={equipamento.id} value={equipamento.id}>
//                 {equipamento.nome} - {equipamento.marca} - {equipamento.modelo}
//               </option>
//             ))}
//           </select>
//           <select
//             value={funcionarioId}
//             onChange={(e) => setFuncionarioId(e.target.value)}
//             style={styles.input}
//             required
//           >
//             <option value="">Selecione o Funcionário</option>
//             {funcionarios.map((funcionario) => (
//               <option key={funcionario.id} value={funcionario.id}>
//                 {funcionario.nome} - {funcionario.cargo}
//               </option>
//             ))}
//           </select>
//           <button type="submit" style={styles.button}>
//             {editandoId ? 'Atualizar' : 'Adicionar'} Ordem de Serviço
//           </button>
//         </form>

//         <button onClick={toggleMostrarOrdens} style={styles.toggleButton}>
//           {mostrarOrdens ? 'Ocultar Ordens de Serviço' : 'Listar Ordens de Serviço'}
//         </button>

//         {mostrarOrdens && (
//   <ul style={styles.list}>
//     {ordensDeServico.map((ordem) => (
//       <li key={ordem.id} style={styles.listItem}>
//         <p>Descrição: {ordem.descricao}</p>
//         <p>Status: {ordem.status}</p>
//         <p>Cliente: {ordem.cliente ? ordem.cliente.nome : 'Não especificado'}</p>
//         <p>Equipamento: {ordem.equipamento ? ordem.equipamento.nome : 'Não especificado'}</p>
//         <p>Funcionário: {ordem.funcionario ? ordem.funcionario.nome : 'Não especificado'}</p>
//         <p>
//           <strong>Data de Criação:</strong>{' '}
//           {ordem.criadoEm 
//             ? new Date(ordem.criadoEm).toLocaleDateString() 
//             : 'Data não disponível'}
//         </p>
//         <p>
//           <strong>Hora de Criação:</strong>{' '}
//           {ordem.criadoEm 
//             ? new Date(ordem.criadoEm).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
//             : 'Hora não disponível'}
//         </p>
//         <button onClick={() => handleEdit(ordem)} style={styles.button}>Editar</button>
//         {perfil !== 'funcionario' && (
//           <>
//             <button onClick={() => handleDelete(ordem.id)} style={styles.deleteButton}>Deletar</button>
//           </>
//         )}
//       </li>
//     ))}
//   </ul>
// )}

//       </div>

//       <button onClick={handleGoBack} style={styles.goBackButton}>
//         Voltar à Página Principal
//       </button>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: '2rem',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: '100vh',
//   },
//   title: {
//     fontSize: '2.5rem',
//     marginBottom: '1.5rem',
//     textAlign: 'center',
//   },
//   formContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '100%',
//     maxWidth: '800px',
//   },
//   input: {
//     width: '100%',
//     padding: '0.75rem',
//     margin: '0.5rem 0',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     color: 'white',
//     padding: '0.75rem 1.5rem',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     margin: '1rem 0',
//   },
//   deleteButton: {
//     margin: '1rem',
//     padding: '0.75rem 1.5rem',
//     backgroundColor: '#d9534f',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     alignSelf: 'flex-end',
//   },
//   toggleButton: {
//     backgroundColor: '#28a745',
//     color: 'white',
//     padding: '0.75rem 1.5rem',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     margin: '1rem 0',
//   },
//   list: {
//     width: '100%',
//     marginTop: '1rem',
//     padding: '0',
//     listStyle: 'none',
//   },
//   listItem: {
//     padding: '1rem',
//     borderBottom: '1px solid #ccc',
//     textAlign: 'left',
//     marginBottom: '1rem',
//   },
//   goBackButton: {
//     backgroundColor: '#333',
//     color: 'white',
//     padding: '0.75rem 1.5rem',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
// };


import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function OrdensDeServico() {
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [equipamentoId, setEquipamentoId] = useState('');
  const [funcionarioId, setFuncionarioId] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [ordensDeServico, setOrdensDeServico] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [todosEquipamentos, setTodosEquipamentos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [mostrarOrdens, setMostrarOrdens] = useState(false);
  const [perfil, setPerfil] = useState('');
  const router = useRouter();

  // Função para carregar dados iniciais
  const fetchData = async () => {
    try {
      const [ordensRes, clientesRes, equipamentosRes, funcionariosRes] = await Promise.all([
        axios.get('/api/ordensDeServico'),
        axios.get('/api/clientes'),
        axios.get('/api/equipamentos'),
        axios.get('/api/funcionarios'),
      ]);

      setOrdensDeServico(ordensRes.data);
      setClientes(clientesRes.data);
      setEquipamentos(equipamentosRes.data);
      setTodosEquipamentos(equipamentosRes.data);
      setFuncionarios(funcionariosRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  // Função para recarregar ordens de serviço
  const fetchOrdensDeServico = async () => {
    try {
      const ordensRes = await axios.get('/api/ordensDeServico');
      setOrdensDeServico(ordensRes.data);
    } catch (error) {
      console.error('Erro ao carregar ordens de serviço:', error);
    }
  };

  useEffect(() => {
    fetchData();

    const userPerfil = localStorage.getItem('perfil');
    if (userPerfil) {
      setPerfil(userPerfil);
    }
  }, []);

  useEffect(() => {
    if (clienteId) {
      const equipamentosFiltrados = todosEquipamentos.filter(
        (equipamento) => equipamento.clienteId === parseInt(clienteId, 10)
      );
      setEquipamentos(equipamentosFiltrados);
    } else {
      setEquipamentos([]);
    }
  }, [clienteId, todosEquipamentos]);

  // Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!descricao || !status || !clienteId || !equipamentoId || !funcionarioId) {
      alert('Por favor, preencha todos os campos obrigatórios (Descrição, Status, Cliente, Equipamento e Funcionário) antes de adicionar ou atualizar a ordem de serviço.');
      return;
    }
  
    try {
      const ordemDeServicoData = {
        descricao,
        status,
        clienteId: parseInt(clienteId, 10),
        equipamentoId: parseInt(equipamentoId, 10),
        funcionarioId: parseInt(funcionarioId, 10),
      };
  
      if (editandoId) {
        // Atualizar ordem de serviço
        await axios.put(`/api/ordensDeServico/${editandoId}`, ordemDeServicoData);
      } else {
        // Adicionar nova ordem de serviço
        await axios.post('/api/ordensDeServico', ordemDeServicoData);
      }
  
      // Limpar os campos do formulário
      setDescricao('');
      setStatus('');
      setClienteId('');
      setEquipamentoId('');
      setFuncionarioId('');
      setEditandoId(null);
  
      // Recarregar ordens de serviço
      await fetchOrdensDeServico();
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Ocorreu um erro ao salvar a ordem de serviço. Por favor, tente novamente.');
    }
  };
  

  const handleEdit = (ordem) => {
    setDescricao(ordem.descricao);
    setStatus(ordem.status);
    setClienteId(ordem.clienteId);
    setEquipamentoId(ordem.equipamentoId);
    setFuncionarioId(ordem.funcionarioId);
    setEditandoId(ordem.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/ordensDeServico/${id}`);
      await fetchOrdensDeServico();
    } catch (error) {
      console.error('Erro ao deletar ordem de serviço:', error);
    }
  };

  const handleGoBack = () => {
    router.push('/');
  };

  const toggleMostrarOrdens = () => {
    setMostrarOrdens(!mostrarOrdens);
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gerenciar Ordens de Serviço</h1>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={styles.input}
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={styles.input}
            required
          >  
            <option value="">Selecione o Status</option>
            <option value="PENDENTE">Pendente</option>
            <option value="EM_PROGRESSO">Em Progresso</option>
            <option value="CONCLUIDA">Concluída</option>
            <option value="CANCELADA">Cancelada</option>
          </select>
          <select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Selecione o Cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
          <select
            value={equipamentoId}
            onChange={(e) => setEquipamentoId(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Selecione o Equipamento</option>
            {equipamentos.map((equipamento) => (
              <option key={equipamento.id} value={equipamento.id}>
                {equipamento.nome} - {equipamento.marca} - {equipamento.modelo}
              </option>
            ))}
          </select>
          <select
            value={funcionarioId}
            onChange={(e) => setFuncionarioId(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Selecione o Funcionário</option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>
                {funcionario.nome} - {funcionario.cargo}
              </option>
            ))}
          </select>
          <button type="submit" style={styles.button}>
            {editandoId ? 'Atualizar' : 'Adicionar'} Ordem de Serviço
          </button>
        </form>

        <button onClick={toggleMostrarOrdens} style={styles.toggleButton}>
          {mostrarOrdens ? 'Ocultar Ordens de Serviço' : 'Listar Ordens de Serviço'}
        </button>

        {mostrarOrdens && (
  <ul style={styles.list}>
    {ordensDeServico.map((ordem) => (
      <li key={ordem.id} style={styles.listItem}>
        <p>Descrição: {ordem.descricao}</p>
        <p>Status: {ordem.status}</p>
        <p>Cliente: {ordem.cliente ? ordem.cliente.nome : 'Não especificado'}</p>
        <p>Equipamento: {ordem.equipamento ? ordem.equipamento.nome : 'Não especificado'}</p>
        <p>Funcionário: {ordem.funcionario ? ordem.funcionario.nome : 'Não especificado'}</p>
        <p>
          <strong>Data de Criação:</strong>{' '}
          {ordem.criadoEm 
            ? new Date(ordem.criadoEm).toLocaleDateString() 
            : 'Data não disponível'}
        </p>
        <p>
          <strong>Hora de Criação:</strong>{' '}
          {ordem.criadoEm 
            ? new Date(ordem.criadoEm).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            : 'Hora não disponível'}
        </p>
        <button onClick={() => handleEdit(ordem)} style={styles.button}>Editar</button>
        {perfil !== 'funcionario' && (
          <>
            <button onClick={() => handleDelete(ordem.id)} style={styles.deleteButton}>Deletar</button>
          </>
        )}
      </li>
    ))}
  </ul>
)}

      </div>

      <button onClick={handleGoBack} style={styles.goBackButton}>
        Voltar à Página Principal
      </button>
    </div>
  );
}

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
  formContainer: {
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
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '1rem 0',
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
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '1rem 0',
  },
  list: {
    width: '100%',
    marginTop: '1rem',
    padding: '0',
    listStyle: 'none',
  },
  listItem: {
    padding: '1rem',
    borderBottom: '1px solid #ccc',
    textAlign: 'left',
    marginBottom: '1rem',
  },
  goBackButton: {
    backgroundColor: '#333',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

