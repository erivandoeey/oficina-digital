import OrdemDeServico from '../../models/OrdemDeServico';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { descricao, status, clienteId, equipamentoId, funcionarioId } = req.body;

    // Validação básica dos dados recebidos
    if (!descricao || !status || !clienteId || !equipamentoId || !funcionarioId) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const novaOrdem = await OrdemDeServico.adicionar({
        descricao,
        status,
        clienteId: parseInt(clienteId, 10),
        equipamentoId: parseInt(equipamentoId, 10),
        funcionarioId: parseInt(funcionarioId, 10),
      });

      return res.status(201).json(novaOrdem);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    try {
      const ordensDeServico = await OrdemDeServico.listarComDetalhes(); // Inclui os detalhes de cliente, equipamento e funcionário
      return res.status(200).json(ordensDeServico);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
