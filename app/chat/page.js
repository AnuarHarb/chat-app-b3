"use client";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { db } from "@/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export default function Chat() {
  const [conversations, setConversations] = useState([]);

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
        <aside className="w-[300px] h-[100vh] border-2 border-black p-2">
          {conversations.map((conversation, index) => (
            <div key={index} className="border-2 border-black">
              <h3>{conversation.user.name.first}</h3>
            </div>
          ))}
        </aside>
        <section className="border-2 border-black h-[100vh] w-full bg-slate-300">
          {}
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
