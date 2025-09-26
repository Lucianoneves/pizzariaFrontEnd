"use client";

import { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.scss";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function Signup() {
  async function handleRegister(event: FormEvent<HTMLFormElement>) {   
    event.preventDefault();

    const formData = new FormData(event.currentTarget);   
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      console.log("Preencha todos os campos");
      return;
    }

    try {
      const response = await api.post("/users", { name, email, password });
      console.log("Usuário criado:", response.data);
      // opcional: limpar formulário ou mostrar mensagem de sucesso
    } catch (err: any) {
      console.log("Erro ao criar usuário:", err.response?.data ?? err.message);
    }

    redirect("/")
  }

  return (
    <div className={styles.containerCenter}>
      {/* Logo sem importar, usando public */}
      <Image
        src="/logo.svg"
        alt="Logo da pizzaria"
        width={120}
        height={120}
      />

      <section className={styles.login}>
        <h1>Criando sua conta</h1>
        <form onSubmit={handleRegister}>
          <input 
            type="text"
            required
            name="name"
            placeholder="Digite seu nome..."
            className={styles.input}
          />

          <input 
            type="email"
            required
            name="email"
            placeholder="Digite seu email..."
            className={styles.input}
          />

          <input 
            type="password"
            required
            name="password"
            placeholder="***********"
            className={styles.input}
          />

          <button type="submit" className={styles.button}>
            Cadastrar
          </button>
        </form>

        <Link href="/" className={styles.text}>
          Já possui uma conta? Faça o login
        </Link>
      </section>
    </div>
  );
}
