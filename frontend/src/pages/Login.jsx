import { useState } from "react";
import { motion } from "framer-motion";

import img from "../img/8101846.jpg";
import imglogo from "../img/Lage (2).svg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Login() {

  const [tipo, setTipo] = useState("funcionario");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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

    alert(data.mensagem);
    console.log(data);

  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao conectar com o servidor");
  }
}
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-black">
      <div className="bg-white rounded-3xl max-w-[1100px] w-full md:h-[600px] flex flex-col md:flex-row overflow-hidden shadow-lg">

        {/* IMAGEM */}
        <div
          className="w-full md:w-1/2 h-64 md:h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        />

        {/* FORMULÁRIO */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10 relative">

          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute top-6 left-0 px-6 py-2 bg-purple-500 text-white text-sm font-medium rounded-br-full shadow-md"
          >
            Welcome back
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
                transition={{ duration: 0.8 }}
                className="w-40 object-contain"
              />
            </div>

            <h1 className="text-2xl font-bold mb-6">Login</h1>

            {/* TIPO DE ACESSO */}
            <div className="mb-4">
              <Label className="block mb-2">Tipo de acesso</Label>

              <RadioGroup
                value={tipo}
                onValueChange={setTipo}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="funcionario" id="funcionario" />
                  <Label htmlFor="funcionario" className="cursor-pointer">
                    Funcionário
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="gerente" id="gerente" />
                  <Label htmlFor="gerente" className="cursor-pointer">
                    Gerente
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* EMAIL */}
            <div className="space-y-2 mb-4">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* SENHA */}
            <div className="space-y-2 mb-4">
              <Label>Senha</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            {/* CHECKBOX */}
            <div className="flex justify-between mb-6">

              <a
                href="#"
                className="text-sm hover:text-blue-500"
              >
                Esqueceu a Senha?
              </a>
            </div>

            {/* BOTÃO LOGIN */}
            <Button
              className="w-full cursor-pointer"
              onClick={handleLogin}
            >
              Entrar
            </Button>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
