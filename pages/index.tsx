import { Fragment } from 'react';
import Header from '../components/Header';
import styles from '../styles/header.module.scss';
import Link from 'next/link';
import { VscFeedback } from 'react-icons/vsc';
import { AiOutlineShareAlt } from 'react-icons/ai';

export default function Home() {
  return (
    <Fragment>
      <Header rightElements={[
        <button onClick={() => {
          alert('copy!');
        }}
        className={styles.box}
        style={{ marginRight: 8 }}
        key="button"
        ><AiOutlineShareAlt size={20}/></button>,
        <Link href="/feedback" className={styles.box} key="link">
          <VscFeedback size={20}/>
        </Link>
      ]}/>
    </Fragment>
  )
}  