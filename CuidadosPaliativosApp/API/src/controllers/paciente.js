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
    const { nome, cpf, senha, medico_responsavel, diagnostico, dataNascimento } = req.body;

    if (!nome || !cpf || !senha || !medico_responsavel || !diagnostico || !dataNascimento)
      return res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios!' });

    const [result] = await pool.execute(
      'INSERT INTO paciente (nome, cpf, senha, medico_responsavel, diagnostico, dataNascimento) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, cpf, senha , medico_responsavel, diagnostico, dataNascimento]
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
app.put('/atualizarpaciente/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, medico_responsavel, diagnostico, dataNascimento } = req.body;

    // Validação sem a senha
    if (!nome || !cpf || !medico_responsavel || !diagnostico || !dataNascimento)
      return res.status(400).json({ error: true, message: 'Informe todos os campos' });

    const [result] = await pool.execute(
      'UPDATE paciente SET nome = ?, cpf = ?, medico_responsavel = ?, diagnostico = ?, dataNascimento = ? WHERE id = ?',
      [nome, cpf, medico_responsavel, diagnostico, dataNascimento, id]
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
      console.log("REQ.BODY:", req.body);
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

app.get('/medicamentos', auth, async (req, res) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM medicamento;');
      res.status(200).json({ error: false, medicamentos: rows });
    } catch (error) {
      console.error('Erro ao buscar medicamentos:', error);
      res.status(500).json({ error: true, message: 'Erro ao buscar medicamentos' });
    }
  });


  
  // GET – listar medicamentos de um paciente
  app.get('/pacientes/:id/medicamentos', auth, async (req, res) => {
    try {
      const { id } = req.params;

      const [rows] = await pool.execute(
        'SELECT * FROM medicamento WHERE pacienteId = ?',
        [id]
      );

      res.status(200).json({ error: false, medicamentos: rows });
    } catch (error) {
      console.error('Erro ao buscar medicamentos do paciente:', error);
      res.status(500).json({ error: true, message: 'Erro ao buscar medicamentos do paciente' });
    }
  });


 
  // POST – adicionar medicamento ao paciente
  app.post('/medicamentos', auth, async (req, res) => {
    try {
      const { nome, miligramagem, descricao, pacienteId } = req.body;

      if (!nome || !miligramagem || !descricao || !pacienteId)
        return res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios!' });

      const [result] = await pool.execute(
        'INSERT INTO medicamento (nome, miligramagem, descricao, pacienteId) VALUES (?, ?, ?, ?)',
        [nome, miligramagem, descricao, pacienteId]
      );

      res.status(201).json({
        error: false,
        message: 'Medicamento cadastrado com sucesso!'
      });

    } catch (error) {
      console.error('Erro ao inserir medicamento:', error);
      res.status(500).json({ error: true, message: 'Erro interno ao criar medicamento!' });
    }
  });


 
  // GET – buscar medicamento por ID
  app.get('/medicamentos/:id', auth, async (req, res) => {
    try {
      const { id } = req.params;

      const [rows] = await pool.execute(
        'SELECT * FROM medicamento WHERE id = ?',
        [id]
      );

      if (rows.length === 0)
        return res.status(404).json({ error: true, message: 'Medicamento não encontrado!' });

      res.status(200).json({ error: false, medicamento: rows[0] });

    } catch (error) {
      console.error('Erro ao buscar medicamento:', error);
      res.status(500).json({ error: true, message: 'Erro ao buscar medicamento!' });
    }
  });


  // PUT – atualizar medicamento
  app.put('/medicamentos/:id', auth, async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, miligramagem, descricao, pacienteId } = req.body;

      if (!nome || !miligramagem || !descricao || !pacienteId)
        return res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios!' });

      const [result] = await pool.execute(
        'UPDATE medicamento SET nome = ?, miligramagem = ?, descricao = ?, pacienteId = ? WHERE id = ?',
        [nome, miligramagem, descricao, pacienteId, id]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ error: true, message: 'Medicamento não encontrado!' });

      res.status(200).json({
        error: false,
        message: 'Medicamento atualizado com sucesso!'
      });

    } catch (error) {
      console.error('Erro ao atualizar medicamento:', error);
      res.status(500).json({ error: true, message: 'Erro ao atualizar medicamento!' });
    }
  });

  app.delete('/medicamentos/:id', auth, async (req, res) => {
    try {
      const { id } = req.params;

      const [result] = await pool.execute(
        'DELETE FROM medicamento WHERE id = ?',
        [id]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ error: true, message: 'Medicamento não encontrado!' });

      res.status(200).json({ error: false, message: 'Medicamento removido com sucesso!' });

    } catch (error) {
      console.error('Erro ao remover medicamento:', error);
      res.status(500).json({ error: true, message: 'Erro ao remover medicamento!' });
    }
  });

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


const PORT = 3000;
app.listen(PORT, ()=> console.log(`Servidor rodando na porta ${PORT}`));
