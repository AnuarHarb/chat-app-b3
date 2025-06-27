import React from "react";

export const Card = ({ user }) => {
  return (
    <article className="shadow-2xl rounded-b-md flex w-[300px]">
      <img src={user.picture.large} className="w-[150px]"></img>
      <div className="p-2">
        <h3>
          {user.name.first} {user.name.last}
        </h3>
        <p>{user.phone}</p>
      </div>
    </article>
  );
};
