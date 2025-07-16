import React from "react";

export const MessageBox = ({ message }) => {
  return (
    <article
      className={`max-w-[60%] p-5 rounded-md flex flex-col gap-2 ${
        message.sender === "me"
          ? "self-end bg-cyan-600"
          : "self-start bg-sky-800"
      }`}
    >
      <h4>{message.sender === "me" ? "Tú" : message.user?.name?.first}</h4>
      {message.imageUrl && <img src={message.imageUrl} className="w-[300px]" />}
      <p className="text-3xl text-black">{message.text}</p>
      <span className="text-sm text-grey-800">
        {new Date(message.date).toLocaleString()}
      </span>
    </article>
  );
};
