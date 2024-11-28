# Oficina Eletrônica

Este é um projeto de uma aplicação web para gerenciamento de uma oficina de eletrônica, desenvolvido com [Next.js](https://nextjs.org), [Prisma](https://www.prisma.io/), e [MySQL](https://www.mysql.com/). O sistema permite gerenciar clientes, equipamentos, ordens de serviço e mais.

---

## 🔧 Funcionalidades

- **Gerenciamento de Clientes**: Adicionar, atualizar, listar e remover clientes.
- **Cadastro de Equipamentos**: Registrar e gerenciar os equipamentos dos clientes.
- **Ordens de Serviço**: Criar, editar e monitorar o status das ordens de serviço.
- **Relatórios**: Geração de relatórios sobre serviços e atividades.

---

## 🚀 Começando

- Siga as etapas abaixo para configurar e executar o projeto localmente:


### **Pré-requisitos**

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v16 ou superior);
- [MySQL](https://www.mysql.com/);
- [Git](https://git-scm.com/).

### **Instalação**

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/oficina-eletronica.git
cd oficina-eletronica
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure o banco de dados:

- Atualize o arquivo `.env` com as credenciais do seu banco de dados MySQL.

4. Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para acessar a aplicação.

---

## 📒 Modelos do prisma

- Cliente
- Equipamento
- OrdemDeServico

---

## 📒 Estrutura do Projeto

```plaintext
/Projeto/oficina-eletronica
├── /pages          # Páginas da aplicação
├── /components     # Componentes reutilizáveis
├── /prisma         # Esquema do banco de dados
├── /styles         # Arquivos CSS
├── /public         # Arquivos estáticos
├── .env            # Variáveis de ambiente
└── README.md       # Documentação do projeto
```

---

## 🖌 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/docs): Framework React para renderização do lado do servidor e criação de aplicações otimizadas.
- [Prisma](https://www.prisma.io/): ORM para manipulação de banco de dados.
- [MySQL](https://www.mysql.com/): Banco de dados relacional.
- [React](https://reactjs.org/): Biblioteca para construção de interfaces de usuário.
- [Axios](https://axios-http.com/): Cliente HTTP para comunicação entre front-end e back-end.

---

## 🔧 Configuração do Ambiente

1. **Configuração do Banco de Dados:**
   - Atualize o arquivo `.env` com a variável `DATABASE_URL`.

   ```plaintext
   DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
   ```

2. **Migração do Banco:**
   - Rode os comandos do Prisma para gerar as tabelas no banco de dados configurado.

---

## 📊 Modelos Implementados

### **Cliente**
- Adicionar, atualizar, deletar e listar clientes.

### **Equipamento**
- Gerenciar informações sobre os equipamentos dos clientes.

### **Ordem de Serviço**
- Criar, monitorar e gerenciar o status das ordens de serviço.

---

## 🌐 Deploy

O deploy pode ser realizado utilizando a plataforma [Vercel](https://vercel.com/):

1. Conecte o repositório ao Vercel.
2. Adicione as variáveis de ambiente necessárias.
3. Realize o deploy com um clique.

---

## 👥 Contribuições

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Realize um fork do repositório.
2. Crie uma branch para sua feature:

```bash
git checkout -b feature/nova-feature
```

3. Commit suas alterações:

```bash
git commit -m 'Adiciona nova feature'
```

4. Envie para a branch remota:

```bash
git push origin feature/nova-feature
```

5. Abra um Pull Request.

---

## 📝 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📢 Contato

Caso tenha dúvidas ou sugestões, entre em contato:

- **Email**: erivandoeey@gmail.com
- **LinkedIn**: [seu-linkedin](https://linkedin.com/in/erivando-n-2a6b1a307)
- **GitHub**: [seu-usuario](https://github.com/erivandoeey)
