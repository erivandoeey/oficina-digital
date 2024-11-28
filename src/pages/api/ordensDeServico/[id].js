
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  const ordemId = parseInt(id, 10);
  if (isNaN(ordemId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  if (req.method === 'PUT') {
    try {
      // Dados recebidos no corpo da requisição
      const { descricao, status, clienteId, equipamentoId, funcionarioId } = req.body;

      // Verificar se a ordem de serviço existe
      const ordemDeServico = await prisma.ordemDeServico.findUnique({
        where: { id: ordemId },
      });

      if (!ordemDeServico) {
        return res.status(404).json({ message: 'Ordem de Serviço não encontrada' });
      }

      // Atualizar a ordem de serviço
      const ordemAtualizada = await prisma.ordemDeServico.update({
        where: { id: ordemId },
        data: {
          descricao,
          status,
          clienteId,
          equipamentoId,
          funcionarioId,
        },
      });

      return res.status(200).json(ordemAtualizada);
    } catch (error) {
      console.error('Erro ao atualizar ordem de serviço:', error);
      return res.status(500).json({ error: 'Erro ao atualizar a ordem de serviço' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Verificar se a ordem de serviço existe
      const ordemDeServico = await prisma.ordemDeServico.findUnique({
        where: { id: ordemId },
      });

      if (!ordemDeServico) {
        return res.status(404).json({ message: 'Ordem de Serviço não encontrada' });
      }

      // Excluir a ordem de serviço
      await prisma.ordemDeServico.delete({
        where: { id: ordemId },
      });

      return res.status(200).json({ message: 'Ordem de Serviço deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar ordem de serviço:', error);
      return res.status(500).json({ error: 'Erro ao deletar a ordem de serviço' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
