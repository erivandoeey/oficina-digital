import Equipamento from '../../../models/Equipamento';

export default async function handler(req, res) {
  const { id } = req.query; // Obtém o id da query

  if (req.method === 'PUT') {
    const dados = req.body;

    try {
      // Verifica se os dados contêm clienteId para associar o equipamento ao cliente
      const equipamentoAtualizado = await Equipamento.atualizar(Number(id), {
        nome: dados.nome,
        marca: dados.marca,
        modelo: dados.modelo,
        clienteId: dados.clienteId ? parseInt(dados.clienteId, 10) : null, // Associa cliente se fornecido
      });

      res.status(200).json(equipamentoAtualizado); // Retorna o equipamento atualizado
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar o equipamento', error });
    }

  } else if (req.method === 'DELETE') {
    try {
      await Equipamento.deletar(Number(id)); // Deleta o equipamento
      res.status(204).end(); // Retorna status 204 (No Content) para sucesso na exclusão
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar o equipamento', error });
    }

  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']); // Define os métodos permitidos
    res.status(405).end(`Method ${req.method} Not Allowed`); // Responde com erro 405 para métodos não permitidos
  }
}
