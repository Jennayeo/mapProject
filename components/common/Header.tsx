import React from "react";
import Link from "next/link";
import styles from "../../styles/header.module.scss";
import Image from "next/image";
import logo from "../../public/images/logo.png";

interface Props {
  rightElements?: React.ReactElement[];
}

const HeaderComponent = ({ rightElements }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link href="/" className={styles.box}>
          <Image src={logo} alt="logo" width={110} height={20} />
        </Link>
      </div>
      {rightElements && <div className={styles.flexItem}>{rightElements}</div>}
    </header>
  );
};

export default HeaderComponent;
