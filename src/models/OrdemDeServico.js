import prisma from '../lib/prisma';

class OrdemDeServico {
  constructor(descricao, status, clienteId, equipamentoId, funcionarioId) {
    this.descricao = descricao;
    this.status = status;
    this.clienteId = clienteId;
    this.equipamentoId = equipamentoId;
    this.funcionarioId = funcionarioId;
  }

  static async listar() {
    return prisma.ordemDeServico.findMany();
  }

  static async listarComDetalhes() {
    return prisma.ordemDeServico.findMany({
      include: {
        cliente: true,
        equipamento: true,
        funcionario: true,
      },
    });
  }

  static async adicionar(ordemDeServico) {
    return prisma.ordemDeServico.create({
      data: ordemDeServico,
    });
  }

  static async atualizar(id, dados) {
    console.log("Atualizando Ordem de Serviço com ID:", id, "e dados:", dados);
    const ordemExistente = await prisma.ordemDeServico.findUnique({
      where: { id },
    });

    if (!ordemExistente) {
      throw new Error(`Ordem de Serviço com ID ${id} não encontrada`);
    }

    return prisma.ordemDeServico.update({
      where: { id },
      data: dados,
    });
  }

  static async deletar(id) {
    console.log("Deletando Ordem de Serviço com ID:", id);
    const ordemExistente = await prisma.ordemDeServico.findUnique({
      where: { id },
    });

    if (!ordemExistente) {
      throw new Error(`Ordem de Serviço com ID ${id} não encontrada`);
    }

    return prisma.ordemDeServico.delete({
      where: { id },
    });
  }
}

export default OrdemDeServico;
