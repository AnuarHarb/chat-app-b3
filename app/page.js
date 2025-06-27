"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Card } from "@/components/card";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("https://randomuser.me/api/?results=10");
      const data = await response.json();
      setUsers(data.results);
    };
    getUsers();
  }, []);

  return (
    <section>
      <Header />
      <h1 className="text-6xl text-center py-10">Chatea con quien quieras</h1>
      <section className="flex gap-4 p-10 flex-wrap justify-center">
        {users.map((user) => (
          <Card user={user} />
        ))}
      </section>
    </section>
  );
}
