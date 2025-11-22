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

//Listar todos os medicamentos
app.get('/medicamentos',auth, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM medicamento;');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar medicamentos:', error);
    res.status(500).json({ error: true, message: 'Erro ao buscar medicamento' });
  }
});

//Adicionar medicamento
app.post('/adicionarmedicamento', async (req, res) => {
  try {
    const { nome, miligramagem, descricao } = req.body;

    if (!nome || !miligramagem || !descricao)
      return res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios!' });

    const [result] = await pool.execute(
      'INSERT INTO medicamento (nome , miligramagem, descricao) VALUES (?, ?, ?)',
      [ nome, miligramagem, descricao]
    );

    if (result.affectedRows > 0)
      res.status(201).json({ error: false, message: 'Medicamento cadastrado com sucesso!' });
    else
      res.status(400).json({ error: true, message: 'Erro ao cadastrar medicamento!'});
  } catch (error) {
    console.error('Erro ao inserir medicamento:', error);
    res.status(500).json({ error: true, message: 'Erro interno ao criar medicamento!' });
  }
});

//buscar medicamento pelo id
app.get('/medicamentos/:id',auth, async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM medicamento WHERE id = ?', [id]);

    if (rows.length === 0)
      return res.status(404).json({ error: true, message: 'Medicamento não encontrado!' });

    res.status(200).json({ error: false, medicamento: rows[0] });
  } catch (error) {
    console.error('Erro ao buscar medicamento:', error);
    res.status(400).json({ error: true, message: 'Erro ao buscar medicamento!' });
  }
});

//Atualizar medicamento
app.put('/atualizarmedicamentos/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, miligramagem, descricao } = req.body;

    if (!nome || !miligramagem || !descricao)
      return res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios!' });

    const [result] = await pool.execute(
      'UPDATE medicamento SET nome = ?, miligramagem = ?, descricao = ? WHERE id = ?',
      [nome, miligramagem, descricao, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: true, message: 'Medicamento não encontrado!' });

    const [rows] = await pool.execute('SELECT * FROM medicamento WHERE id = ?', [id]);

    return res.status(200).json({
      error: false,
      message: 'Medicamento atualizado com sucesso!',
      medicamento: rows[0]
    });

  } catch (error) {
    console.error('Erro ao atualizar medicamento:', error);
    res.status(500).json({ error: true, message: 'Erro ao atualizar medicamento!' });
  }
});



//Remover medicamento
app.delete('/deletarmedicamento/:id',auth, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute('DELETE FROM medicamento WHERE id = ?', [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: true, message: 'Medicamento não encontrado!' });

    res.status(200).json({ error: false, message: 'Medicamento removido com sucesso!' });
  } catch (error) {
    console.error('Erro ao remover medicamento:', error);
    res.status(500).json({ error: true, message: 'Erro ao remover medicamento!' });
  }
});


const PORT = 3000;
app.listen(PORT, ()=> console.log(`Servidor rodando na porta ${PORT}`));
