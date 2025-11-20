const express = require('express');
const cors = require('cors');
const pool = require("../db/mysqlConnect");
const jwt = require('jsonwebtoken');

const app = express();

// Config
app.use(cors());
app.use(express.json());

// JWT Secret
const JWT_SECRET = 'brunofera';

// Middleware de Autenticação
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

// Health Check
app.get("/", (req, res) => {
  res.json({ status: "Ok" });
});


// =========================
// ROTAS DE ATENDIMENTOS
// =========================

// Listar todos
app.get('/atendimento', auth, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM atendimento;');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar atendimentos:', error);
    res.status(500).json({ error: true, message: 'Erro ao buscar atendimentos' });
  }
});

// Criar atendimento
app.post('/atendimento', auth, async (req, res) => {
  try {
    const { data, medico, descricao, pacienteId } = req.body;

    if (!data || !medico || !descricao || !pacienteId) {
      return res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios!' });
    }

    const [result] = await pool.execute(
      'INSERT INTO atendimento (data, medico, descricao, pacienteId) VALUES (?, ?, ?, ?)',
      [data, medico, descricao, pacienteId]
    );

    res.status(201).json({
      error: false,
      message: 'Atendimento cadastrado com sucesso!',
      id: result.insertId
    });

  } catch (error) {
    console.error('Erro ao inserir atendimento:', error);
    res.status(500).json({ error: true, message: 'Erro interno ao criar atendimento!' });
  }
});

// Buscar por ID
app.get('/atendimento/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute('SELECT * FROM atendimento WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: true, message: 'Atendimento não encontrado!' });
    }

    res.status(200).json(rows[0]);

  } catch (error) {
    console.error('Erro ao buscar atendimento:', error);
    res.status(400).json({ error: true, message: 'Erro ao buscar atendimento!' });
  }
});

// Atualizar atendimento
app.put('/atendimento/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { data, medico, descricao, pacienteId } = req.body;

    if (!data || !medico || !descricao || !pacienteId) {
      return res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios!' });
    }

    const [result] = await pool.execute(
      'UPDATE atendimento SET data = ?, medico = ?, descricao = ?, pacienteId = ? WHERE id = ?',
      [data, medico, descricao, pacienteId, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: true, message: 'Atendimento não encontrado!' });
    }

    res.status(200).json({ error: false, message: 'Atendimento atualizado com sucesso!' });

  } catch (error) {
    console.error('Erro ao atualizar atendimento:', error);
    res.status(400).json({ error: true, message: 'Erro ao atualizar atendimento!' });
  }
});

// Deletar atendimento
app.delete('/atendimento/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute('DELETE FROM atendimento WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: true, message: 'Atendimento não encontrado!' });
    }

    res.status(200).json({ error: false, message: 'Atendimento removido com sucesso!' });

  } catch (error) {
    console.error('Erro ao remover atendimento:', error);
    res.status(500).json({ error: true, message: 'Erro ao remover atendimento!' });
  }
});


// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
