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
const JWT_SECRET = 'segredo';


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


// Listar todos os relacionamentos
app.get('/paciente-medicamento', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT pm.*, p.nome AS nome_paciente, m.nome AS nome_medicamento
      FROM paciente_medicamento pm
      JOIN paciente p ON pm.paciente_id = p.id
      JOIN medicamento m ON pm.medicamento_id = m.id
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Erro ao buscar relacionamentos' });
  }
});

// Adicionar relacionamento (associar paciente a medicamento)
app.post('/paciente-medicamento', async (req, res) => {
  try {
    const { paciente_id, medicamento_id, data_inicio, dosagem } = req.body;

    if (!paciente_id || !medicamento_id) {
      return res.status(400).json({ error: true, message: 'paciente_id e medicamento_id são obrigatórios' });
    }

    const [result] = await pool.execute(`
      INSERT INTO paciente_medicamento (paciente_id, medicamento_id, data_inicio, dosagem)
      VALUES (?, ?, ?, ?)
    `, [paciente_id, medicamento_id, data_inicio || null, dosagem || null]);

    if (result.affectedRows > 0) {
      res.status(201).json({ error: false, message: 'Relacionamento criado com sucesso!' });
    } else {
      res.status(400).json({ error: true, message: 'Erro ao criar relacionamento' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Erro interno ao criar relacionamento' });
  }
});

// Buscar um relacionamento específico (por paciente_id e medicamento_id)
app.get('/paciente-medicamento/:paciente_id/:medicamento_id', async (req, res) => {
  try {
    const { paciente_id, medicamento_id } = req.params;
    const [rows] = await pool.execute(`
      SELECT * FROM paciente_medicamento WHERE paciente_id = ? AND medicamento_id = ?
    `, [paciente_id, medicamento_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: true, message: 'Relacionamento não encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Erro ao buscar relacionamento' });
  }
});

// Atualizar relacionamento (exemplo para dosagem e data_inicio)
app.put('/paciente-medicamento/:paciente_id/:medicamento_id', async (req, res) => {
  try {
    const { paciente_id, medicamento_id } = req.params;
    const { data_inicio, dosagem } = req.body;

    const [result] = await pool.execute(`
      UPDATE paciente_medicamento SET data_inicio = ?, dosagem = ?
      WHERE paciente_id = ? AND medicamento_id = ?
    `, [data_inicio, dosagem, paciente_id, medicamento_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: true, message: 'Relacionamento não encontrado' });
    }

    res.json({ error: false, message: 'Relacionamento atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Erro ao atualizar relacionamento' });
  }
});

// Remover relacionamento
app.delete('/paciente-medicamento/:paciente_id/:medicamento_id', async (req, res) => {
  try {
    const { paciente_id, medicamento_id } = req.params;

    const [result] = await pool.execute(`
      DELETE FROM paciente_medicamento WHERE paciente_id = ? AND medicamento_id = ?
    `, [paciente_id, medicamento_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: true, message: 'Relacionamento não encontrado' });
    }

    res.json({ error: false, message: 'Relacionamento removido com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Erro ao remover relacionamento' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
