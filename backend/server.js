const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

//!MIDDLEWARES

app.use(cors());
app.use(express.json());

//?BANCO DE DASDOS FAKE POR ENQUANTO

const usuarios = [
  {
    email: "funcionario@email.com",
    senha: "1234",
    tipo: "funcionario",
  },
  {
    email: "gerente@email.com",
    senha: "1234",
    tipo: "gerente",
  },
];

//!ROTA DE LOGIN

app.post("/api/login", (req, res) => {
  const { email, senha, tipo } = req.body;

  const usuario = usuarios.find(
    (u) => u.email === email && u.senha === senha && u.tipo === tipo,
  );
  if (!usuario) {
    return res.status(200).json({
      mensagem: "Email, senha ou tipo inválido",
    });
  }

  return res.status(200).json({
    mensagem: "Login realizado com sucesso",
    usuario: {
      email: usuario.email,
      tipo: usuario.tipo,
    },
  });
});

app.listen(PORT, () => {
  console.log(`SERVIDOR RODANDO NA PORTA ${PORT}`);
});
