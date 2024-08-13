/* 
    File: UserModal.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import "@/styles/userModal.scss";
import React, { FC } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { userLogout } from "@/utils/auth";

interface UserModalProps {
  toggleUserModal: Function;
}

const UserModal: FC<UserModalProps> = ({ toggleUserModal }) => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);

  const logout = () => {
    userLogout();
    toggleUserModal();
    router.push("/");
  };

  return (
    <div className="vp-user-modal-ct">
      {user ? (
        <>
          <ul>
            <Link
              href={`/user/profil/${user.username}`}
              onClick={() => toggleUserModal()}
            >
              Profil
            </Link>
            <Link href={"/user/chat"} onClick={() => toggleUserModal()}>
              Chat
            </Link>
            <Link href={"/user/merkliste"} onClick={() => toggleUserModal()}>
              Merkliste
            </Link>
            <button onClick={logout}>Logout</button>
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
