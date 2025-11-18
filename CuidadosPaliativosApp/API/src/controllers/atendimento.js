const express = require('express');
const cors = require('cors');
const pool = require("../db/mysqlConnect");
const jwt = require('jsonwebtoken');

// 2. Inicializa o aplicativo Express
const app = express();

//Configurando o CORS como middleware nas requisiçoes
app.use(cors());

//Configurar o Express para receber JSON nas requisições
app.use(express.json());


//Rota de saúde da aplicação (health check)
app.get('/', async (req, res) => {
    res.json({status: "Ok"})
})


//AUtENTICAÇÃO
const JWT_SECRET = 'brunofera';


//Criando um middleware para interceptar as rotas
function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: true, message: "Token não informado" });
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    console.error("Erro ao validar token:", error);
    res.status(401).json({ error: true, message: "Token inválido ou expirado" });
  }
}

//Listar todos os atendimentos
app.get('/atendimentos',auth, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM atendimento;');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar atendimentos:', error);
    res.status(500).json({ error: true, message: 'Erro ao buscar pacientes' });
  }
});

//Adicionar atendimento
app.post('/adicionaratendimento', async (req, res) => {
  try {
    const { data , medico, descricao, pacienteId } = req.body;

    if (!data || !medico || !descricao || !pacienteId)
      return res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios!' });

    const [result] = await pool.execute(
      'INSERT INTO atendimento (data , medico, descricao, pacienteId) VALUES (?, ?, ?, ?)',
      [data , medico, descricao, pacienteId]
    );

    if (result.affectedRows > 0)
      res.status(201).json({ error: false, message: 'Atendimento cadastrado com sucesso!' });
    else
      res.status(400).json({ error: true, message: 'Erro ao cadastrar atendimento!'});
  } catch (error) {
    console.error('Erro ao inserir atendimento:', error);
    res.status(500).json({ error: true, message: 'Erro interno ao criar atendimento!' });
  }
});

//buscar atendimento pelo id
app.get('/atendimentos/:id',auth, async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM atendimento WHERE id = ?', [id]);

    if (rows.length === 0)
      return res.status(404).json({ error: true, message: 'Atendimento não encontrado!' });

    res.status(200).json({ error: false, atendimento: rows[0] });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(400).json({ error: true, message: 'Erro ao buscar usuário!' });
  }
});

//Atualizar atendimento
app.put('/atualizaratendimento/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { data, medico, descricao, pacienteId } = req.body;

    if (!data || !medico || !descricao || !pacienteId)
      return res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios!' });

    const [result] = await pool.execute(
      'UPDATE atendimento SET data = ?, medico = ?, descricao = ?, pacienteId = ? WHERE id = ?',
      [data, medico, descricao, pacienteId, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: true, message: 'Atendimento não encontrado!' });

    const [rows] = await pool.execute('SELECT * FROM atendimento WHERE id = ?', [id]);

    res.status(202).json({ error: false, message: 'Atendimento atualizado com sucesso!', atendimento: rows[0] });
  } catch (error) {
    console.error('Erro ao atualizar atendimento:', error);
    res.status(400).json({ error: true, message: 'Erro ao atualizar atendimento!' });
  }
});


//Remover atendimento
app.delete('/deletaratendimento/:id',auth, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute('DELETE FROM atendimento WHERE id = ?', [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: true, message: 'Atendimento não encontrado!' });

    res.status(200).json({ error: false, message: 'Atendimento removido com sucesso!' });
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
    res.status(500).json({ error: true, message: 'Erro ao remover usuário!' });
  }
});


const PORT = 3000;
app.listen(PORT, ()=> console.log(`Servidor rodando na porta ${PORT}`));
