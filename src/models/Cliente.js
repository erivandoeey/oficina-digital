import prisma from '../lib/prisma';

class Cliente {
  constructor(nome, email, telefone) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }

  static async adicionar(cliente) {
    return await prisma.cliente.create({ data: cliente });
  }

  static async atualizar(id, dados) {
    return await prisma.cliente.update({ where: { id }, data: dados });
  }

  static async deletar(id) {
    return await prisma.cliente.delete({ where: { id } });
  }

  static async listar() {
    return await prisma.cliente.findMany();
  }
}

export default Cliente;
