import { Fragment, useEffect } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineShareAlt } from "react-icons/ai";
import Header from "../components/common/Header";
import styles from "../styles/header.module.scss";
import MapSection from "../components/home/MapSection";
import { Court, Result } from "../types/court";
import useCourts from "../hooks/useCourts";
import DetailSection from "../components/home/DetailSection";
import { NextSeo } from "next-seo";
interface Props {
  courts: Court[];
  result: any;
}

// export const API_URL = "http://openapi.seoul.go.kr:8088";
// export const API_KEY = "57445967616a656e39345453564973";

const Home: NextPage<Props> = ({ courts, result }) => {
  const { initializeCourts } = useCourts();

  useEffect(() => {
    // const url = `http://openapi.seoul.go.kr:8088/57445967616a656e39345453564973/json/ListPublicReservationSport/1/5/`;
    // // const url = `${API_URL}?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&resultType=json `;
    // fetch(url)
    //   .then((response) =>
    //     console.log("response:", response)
    //   )
    //   .catch((error) => console.log("error:", error));
    // initializeCourts(courts);
    initializeCourts(result.ListPublicReservationSport.row);
  }, [initializeCourts, courts]);

  return (
    <Fragment>
      <NextSeo
        title="위쉐어! 테니스 코트 찾기"
        description="코트 잡기 하늘의 별따기"
      />
      <Header
        rightElements={
          [
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
            // <Link href="/feedback" className={styles.box} key="link">
            //   <VscAccount size={30} />
            // </Link>,
          ]
        }
      />
      <main
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <MapSection />
        <DetailSection />
      </main>
    </Fragment>
  );
};
export default Home;

export async function getStaticProps() {
  /** TODO: next api routes로 불러오기 */
  const courts = (await import("../public/courts.json")).default;

  // 데이터가 다 받아질때까지 기다림
  const res = await fetch(
    `http://openapi.seoul.go.kr:8088/57445967616a656e39345453564973/json/ListPublicReservationSport/1/999/테니스장`,
    { method: "get" }
  );
  const result = await res.json();
  // await setLoading(false);

  // const projectIds = result.results.map((aProject) => (
  //     aProject.properties.이름.title[0].plain_text
  // ))

  return {
    props: { courts, result },
    revalidate: 60 * 60,
  };
}
