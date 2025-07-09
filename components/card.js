import React from "react";

export const Card = ({ user, clickHandler }) => {
  return (
    <article
      className="shadow-2xl rounded-b-md flex w-[300px]"
      onClick={clickHandler}
    >
      <img
        src={user.picture?.large ? user.picture.large : user.picture}
        className="w-[150px]"
      ></img>
      <div className="p-2">
        <h3>
          {user.name.first} {user.name.last}
        </h3>
        <p>{user.phone}</p>
      </div>
    </article>
  );
};
