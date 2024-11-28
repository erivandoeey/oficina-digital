import Funcionario from '../../../models/Funcionario';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const dados = req.body;
    const funcionarioAtualizado = await Funcionario.atualizar(Number(id), dados);
    res.status(200).json(funcionarioAtualizado);
  } else if (req.method === 'DELETE') {
    await Funcionario.deletar(Number(id));
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
