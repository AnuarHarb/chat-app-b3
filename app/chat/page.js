"use client";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { db } from "@/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Card } from "@/components/card";

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [activeConversations, setActiveConversations] = useState();

  useEffect(() => {
    onSnapshot(collection(db, "chats"), (snapshot) => {
      const chats = snapshot.docs.map((document) => document.data());
      setConversations(chats);
    });
  }, []);

  return (
    <section>
      <Header />

      <section className="flex">
        <aside className="w-[300px] h-[100vh] border-2 border-black p-4">
          {conversations.map((conversation) => (
            <Card
              key={conversation.id}
              user={conversation.user}
              clickHandler={() => setActiveConversations(conversation)}
            />
          ))}
        </aside>

        <section className="border-2 border-black h-[100vh] w-full bg-slate-300">
          {activeConversations &&
            activeConversations.messages.map((message, index) => (
              <p key={index}>{message.text}</p>
            ))}
        </section>
      </section>
    </section>
  );
}

// const chat = {
//   user: {
//     first: 'Jenny',
//     last: 'Horsman',
//     picture: "https://randomuser.me/api/portraits/med/men/75.jpg"
//   },
//   messages: [
//     {
//       text: "hola!",
//       date: "19-07-2025-18:00:00",
//       sender: "me"
//     }
//   ]
// }
