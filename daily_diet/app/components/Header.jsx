"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { getUserInfo } from "@/app/lib/api";
import styles from "../styles/Header.module.css";

export default function Header() {
  const route = useRouter();
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdown, openDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const fetchUserInfo = async () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (!user_id || !token) {
      setLogged(false);
      setUser(null);
      return;
    }

    try {
      const userInfo = await getUserInfo(user_id, token);
      setUser(userInfo);
      setLogged(true);
    } catch (error) {
      console.error("Erro ao obter informações do usuário:", error.message);
      setLogged(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();

    const interval = setInterval(() => {
      fetchUserInfo();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        openDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mainPage = () => {
    route.push("/");
  };

  const pushLogin = () => {
    route.push("/login");
  };

  const pushRegister = () => {
    route.push("/register");
  };

  const pushUserPage = () => {
    const user_id = localStorage.getItem("user_id");
    openDropdown(false);
    route.push(`/${user_id}`);
  };

  const pushUserSettingsPage = () => {
    const user_id = localStorage.getItem("user_id");
    openDropdown(false);
    route.push(`/${user_id}/settings`);
  };

  const userLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      setLogged(false);
      setUser(null);
      route.push("/");
    }
  };

  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.logo} onClick={mainPage}>
        Daily Diet
      </h1>
      <div className={styles.loginContainer}>
        {!logged ? (
          <>
            <h3 className={styles.logo} onClick={pushLogin}>
              Entrar
            </h3>
            <h3 className={styles.logo} onClick={pushRegister}>
              Registrar-se
            </h3>
            <Image
              src="/login_icon.png"
              alt="Ícone de Usuário"
              width={50}
              height={50}
            />
          </>
        ) : (
          <div className={styles.dropdownTrigger}>
            <h3
              className={styles.logo}
              onClick={() => openDropdown((prev) => !prev)}
            >
              {user?.username}
            </h3>
            {dropdown && (
              <div className={styles.dropdownMenu} ref={dropdownRef}>
                <h3 className={styles.dropdownItem} onClick={pushUserPage}>
                  Minhas Dietas
                </h3>
                <h3
                  className={styles.dropdownItem}
                  onClick={pushUserSettingsPage}
                >
                  Configurações
                </h3>
                <h3 className={styles.dropdownItem} onClick={userLogout}>
                  Sair
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
