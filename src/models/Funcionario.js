import prisma from '../lib/prisma';

class Funcionario {
  constructor(nome, cargo, email) {
    this.nome = nome;
    this.cargo = cargo;
    this.email = email;
  }

  static async adicionar(funcionario) {
    return await prisma.funcionario.create({ data: funcionario });
  }

  static async atualizar(id, dados) {
    return await prisma.funcionario.update({ where: { id }, data: dados });
  }

  static async deletar(id) {
    return await prisma.funcionario.delete({ where: { id } });
  }

  static async listar() {
    return await prisma.funcionario.findMany();
  }
}

export default Funcionario;

