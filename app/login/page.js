"use client";
import React from "react";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const router = useRouter();

  const loginHandler = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    console.log(auth);
    router.push("/");
  };

  return (
    <section className="bg-slate-200 h-[100vh] flex justify-center items-center flex-col">
      <article className="p-10 shadow-2xl rounded-b-lg flex flex-col gap-4">
        <h1 className="text-2xl">Chat Messenger</h1>
        <button
          className="bg-blue-400 rounded-md p-2 text-white hover:bg-blue-300 cursor-pointer"
          onClick={() => loginHandler()}
        >
          Iniciar sesión con Google
        </button>
      </article>
    </section>
  );
};

export default Login;
