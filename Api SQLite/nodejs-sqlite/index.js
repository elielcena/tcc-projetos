const express = require("express");
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./database.db");
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS ALUNO(ID  INTEGER PRIMARY KEY AUTOINCREMENT, NOME TEXT NOT NULL, EMAIL TEXT NOT NULL, CPF TEXT NOT NULL, CELULAR TEXT NOT NULL);"
  );
});

const app = express();

app.use(express.json());

app.get("/select-aluno", (request, response) => {
  try {
    db.all("SELECT * FROM ALUNO", (error, res) => {
      return response.json(res);
    });
  } catch (err) {
    return res.status(400).json({ message: "Erro ao buscar clientes!" });
  }
});

app.post("/insert-aluno", (request, response) => {
  const { nome, email, cpf, celular } = request.body;
  try {
    db.run(`INSERT INTO ALUNO(nome, email, cpf, celular) VALUES(?, ?, ?, ?)`, [nome, email, cpf, celular]);
    return response.json({ message: "Aluno salvo com sucesso!" });
  } catch (err) {
    return res.status(400).json({ message: "Erro ao buscar clientes!" });
  }
});

app.put("/update-aluno/:id", (request, response) => {
  const { id } = request.params;
  const { email } = request.body;
  try {
    db.run(`UPDATE ALUNO SET email = ? WHERE id = ?`, [email, id]);
    return response.json({ message: "Aluno atualizado com sucesso!" });
  } catch (err) {
    return res.status(400).json({ message: "Erro ao atualizar clientes!" });
  }
});

app.delete("/delete-aluno/:id", (request, response) => {
  const { id } = request.params;
  try {
    db.run(`DELETE FROM ALUNO WHERE id = ?`, [id]);
    return response.json({ message: "Aluno excluido com sucesso!" });
  } catch (err) {
    return res.status(400).json({ message: "Erro ao excluir clientes!" });
  }
});

app.listen(3000);