import Funcionario from '../../models/Funcionario';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, cargo, email } = req.body;
    const novoFuncionario = await Funcionario.adicionar({ nome, cargo, email });
    res.status(201).json(novoFuncionario);
  } else {
    const funcionarios = await Funcionario.listar();
    res.status(200).json(funcionarios);
  }
}
