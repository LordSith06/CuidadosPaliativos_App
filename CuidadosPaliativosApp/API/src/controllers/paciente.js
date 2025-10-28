const express = require('express');
const cors = require('cors');
const pool = require("../db/mysqlConnect");

// 2. Inicializa o aplicativo Express
const app = express();

//Midlewares básicos
app.use(cors());
app.use(express.json()); //Permite que recebemos JSON nas requisições

app.get('/', async (req, res) => {
    res.json({status: "Ok"})
})


//Listar todos os pacientes
app.get('/pacientes', async (req, res) => {
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
app.get('/pacientes/:id', async (req, res) => {
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
app.put('/atualizarpaciente/:id', async (req, res) => {
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
app.delete('/deletarpaciente/:id', async (req, res) => {
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












app.get("/getcars", async (req, res)=>{
    try{
        const[rows] = await pool.execute('SELECT * FROM carro'); 
        res.status(202).json(rows);
    }catch(error){
        console.log("Erro ao realizar consulta", error);
    }
})

app.post("/insertcar", async (req, res)=>{
    try{
        const { pmarca, pmodelo} = req.body; // <-- Pega os dados JSON
        
        if(!pmarca || pmodelo == null){
            return res.status(400).json({error: true, message: "Marca ou modelo não foi encontrado"})
        }

        const [result] = await pool.execute(
            'INSERT INTO carro(marca, modelo) VALUES(?, ?)', 
            [pmarca, pmodelo]
        );

        console.log(result);

        if(result.affectedRows > 0){
            res.status(201).json({error: false, message: "Carro inserido"})
        }else{
            res.status(400).json({error: true, message: "Carro não inserido"})
        }
    
    }catch(error){
        console.error("Erro ao inserir", error);
    }
})


const PORT = 3000;
app.listen(PORT, ()=> console.log(`Servidor rodando na porta ${PORT}`));
