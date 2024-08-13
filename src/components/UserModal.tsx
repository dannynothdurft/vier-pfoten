/* 
    File: UserModal.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import "@/styles/userModal.scss";
import React, { FC } from "react";
import Link from "next/link";

import { useSelector } from "react-redux";
import { userLogout } from "@/utils/auth";

interface UserModalProps {
  toggleUserModal: Function;
}

const UserModal: FC<UserModalProps> = ({ toggleUserModal }) => {
  const { user } = useSelector((state: any) => state.user);

  return (
    <div className="vp-user-modal-ct">
      {user ? (
        <>
          <ul>
            <Link href={"/user/profil"}>Profil</Link>
            <Link href={"/user/chat"}>Chat</Link>
            <Link href={"/user/merkliste"}>Merkliste</Link>
            <button onClick={() => userLogout()}>Logout</button>
          </ul>
        </>
      ) : (
        <>
          <p>Du musst dich erst einloggen</p>
          <div className="cta-ct">
            <Link
              href={{ pathname: "/user/auth", query: { action: "login" } }}
              className="btn"
              onClick={() => toggleUserModal()}
            >
              Anmelden
            </Link>
            <Link
              href={{ pathname: "/user/auth", query: { action: "register" } }}
              className="btn secondary"
              onClick={() => toggleUserModal()}
            >
              Registrieren
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default UserModal;
