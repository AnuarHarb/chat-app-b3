"useClient";
import React, { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebaseConfig";
import { MessageBox } from "./messageBox";
import { useRef } from "react";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export const ChatPanel = ({ activeConversation }) => {
  const messagesEndRef = useRef(null);
  const [inputMessage, setInputMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [chat, setChat] = useState();

  useEffect(() => {
    if (activeConversation) {
      setMessageList(activeConversation.messages);
    }
  }, [activeConversation]);

  useEffect(() => {
    if (activeConversation && messageList) {
      const chatSession = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: `Eres ${activeConversation.user.name.first}, una persona de ${activeConversation.user.location.city} y estas en una conversación conmigo a través de una plataforma de chat y quiero que me respondas de manera breve en máximo un parrafo.`,
        },
        history: messageList.map((message) => ({
          role: message.sender === "me" ? "user" : "model",
          parts: [{ text: message.text }],
        })),
      });
      setChat(chatSession);
    }
  }, [messageList]);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    console.log(messageList);

    scrollToBottom();
  }, [messageList]);

  if (!activeConversation) {
    return (
      <section className="flex justify-center items-center w-full h-[calc(100vh-72px)]">
        <p>Seleccióna una chat para interactuar</p>
      </section>
    );
  }

  const sendMessage = async () => {
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);

      setInputMessage("");
      setFile(null);
      const completeMessage = {
        text: inputMessage,
        sender: "me",
        date: Date.now(),
        imageUrl: downloadUrl,
      };

      setMessageList((prev) => [...prev, completeMessage]);

      await updateDoc(doc(db, "chats", activeConversation.id), {
        messages: arrayUnion(completeMessage),
      });
      return;
    }

    if (!inputMessage) return;

    // Send User Message
    const completeMessage = {
      text: inputMessage,
      sender: "me",
      date: Date.now(),
    };

    setInputMessage("");
    setMessageList((prev) => [...prev, completeMessage]);

    await updateDoc(doc(db, "chats", activeConversation.id), {
      messages: arrayUnion(completeMessage),
    });

    // Send Gemini Message
    setLoader(true);
    const geminiMessage = await geminiResponse(completeMessage.text);

    const completeGeminiMessage = {
      text: geminiMessage,
      sender: activeConversation.user.name.first,
      date: Date.now(),
    };

    setMessageList((prev) => [...prev, completeGeminiMessage]);
    setLoader(false);

    await updateDoc(doc(db, "chats", activeConversation.id), {
      messages: arrayUnion(completeGeminiMessage),
    });
  };

  const geminiResponse = async (prompt) => {
    const response = await chat.sendMessage({ message: prompt });
    console.log(response.text);
    return response.text;
  };

  return (
    <section className="flex flex-col relative grow h-[calc(100vh-72px)]">
      <header className="w-full bg-sky-800 p-2 text-white flex gap-2 items-center">
        <img
          className="rounded-md w-[80px]"
          src={activeConversation.user.picture.large}
        />
        <h3 className="text-2xl">
          {activeConversation.user.name.first}{" "}
          {activeConversation.user.name.last}
        </h3>
      </header>
      <section className="p-2 flex flex-col gap-2 overflow-y-scroll h-[calc(100vh-220px)]">
        {messageList.map((message, index) => (
          <MessageBox key={index} message={message} />
        ))}
        {loader && <p className="pb-20">Escribiendo Mensaje...</p>}
        <div ref={messagesEndRef} />
      </section>
      <footer className="absolute bottom-0 p-2 pb-10 flex gap-2 bg-sky-800 flex left-0 right-0">
        <input
          type="text"
          className="grow p-2 border-2 border-black rounded-md bg-white"
          value={inputMessage}
          onChange={(event) => setInputMessage(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && sendMessage()}
        />
        {file && (
          <div
            onClick={() => setFile(null)}
            className="w-[100px] h-[100px] bg-gray-600 text-white flex justify-center items-center"
          >
            {file.name}
          </div>
        )}
        <label for="file-input" className="cursor-pointer">
          ⬆️
          <input
            id="file-input"
            type="file"
            className="hidden"
            accept="image/png, image/gif, image/jpeg, image/jpg"
            onChange={(event) => setFile(event.target.files[0])}
          ></input>
        </label>
        <button
          onClick={() => sendMessage()}
          className="w-[100px] p-2 border-2 border-black cursor-pointer rounded-md bg-white"
        >
          Send
        </button>
      </footer>
    </section>
  );
};
