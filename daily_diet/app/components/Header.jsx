"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/header.module.css";

export default function Header() {
  const route = useRouter();

  const pushLogin = () => {
    route.push('/login');
  }

  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.logo} onClick={() => pushLogin()}>Daily Diet</h1>
      <div className={styles.loginContainer}>
        <Image src="/login_icon.png" alt="User Icon" width={50} height={50} />
        <h2>Login</h2>
      </div>
    </div>
  );
}
