"use client";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { db } from "@/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Card } from "@/components/card";
import { ChatPanel } from "@/components/chatPanel";

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
      const chats = snapshot.docs.map((document) => document.data());
      setConversations(chats);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section>
      <Header />
      <section className="flex">
        <aside className="w-[300px] h-[100vh] border-2 border-black flex flex-col gap-4">
          {conversations.map((conversation, index) => (
            <Card
              key={index}
              user={conversation.user}
              clickHandler={() => setActiveConversation(conversation)}
            />
          ))}
        </aside>

        <ChatPanel
          activeConversation={activeConversation}
        />
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
