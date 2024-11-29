
// import Equipamento from '../../models/Equipamento';
// import Cliente from '../../models/Cliente'; // Importar modelo de clientes
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// export default function Equipamentos({ equipamentos, clientes }) { // Receber clientes
//   const [nome, setNome] = useState('');
//   const [marca, setMarca] = useState('');
//   const [modelo, setModelo] = useState('');
//   const [clienteId, setClienteId] = useState(''); // Novo estado para clienteId
//   const [editandoId, setEditandoId] = useState(null);
//   const [mostrarEquipamentos, setMostrarEquipamentos] = useState(false); // Controla a exibição da lista de equipamentos
//   const router = useRouter();

//   // Submissão do formulário (criação/atualização de equipamento)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const equipamentoData = { nome, marca, modelo, clienteId: clienteId || null };

//     try {
//       if (editandoId) {
//         // Atualizar equipamento
//         await axios.put(`/api/equipamentos/${editandoId}`, equipamentoData);
//         setEditandoId(null);
//       } else {
//         // Adicionar equipamento
//         await axios.post('/api/equipamentos', equipamentoData);
//       }

//       // Resetar os campos após a submissão
//       setNome('');
//       setMarca('');
//       setModelo('');
//       setClienteId('');

//       // Recarregar a página para refletir as mudanças
//       router.replace(router.asPath);
//     } catch (error) {
//       console.error('Erro ao enviar dados:', error);
//     }
//   };

//   const [perfil, setPerfil] = useState('');

// useEffect(() => {
//   const userPerfil = localStorage.getItem('perfil');
//   if (userPerfil) {
//     setPerfil(userPerfil);
//   }
// }, []);


//   // Função para editar um equipamento existente
//   const handleEdit = (equipamento) => {
//     setNome(equipamento.nome);
//     setMarca(equipamento.marca);
//     setModelo(equipamento.modelo);
//     setClienteId(equipamento.clienteId || ''); // Preencher clienteId se houver
//     setEditandoId(equipamento.id);
//   };

