import React from 'react';
import Link from 'next/link';
import styles from '../styles/header.module.scss';
import Image from 'next/image';

interface Props {
    rightElements?: React.ReactElement[];

}

const HeaderComponent = ({rightElements}: Props) => {
    return (
        <header className={styles.header}>
            <div className={styles.flexItem}>
                <Link href='/' className={styles.box}>
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                        alt="logo"
                        width={30}
                        height={30}
                    />
                </Link>
            </div>
            {
                rightElements && <div className={styles.flexItem}>{rightElements}</div>
            }
        </header>
    )
}

export default HeaderComponent;