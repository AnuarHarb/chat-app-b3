// // hooks / useUser.js;
import React, { useState, useEffect } from "react";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export function useAuth() {
  const [authenticatedUser, setAuthenticatedUser] = useState(); // undefined

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setAuthenticatedUser);
    return () => unsubscribe();
  }, []);

  return authenticatedUser;
}

// import { useEffect, useState } from "react";
// import { auth } from "@/firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";

// export function useAuth() {
//   const [user, setUser] = useState();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, setUser);
//     return () => unsubscribe();
//   }, []);

//   return user;
// }
