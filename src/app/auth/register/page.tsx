"use client";

import { useState } from "react";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const { token } = await AuthService.register(email, password);
    localStorage.setItem("token", token);
    router.push("/");
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-sm mx-auto mt-20 flex flex-col gap-4"
    >
      <h1 className="text-xl font-bold">Register</h1>

      <input
        className="border p-2"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button className="bg-black text-white py-2">Create Account</button>
    </form>
  );
}