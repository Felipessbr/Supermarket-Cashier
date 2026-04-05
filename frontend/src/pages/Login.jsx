import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import img from "../img/8101846.jpg";
import imglogo from "../img/Lage (2).svg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Login() {
  const [tipo, setTipo] = useState("funcionario");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  // Função que monitora a troca de tipo de usuário
  const handleTipoChange = (novoTipo) => {
    setTipo(novoTipo);

    // Lógica para Cliente: Direciona direto sem validação
    if (novoTipo === "cliente") {
      // Salva um estado básico de cliente no localStorage se necessário
      localStorage.setItem("usuario", JSON.stringify({ tipo: "cliente", nome: "Visitante" }));
      
      // Redireciona para sua rota de menu/carrinho (ajuste o nome da rota conforme seu projeto)
      setTimeout(() => {
        navigate("/dashboard"); // Exemplo: redireciona para dashboard, ajuste conforme necessário
      }, 500); // Pequeno delay apenas para a animação de feedback
    }
  };

  async function handleLogin() {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
          tipo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.mensagem);
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      
      if (data.usuario.tipo === "gerente") {
        navigate("/dashboard");
      } else {
        navigate("/estoque");
      }

      alert(data.mensagem);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-black bg-gray-100">
      <div className="bg-white rounded-3xl max-w-[1100px] w-full md:h-[600px] flex flex-col md:flex-row overflow-hidden shadow-lg">
        
        {/* LADO ESQUERDO: IMAGEM */}
        <div
          className="w-full md:w-1/2 h-64 md:h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        />

        {/* LADO DIREITO: FORMULÁRIO */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10 relative">
          
          <motion.span
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute top-6 left-0 px-6 py-2 bg-purple-500 text-white text-sm font-medium rounded-br-full shadow-md"
          >
            {tipo === "cliente" ? "Acessando Menu..." : "Welcome back"}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-sm"
          >
            {/* LOGO */}
            <div className="flex justify-center mb-6">
              <motion.img
                src={imglogo}
                alt="Logo Villa Itália"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-40 object-contain"
              />
            </div>

            <h1 className="text-2xl font-bold mb-6">Login</h1>

            {/* SELEÇÃO DE TIPO */}
            <div className="mb-6">
              <Label className="block mb-3 text-gray-600">Tipo de acesso</Label>
              <RadioGroup
                value={tipo}
                onValueChange={handleTipoChange}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-transparent hover:border-purple-300 transition-all">
                  <RadioGroupItem value="cliente" id="cliente" />
                  <Label htmlFor="cliente" className="cursor-pointer font-semibold text-purple-700">
                    Cliente
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="funcionario" id="funcionario" />
                  <Label htmlFor="funcionario" className="cursor-pointer">Funcionário</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="gerente" id="gerente" />
                  <Label htmlFor="gerente" className="cursor-pointer">Gerente</Label>
                </div>
              </RadioGroup>
            </div>

            {/* FORMULÁRIO CONDICIONAL */}
            <AnimatePresence mode="wait">
              {tipo !== "cliente" ? (
                <motion.div
                  key="form-login"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Senha</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <a href="#" className="text-sm text-gray-500 hover:text-purple-600">
                      Esqueceu a Senha?
                    </a>
                  </div>

                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6"
                    onClick={handleLogin}
                  >
                    Entrar como {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10"
                >
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className="text-purple-600 font-medium">Redirecionando para o menu...</p>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </div>
    </div>
  );
}