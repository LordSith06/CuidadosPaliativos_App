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


// Listar todos
app.get('/avaliacao', auth, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM avaliacao;');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    res.status(500).json({ error: true, message: 'Erro ao buscar avaliações' });
  }
});

// Criar atendimento
app.post('/avaliacao', auth, async (req, res) => {
  try {
    const {data, nota, descricao, pacienteId} = req.body;

    if (!data || !nota || !descricao || !pacienteId) {
      return res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios!' });
    }

    const [result] = await pool.execute(
      'INSERT INTO avaliacao (data, nota, descricao, pacienteId) VALUES (?, ?, ?, ?)',
      [data, nota, descricao, pacienteId]
    );

    res.status(201).json({
      error: false,
      message: 'Avaliação enviada com sucesso!',
      id: result.insertId
    });

  } catch (error) {
    console.error('Erro ao enviar avaliação:', error);
    res.status(500).json({ error: true, message: 'Erro interno ao criar avaliação!' });
  }
});

// Buscar por ID
app.get('/avaliacao/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute('SELECT * FROM avaliacao WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: true, message: 'Avaliação não encontrado!' });
    }

    res.status(200).json(rows[0]);

  } catch (error) {
    console.error('Erro ao buscar avaliação:', error);
    res.status(400).json({ error: true, message: 'Erro ao buscar avaliação!' });
  }
});

// Atualizar atendimento
app.put('/avaliacao/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { data, nota, descricao, pacienteId } = req.body;

    if (!data || !nota || !descricao || !pacienteId) {
      return res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios!' });
    }

    const [result] = await pool.execute(
      'UPDATE avaliacao SET data = ?, nota = ?, descricao = ?, pacienteId = ? WHERE id = ?',
      [data, nota, descricao, pacienteId, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: true, message: 'Avaliação não encontrado!' });
    }

    res.status(200).json({ error: false, message: 'Avaliação atualizado com sucesso!' });

  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error);
    res.status(400).json({ error: true, message: 'Erro ao atualizar avaliação!' });
  }
});

// Deletar atendimento
app.delete('/avaliacao/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute('DELETE FROM avaliacao WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: true, message: 'Avaliacao não encontrado!' });
    }

    res.status(200).json({ error: false, message: 'Avaliacao removido com sucesso!' });

  } catch (error) {
    console.error('Erro ao remover avaliacao:', error);
    res.status(500).json({ error: true, message: 'Erro ao remover avaliacao!' });
  }
});


// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
