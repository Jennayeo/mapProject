import { Fragment, useEffect } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineShareAlt } from "react-icons/ai";
import Header from "../components/common/Header";
import styles from "../styles/header.module.scss";
import MapSection from "../components/home/MapSection";
import { Court } from "../types/court";
import useCourts from "../hooks/useCourts";

interface Props {
  courts: Court[];
}

const Home: NextPage<Props> = ({ courts }) => {
  const { initializeCourts } = useCourts();

  useEffect(() => {
    initializeCourts(courts);
  }, [initializeCourts, courts]);

  return (
    <Fragment>
      <Header
        rightElements={[
          // <button
          //   onClick={() => {
          //     alert("복사!");
          //   }}
          //   className={styles.box}
          //   style={{ marginRight: 8 }}
          //   key="button"
          // >
          //   <AiOutlineShareAlt size={20} />
          // </button>,
          <Link href="/feedback" className={styles.box} key="link">
            <VscAccount size={30} />
          </Link>,
        ]}
      />
      <main style={{ width: "100%", height: "100%" }}>
        <MapSection />
      </main>
    </Fragment>
  );
};
export default Home;

export async function getStaticProps() {
  /** TODO: next api routes로 불러오기 */
  const courts = (await import("../public/courts.json")).default;

  return {
    props: { courts },
    revalidate: 60 * 60,
  };
}
