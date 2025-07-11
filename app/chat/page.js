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
        <aside className="w-[320px] h-[calc(100vh-72px)] overflow-y-scroll border-2 border-black flex flex-col gap-4">
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