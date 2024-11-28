

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [perfil, setPerfil] = useState('');

  // Carrega estado de autenticação e perfil ao montar o componente
  useEffect(() => {
    const authStatus = localStorage.getItem('autenticado');
    const userPerfil = localStorage.getItem('perfil');
    if (authStatus && userPerfil) {
      setAutenticado(true);
      setPerfil(userPerfil);
    }
  }, []);

  const credenciaisCorretas = {
    admin: { usuario: 'admin', senha: '123' },
    funcionario: { usuario: 'funcionario', senha: '123' },
    cliente: { usuario: 'cliente', senha: '123' }, // Novo cliente
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario === credenciaisCorretas.admin.usuario && senha === credenciaisCorretas.admin.senha) {
      setAutenticado(true);
      setPerfil('admin');
      localStorage.setItem('autenticado', 'true');
      localStorage.setItem('perfil', 'admin');
    } else if (usuario === credenciaisCorretas.funcionario.usuario && senha === credenciaisCorretas.funcionario.senha) {
      setAutenticado(true);
      setPerfil('funcionario');
      localStorage.setItem('autenticado', 'true');
      localStorage.setItem('perfil', 'funcionario');
    } else if (usuario === credenciaisCorretas.cliente.usuario && senha === credenciaisCorretas.cliente.senha) {
      setAutenticado(true);
      setPerfil('cliente');
      localStorage.setItem('autenticado', 'true');
      localStorage.setItem('perfil', 'cliente');
    } else {
      alert('Usuário ou senha incorretos. Tente novamente.');
    }
  };

  const handleLogout = () => {
    setAutenticado(false);
    setPerfil('');
    setUsuario('');
    setSenha('');
    localStorage.removeItem('autenticado');
    localStorage.removeItem('perfil');
  };

  if (!autenticado) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Acesso Restrito</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Oficina Eletrônica e Eletrodomésticos</h1>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Sair do Sistema
      </button>
      
      <div style={styles.grid}>
        {perfil === 'cliente' && ( // Apenas para clientes
          <Link href="/statusOrdens" style={styles.card}>
            <h2>Status das Ordens &rarr;</h2>
            <p>Verificar o status das suas ordens de serviço.</p>
          </Link>
        )}
  
        {perfil === 'admin' && (
          <>
            <Link href="/clientes" style={styles.card}>
              <h2>Clientes &rarr;</h2>
              <p>Gerenciar os clientes cadastrados.</p>
            </Link>
            <Link href="/equipamentos" style={styles.card}>
              <h2>Equipamentos &rarr;</h2>
              <p>Gerenciar equipamentos em manutenção.</p>
            </Link>
            <Link href="/ordensDeServico" style={styles.card}>
              <h2>Ordens de Serviço &rarr;</h2>
              <p>Gerenciar as ordens geradas.</p>
            </Link>
            <Link href="/funcionarios" style={styles.card}>
              <h2>Funcionários &rarr;</h2>
              <p>Gerenciar os funcionários.</p>
            </Link>
            <Link href="/relatorios" style={styles.card}>
              <h2>Relatórios &rarr;</h2>
              <p>Gerenciar relatórios e estatísticas.</p>
            </Link>
          </>
        )}
  
        {perfil === 'funcionario' && (
          <>
            <Link href="/clientes" style={styles.card}>
              <h2>Clientes &rarr;</h2>
              <p>Gerenciar os clientes cadastrados.</p>
            </Link>
            <Link href="/equipamentos" style={styles.card}>
              <h2>Equipamentos &rarr;</h2>
              <p>Gerenciar equipamentos em manutenção.</p>
            </Link>
            <Link href="/ordensDeServico" style={styles.card}>
              <h2>Ordens de Serviço &rarr;</h2>
              <p>Gerenciar as ordens geradas.</p>
            </Link>
          </>
        )}
      </div>
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
    fontSize: '4rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    padding: '0.75rem',
    margin: '0.5rem 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  logoutButton: {
    margin: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    alignSelf: 'flex-end',
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '800px',
    marginTop: '3rem',
  },
  card: {
    margin: '1rem',
    padding: '1.5rem',
    textAlign: 'left',
    color: 'inherit',
    textDecoration: 'none',
    border: '1px solid #636363',
    borderRadius: '10px',
    transition: 'color 0.15s ease, border-color 0.15s ease',
    maxWidth: '300px',
  },
};

