/* 
    File: UserModal.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import "@/styles/userModal.scss";
import React, { FC, useEffect, useRef } from "react";
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

  const modalRef = useRef<HTMLDivElement>(null);

  // useEffect zum Hinzufügen eines Event-Listeners bei jedem Rendern des Modals
  useEffect(() => {
    // Funktion zum Überprüfen, ob ein Klick außerhalb des Modals passiert
    const handleClickOutside = (event: MouseEvent) => {
      const clickedNode = event.target as HTMLElement;

      // Zugriff auf das data-ref Attribut des angeklickten Elements
      const dataRefValue = clickedNode.getAttribute("data-ref");
      if (dataRefValue) {
        return;
      }

      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        toggleUserModal();
      }
    };

    // Event-Listener hinzufügen
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup des Event-Listeners bei Unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleUserModal]);

  const logout = () => {
    userLogout();
    toggleUserModal();
    router.push("/");
  };

  return (
    <div className="vp-user-modal-ct" ref={modalRef}>
      {user ? (
        <div className="user-modal-list">
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
        </div>
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
