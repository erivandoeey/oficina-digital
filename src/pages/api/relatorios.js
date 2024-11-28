// /meu-projeto-oo/src/pages/api/relatorios.js

import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Consulta os dados necessários para o relatório
      const clientes = await prisma.cliente.findMany();
      const ordensDeServico = await prisma.ordemDeServico.findMany();
      const equipamentos = await prisma.equipamento.findMany();
      const funcionarios = await prisma.funcionario.findMany();

      // Estrutura o relatório (dados simulados para visualização)
      const relatorio = {
        totalClientes: clientes.length,
        totalOrdens: ordensDeServico.length,
        totalEquipamentos: equipamentos.length,
        totalFuncionarios: funcionarios.length,
        resumo: {

          ordensPendentes: ordensDeServico.filter(ordem => ordem.status === 'PENDENTE').length,
          ordensEmProgresso: ordensDeServico.filter(ordem => ordem.status === 'EM_PROGRESSO').length,
          ordensConcluidas: ordensDeServico.filter(ordem => ordem.status === 'CONCLUIDA').length,
          ordensCanceladas: ordensDeServico.filter(ordem => ordem.status === 'CANCELADA').length,
        },
      };

      res.status(200).json(relatorio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao gerar o relatório' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
