import Cliente from '../../models/Cliente';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, email, telefone } = req.body;
    const novoCliente = await Cliente.adicionar({ nome, email, telefone });
    res.status(201).json(novoCliente);
  } else {
    const clientes = await Cliente.listar();
    res.status(200).json(clientes);
  }
}
