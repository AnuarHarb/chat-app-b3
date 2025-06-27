import React from "react";
import Link from "next/link";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export const Header = () => {
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    console.log(auth);
    router.push("/login");
  };

  return (
    <header className="bg-black text-white flex justify-between text-2xl px-10 py-5">
      <Link href="/">
        <h2>ChatApp</h2>
      </Link>
      <ul className="flex gap-4">
        <Link href="/chat">
          <li>Ir a mis chats</li>
        </Link>
        <Link href="/perfil">
          <li>Perfil</li>
        </Link>
        <li onClick={() => logout()}>Logout</li>
      </ul>
    </header>
  );
};