//   // Função para deletar um equipamento
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/equipamentos/${id}`);
//       router.replace(router.asPath);
//     } catch (error) {
//       console.error('Erro ao deletar equipamento:', error);
//     }
//   };

//   // Função para voltar à página principal
//   const handleGoBack = () => {
//     router.push('/'); // Redireciona para a página principal
//   };

//   // Alternar visibilidade da lista de equipamentos
//   const toggleMostrarEquipamentos = () => {
//     setMostrarEquipamentos(!mostrarEquipamentos);
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Gerenciar Equipamentos</h1>

//       <div style={styles.formContainer}>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Nome"
//             value={nome}
//             onChange={(e) => setNome(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <input
//             type="text"
//             placeholder="Marca"
//             value={marca}
//             onChange={(e) => setMarca(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <input
//             type="text"
//             placeholder="Modelo"
//             value={modelo}
//             onChange={(e) => setModelo(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <select
//             value={clienteId}
//             onChange={(e) => setClienteId(e.target.value)}
//             style={styles.input}
//           >
//             <option value="">Selecione um cliente</option>
//             {clientes.map((cliente) => (
//               <option key={cliente.id} value={cliente.id}>
//                 {cliente.nome}
//               </option>
//             ))}
//           </select>
//           <button style={styles.button} type="submit">
//             {editandoId ? 'Atualizar' : 'Adicionar'}
//           </button>
//         </form>
//       </div>

//       <button style={styles.toggleButton} onClick={toggleMostrarEquipamentos}>
//         {mostrarEquipamentos ? 'Ocultar Equipamentos' : 'Listar Equipamentos'}
//       </button>

//       {mostrarEquipamentos && (
//         <ul>
//           {equipamentos.map((equipamento) => (
//             <li style={styles.listItem} key={equipamento.id}>
//               <span>{equipamento.nome} - {equipamento.marca} - {equipamento.modelo}</span>
//               <div>
//                 <button style={styles.button} onClick={() => handleEdit(equipamento)}>Editar</button>
                
//                 {/* Renderizar botões apenas se o perfil não for "funcionario" */}
//                 {perfil !== 'funcionario' && (
//                     <>
//                     <button style={styles.deleteButton} onClick={() => handleDelete(equipamento.id)}>Deletar</button>
//                     </>
//                       )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Botão para voltar à página principal */}
//       <button style={styles.goBackButton} onClick={handleGoBack}>
//         Voltar à Página Principal
//       </button>
//     </div>
//   );
// }

// // Função de carregamento de dados no servidor
// export async function getServerSideProps() {
//   const equipamentos = await Equipamento.listar();
//   const clientes = await Cliente.listar(); // Buscar todos os clientes disponíveis
//   return { props: { equipamentos, clientes } }; // Passar os clientes para o componente
// }

// // Estilos em JS reutilizados e refinados
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
//     marginBottom: '2rem',
//   },
//   input: {
//     width: '100%',
//     padding: '0.75rem',
//     margin: '0.5rem 0',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     backgroundColor: '#0070f3',
//     color: '#fff',
//     border: 'none',
//     padding: '0.75rem 1.5rem',
//     margin: '0.5rem',
//     borderRadius: '4px',
//     cursor: 'pointer',
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
//     color: '#fff',
//     border: 'none',
//     padding: '0.75rem 1.5rem',
//     margin: '1rem 0',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   goBackButton: {
//     backgroundColor: '#333',
//     color: '#fff',
//     border: 'none',
//     padding: '0.75rem 1.5rem',
//     marginTop: '1rem',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   listItem: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     padding: '0.75rem 1rem',
//     margin: '0.5rem 0',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//   },
// };



import Equipamento from '../../models/Equipamento';
import Cliente from '../../models/Cliente'; // Importar modelo de clientes
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Equipamentos({ equipamentos, clientes }) { // Receber clientes
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [clienteId, setClienteId] = useState(''); // Novo estado para clienteId
  const [editandoId, setEditandoId] = useState(null);
  const [mostrarEquipamentos, setMostrarEquipamentos] = useState(false); // Controla a exibição da lista de equipamentos
  const router = useRouter();

  // Submissão do formulário (criação/atualização de equipamento)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verificar se os campos obrigatórios estão preenchidos
    if (!nome || !marca || !modelo) {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, Marca e Modelo) antes de adicionar ou atualizar um equipamento.');
      return;
    }
  
    const equipamentoData = { 
      nome, 
      marca, 
      modelo, 
      clienteId: clienteId || null 
    };
  
    try {
      if (editandoId) {
        // Atualizar equipamento
        await axios.put(`/api/equipamentos/${editandoId}`, equipamentoData);
        setEditandoId(null);
      } else {
        // Adicionar equipamento
        await axios.post('/api/equipamentos', equipamentoData);
      }
  
      // Resetar os campos após a submissão
      setNome('');
      setMarca('');
      setModelo('');
      setClienteId('');
  
      // Recarregar a página para refletir as mudanças
      router.replace(router.asPath);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Ocorreu um erro ao salvar o equipamento. Por favor, tente novamente.');
    }
  };
  

  const [perfil, setPerfil] = useState('');

useEffect(() => {
  const userPerfil = localStorage.getItem('perfil');
  if (userPerfil) {
    setPerfil(userPerfil);
  }
}, []);


  // Função para editar um equipamento existente
  const handleEdit = (equipamento) => {
    setNome(equipamento.nome);
    setMarca(equipamento.marca);
    setModelo(equipamento.modelo);
    setClienteId(equipamento.clienteId || ''); // Preencher clienteId se houver
    setEditandoId(equipamento.id);
  };

  // Função para deletar um equipamento
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/equipamentos/${id}`);
      router.replace(router.asPath);
    } catch (error) {
      console.error('Erro ao deletar equipamento:', error);
    }
  };

  // Função para voltar à página principal
  const handleGoBack = () => {
    router.push('/'); // Redireciona para a página principal
  };

  // Alternar visibilidade da lista de equipamentos
  const toggleMostrarEquipamentos = () => {
    setMostrarEquipamentos(!mostrarEquipamentos);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gerenciar Equipamentos</h1>

      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
            style={styles.input}
          />
          <select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            style={styles.input}
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
          <button style={styles.button} type="submit">
            {editandoId ? 'Atualizar' : 'Adicionar'}
          </button>
        </form>
      </div>

      <button style={styles.toggleButton} onClick={toggleMostrarEquipamentos}>
        {mostrarEquipamentos ? 'Ocultar Equipamentos' : 'Listar Equipamentos'}
      </button>

      {mostrarEquipamentos && (
        <ul>
          {equipamentos.map((equipamento) => (
            <li style={styles.listItem} key={equipamento.id}>
              <span>{equipamento.nome} - {equipamento.marca} - {equipamento.modelo}</span>
              <div>
                <button style={styles.button} onClick={() => handleEdit(equipamento)}>Editar</button>
                
                {/* Renderizar botões apenas se o perfil não for "funcionario" */}
                {perfil !== 'funcionario' && (
                    <>
                    <button style={styles.deleteButton} onClick={() => handleDelete(equipamento.id)}>Deletar</button>
                    </>
                      )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Botão para voltar à página principal */}
      <button style={styles.goBackButton} onClick={handleGoBack}>
        Voltar à Página Principal
      </button>
    </div>
  );
}

// Função de carregamento de dados no servidor
export async function getServerSideProps() {
  const equipamentos = await Equipamento.listar();
  const clientes = await Cliente.listar(); // Buscar todos os clientes disponíveis
  return { props: { equipamentos, clientes } }; // Passar os clientes para o componente
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
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '2rem',
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
