import Equipamento from '../../models/Equipamento';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, marca, modelo, clienteId } = req.body;

    try {
      // Verifica se o clienteId foi fornecido e associa o equipamento ao cliente, ou deixa null se não for fornecido
      const novoEquipamento = await Equipamento.adicionar({
        nome,
        marca,
        modelo,
        clienteId: clienteId ? parseInt(clienteId, 10) : null, // Associa cliente se fornecido
      });

      res.status(201).json(novoEquipamento); // Retorna o novo equipamento criado com status 201
    } catch (error) {
      console.error('Erro ao criar equipamento:', error);
      res.status(500).json({ error: 'Erro ao criar equipamento.' }); // Tratamento de erro ao criar equipamento
    }
  } else if (req.method === 'GET') {
    try {
      const equipamentos = await Equipamento.listar(); // Lista todos os equipamentos, incluindo o cliente associado
      res.status(200).json(equipamentos); // Retorna a lista de equipamentos com status 200
    } catch (error) {
      console.error('Erro ao listar equipamentos:', error);
      res.status(500).json({ error: 'Erro ao listar equipamentos.' }); // Tratamento de erro ao listar equipamentos
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']); // Define os métodos permitidos
    res.status(405).end(`Method ${req.method} Not Allowed`); // Retorna erro 405 para métodos não permitidos
  }
}
