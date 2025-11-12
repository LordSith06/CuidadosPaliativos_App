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
const JWT_SECRET = 'caiofera';


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


// Login de paciente
app.post('/login', async (req, res) => {
  try {
    const { cpf, senha } = req.body;

    if (!cpf || !senha) {
      return res.status(400).json({ error: true, message: 'CPF e senha são obrigatórios!' });
    }

    // Verifica se o paciente existe no banco
    const [rows] = await pool.execute(
      'SELECT * FROM paciente WHERE cpf = ? AND senha = ?',
      [cpf, senha]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: true, message: 'CPF ou senha incorretos!' });
    }

    const paciente = rows[0];

    // Gera o token JWT
    const token = jwt.sign(
      { id: paciente.id, nome: paciente.nome, cpf: paciente.cpf },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      error: false,
      message: 'Login realizado com sucesso!',
      token,
      paciente: {
        id: paciente.id,
        nome: paciente.nome,
        cpf: paciente.cpf
      }
    });

  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ error: true, message: 'Erro interno ao realizar login.' });
  }
});


//Listar todos os pacientes
app.get('/pacientes',auth, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM paciente;');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: true, message: 'Erro ao buscar pacientes' });
  }
});

//Adicionar Paciente
app.post('/adicionarpaciente', async (req, res) => {
  try {
    const { nome, cpf, senha, medicacao, medico_responsavel, diagnostico } = req.body;

    if (!nome || !cpf || !senha || !medico_responsavel || !medicacao || !diagnostico)
      return res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios!' });

    const [result] = await pool.execute(
      'INSERT INTO paciente (nome, cpf, senha, medicacao, medico_responsavel, diagnostico) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, cpf, senha, medicacao, medico_responsavel, diagnostico]
    );

    if (result.affectedRows > 0)
      res.status(201).json({ error: false, message: 'Paciente inserido com sucesso!' });
    else
      res.status(400).json({ error: true, message: 'Erro ao inserir paciente!'});
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    res.status(500).json({ error: true, message: 'Erro interno ao criar usuário!' });
  }
});

//buscar paciente pelo id
app.get('/pacientes/:id',auth, async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM paciente WHERE id = ?', [id]);

    if (rows.length === 0)
      return res.status(404).json({ error: true, message: 'Usuário não encontrado!' });

    res.status(200).json({ error: false, usuario: rows[0] });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(400).json({ error: true, message: 'Erro ao buscar usuário!' });
  }
});

//Atualizar paciente 
app.put('/atualizarpaciente/:id',auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, senha, medicacao, medico_responsavel, diagnostico } = req.body;

    if (!nome || !cpf || !senha || !medicacao || !medico_responsavel || !diagnostico)
      return res.status(400).json({ error: true, message: 'Informe todos os campos' });

    const [result] = await pool.execute(
      'UPDATE paciente SET nome = ?, cpf = ?, senha = ?, medicacao = ?, medico_responsavel = ?, diagnostico = ? WHERE id = ?',
      [nome, cpf, senha, medicacao, medico_responsavel, diagnostico, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: true, message: 'Paciente não encontrado!' });

    const [rows] = await pool.execute('SELECT * FROM paciente WHERE id = ?', [id]);

    res.status(202).json({ error: false, message: 'Paciente atualizado com sucesso!', usuario: rows[0] });
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    res.status(400).json({ error: true, message: 'Erro ao atualizar paciente!' });
  }
});

//Remover paciente
app.delete('/deletarpaciente/:id',auth, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute('DELETE FROM paciente WHERE id = ?', [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: true, message: 'Usuário não encontrado!' });

    res.status(200).json({ error: false, message: 'Usuário removido com sucesso!' });
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
    res.status(500).json({ error: true, message: 'Erro ao remover usuário!' });
  }
});


const PORT = 3000;
app.listen(PORT, ()=> console.log(`Servidor rodando na porta ${PORT}`));
