import prisma from '../lib/prisma';

class Equipamento {
  constructor(nome, marca, modelo, clienteId) {
    this.nome = nome;
    this.marca = marca;
    this.modelo = modelo;
    this.clienteId = clienteId; // Inclui o clienteId
  }

  // Adicionar novo equipamento
  static async adicionar(equipamento) {
    return await prisma.equipamento.create({
      data: {
        nome: equipamento.nome,
        marca: equipamento.marca,
        modelo: equipamento.modelo,
        clienteId: equipamento.clienteId ? parseInt(equipamento.clienteId, 10) : null, // Associa cliente se fornecido
      },
    });
  }

  // Atualizar um equipamento existente
  static async atualizar(id, dados) {
    return await prisma.equipamento.update({
      where: { id: parseInt(id, 10) }, // Converte id para número
      data: {
        nome: dados.nome,
        marca: dados.marca,
        modelo: dados.modelo,
        clienteId: dados.clienteId ? parseInt(dados.clienteId, 10) : null, // Atualiza associação com cliente
      },
    });
  }

  // Deletar um equipamento
  static async deletar(id) {
    return await prisma.equipamento.delete({
      where: { id: parseInt(id, 10) }, // Converte id para número
    });
  }

  // Listar todos os equipamentos com seus respectivos clientes
  static async listar() {
    return await prisma.equipamento.findMany({
      include: {
        cliente: true, // Incluir o cliente associado ao listar equipamentos
      },
    });
  }

  // Listar equipamentos filtrados por cliente
  static async listarPorCliente(clienteId) {
    return await prisma.equipamento.findMany({
      where: {
        clienteId: parseInt(clienteId, 10), // Filtra pelo clienteId
      },
      include: {
        cliente: true, // Incluir o cliente associado ao listar equipamentos
      },
    });
  }
}

export default Equipamento;
