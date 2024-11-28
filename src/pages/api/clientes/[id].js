import Cliente from '../../../models/Cliente';


export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const dados = req.body;
    const clienteAtualizado = await Cliente.atualizar(Number(id), dados);
    res.status(200).json(clienteAtualizado);
  } else if (req.method === 'DELETE') {
    await Cliente.deletar(Number(id));
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


