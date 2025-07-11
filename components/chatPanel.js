"useClient";
import React, { useEffect, useState } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const ChatPanel = ({ activeConversation }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (activeConversation) {
      setMessageList(activeConversation.messages);
    }
  }, [activeConversation]);

  if (!activeConversation) {
    return (
      <section className="flex justify-center items-center w-full h-[100vh]">
        <p>Seleccióna una chat para interactuar</p>
      </section>
    );
  }

  const sendMessage = async () => {
    setInputMessage("");
    const completeMessage = {
      text: inputMessage,
      sender: "me",
      date: Date.now(),
    };

    setMessageList((prev) => [...prev, completeMessage]);

    await updateDoc(doc(db, "chats", activeConversation.id), {
      messages: arrayUnion(completeMessage),
    });
  };

  return (
    <section className="w-full h-[100vh] flex flex-col">
      <header className="w-full bg-sky-800 p-3 text-white flex gap-2 items-center">
        <img src={activeConversation.user.picture.large} />
        <h3>{activeConversation.user.name.first}</h3>
      </header>
      <section>
        {messageList.map((message, index) => (
          <p key={index} className="text-3xl text-black">
            {message.text}
          </p>
        ))}
      </section>
      <footer>
        <input
          type="text"
          className="border-2 border-black"
          value={inputMessage}
          onChange={(event) => setInputMessage(event.target.value)}
        />
        <button
          onClick={() => sendMessage()}
          className="border-2 border-black cursor-pointer"
        >
          Send
        </button>
      </footer>
    </section>
  );
};
