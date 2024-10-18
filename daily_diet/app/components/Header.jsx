"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getUserInfo } from "@/app/lib/api";
import styles from "../styles/header.module.css";

export default function Header() {
  const route = useRouter();
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const path = window.location.pathname;
    const userPattern = /^\/\d+($|\/.*)/;

    const fetchUserInfo = async () => {
      const user_id = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");

      if (!user_id || !token) {
        setLogged(false);
        return;
      }

      try {
        const userInfo = await getUserInfo(user_id, token);
        setUser(userInfo);
        setLogged(true);
      } catch (error) {
        console.error("Erro ao obter informações do usuário:", error);
        setLogged(false);
      }
    };

    if (userPattern.test(path)) {
      fetchUserInfo();
    } else {
      setLogged(false);
    }
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

  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.logo} onClick={mainPage}>
        Daily Diet
      </h1>
      <div className={styles.loginContainer}>
        {!logged ? (
          <>
            <h3 className={styles.logo} onClick={pushLogin}>
              Entrar{" "}
            </h3>
            <h3 className={styles.logo} onClick={pushRegister}>
              Registrar-se
            </h3>
            <Image
              src="/login_icon.png"
              alt="User Icon"
              width={50}
              height={50}
            />
          </>
        ) : (
          <h3 className={styles.logo}>{user?.username}</h3>
        )}
      </div>
    </div>
  );
}
