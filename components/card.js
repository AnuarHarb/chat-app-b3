import React from "react";

export const Card = ({ user, clickHandler }) => {
  return (
    <article
      className="shadow-2xl rounded-b-md w-[300px] cursor-pointer"
      onClick={clickHandler}
    >
      <div className="flex p-5">
        <img
          src={user.picture?.large ? user.picture.large : user.picture}
          className="w-[100px] rounded-full border-b-gray-600 border-4"
        ></img>
        <div className="p-2">
          <h3 className="font-bold">
            {user.name.first} {user.name.last}
          </h3>
          <p>{user.phone}</p>
        </div>
      </div>
      <footer className="border-t-2 border-black flex justify-around">
        {user.location ? (
          <div>{user.location.city}</div>
        ) : (
          <div>Desconocido</div>
        )}

        <div>{user.email}</div>
      </footer>
    </article>
  );
};
