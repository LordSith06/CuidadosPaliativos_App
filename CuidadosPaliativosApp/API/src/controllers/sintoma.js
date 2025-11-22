const express = require('express');
const cors = require('cors');
const pool = require("../db/mysqlConnect");
const jwt = require('jsonwebtoken');

const app = express();

// Configurações
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


app.get('/sintoma', auth, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM sintoma ORDER BY data DESC;');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar sintomas:', error);
    res.status(500).json({ error: true, message: 'Erro ao buscar sintomas' });
  }
});

app.post('/sintoma', auth, async (req, res) => {
  try {
    const { pacienteId, acao } = req.body;

    if (!pacienteId || !acao) {
      return res.status(400).json({ error: true, message: 'pacienteId e acao são obrigatórios!' });
    }

    const sql = `
      INSERT INTO sintoma (pacienteId, acao, data)
      VALUES (?, ?, NOW())
    `;

    const [result] = await pool.execute(sql, [pacienteId, acao]);

    res.status(201).json({
      error: false,
      message: 'Registro criado com sucesso!',
      id: result.insertId
    });

  } catch (error) {
    console.error('Erro ao inserir sintoma:', error);
    res.status(500).json({ error: true, message: 'Erro interno ao criar registro!' });
  }
});

app.get('/sintoma/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute('SELECT * FROM sintoma WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: true, message: 'Registro não encontrado!' });
    }

    res.status(200).json(rows[0]);

  } catch (error) {
    console.error('Erro ao buscar sintoma:', error);
    res.status(500).json({ error: true, message: 'Erro ao buscar sintoma!' });
  }
});


app.put('/sintoma/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { pacienteId, acao } = req.body;

    if (!pacienteId || !acao) {
      return res.status(400).json({ error: true, message: 'pacienteId e acao são obrigatórios!' });
    }

    const sql = `
      UPDATE sintoma
      SET pacienteId = ?, acao = ?, data = NOW()
      WHERE id = ?
    `;

    const [result] = await pool.execute(sql, [pacienteId, acao, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: true, message: 'Registro não encontrado!' });
    }

    res.status(200).json({ error: false, message: 'Registro atualizado com sucesso!' });

  } catch (error) {
    console.error('Erro ao atualizar sintoma:', error);
    res.status(500).json({ error: true, message: 'Erro ao atualizar registro!' });
  }
});

app.delete('/sintoma/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute('DELETE FROM sintoma WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: true, message: 'Registro não encontrado!' });
    }

    res.status(200).json({ error: false, message: 'Registro removido com sucesso!' });

  } catch (error) {
    console.error('Erro ao remover sintoma:', error);
    res.status(500).json({ error: true, message: 'Erro ao remover registro!' });
  }
});


// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
