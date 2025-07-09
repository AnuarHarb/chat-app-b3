"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Card } from "@/components/card";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function Home() {
  const authUser = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(authUser);
    if (authUser === null) router.push("/login");
  }, [authUser]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("https://randomuser.me/api/?results=10");
      const data = await response.json();
      setUsers(data.results);
    };
    getUsers();
  }, []);

  const startConversation = async (user) => {
    const conversation = {
      messages: [],
      user: user,
    };

    await addDoc(collection(db, "chats"), conversation);
    router.push("/chat");
  };

  if (!authUser) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <Header />
      <h1 className="text-6xl text-center py-10">Chatea con quien quieras</h1>
      <section className="flex gap-4 p-10 flex-wrap justify-center">
        {users.map((user) => (
          <Card
            key={user.login.uuid}
            user={user}
            clickHandler={() => startConversation(user)}
          />
        ))}
      </section>
    </section>
  );
}
