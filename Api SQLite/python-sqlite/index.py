from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

def getDB():
  return sqlite3.connect("database.db")

getDB().cursor().execute('''CREATE TABLE IF NOT EXISTS ALUNO(ID  INTEGER PRIMARY KEY AUTOINCREMENT, NOME TEXT NOT NULL, EMAIL TEXT NOT NULL, CPF TEXT NOT NULL, CELULAR TEXT NOT NULL)''')

@app.route("/select-aluno", methods=['GET'])
def select():
  try:
    conn = getDB().cursor()
    conn.execute("SELECT * FROM ALUNO")
    return jsonify(conn.fetchall()), 200
  except:
    return jsonify({ "message": "Erro ao buscar clientes!" }), 400

@app.route("/insert-aluno", methods=['POST'])
def insert():
  data = request.get_json()
  try:
    conn = getDB()
    conn.cursor().execute("INSERT INTO ALUNO(nome, email, cpf, celular) VALUES(?, ?, ?, ?)", [data['nome'], data['email'], data['cpf'], data['celular']])
    conn.commit()
    return jsonify({ "message": "Aluno salvo com sucesso!" }), 200
  except:
    return jsonify({ "message": "Erro ao salvar cliente!" }), 400

@app.route("/update-aluno/<id>", methods=['PUT'])
def update(id):
  data = request.get_json()
  try:
    conn = getDB()
    conn.cursor().execute("UPDATE ALUNO SET email = ? WHERE id = ?", [data['email'], int(id)])
    conn.commit()
    return jsonify({ "message": "Aluno atualizado com sucesso!" }), 200
  except:
    return jsonify({ "message": "Erro ao atualizar cliente!" }), 400

@app.route("/delete-aluno/<id>", methods=['DELETE'])
def delete(id):
  try:
    conn = getDB()
    conn.cursor().execute("DELETE FROM ALUNO WHERE id = ?", [int(id)])
    conn.commit()
    return jsonify({ "message": "Aluno excluido com sucesso!" }), 200
  except:
    return jsonify({ "message": "Erro ao excluir cliente!" }), 400

app.run(port = 3000)