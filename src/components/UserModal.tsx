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
  console.log(user);

  return (
    <div className="vp-user-modal-ct">
      {user ? (
        <>
          <ul>
            <li>Profil</li>
            <li>Chat</li>
            <li>Merkliste</li>
            <li onClick={() => userLogout()}>Logout</li>
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
