import { CURRENT_COURT_KEY } from "../../hooks/useCurrentCourt";
import styles from "../../styles/detail.module.scss";
import { IoIosArrowUp } from "react-icons/io";
import useSWR from "swr";
import { Court } from "../../types/court";
import { useState } from "react";
import DetailContent from "./DetailContent";

const DetailSection = () => {
  // 마커 선택 후 해당 코트 이름 저장
  const { data: currentCourt } = useSWR(CURRENT_COURT_KEY);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      className={`${styles.detailSection} ${
        currentCourt ? styles.selected : ""
      } ${openModal ? styles.opened : ""}`}
    >
      <div className={styles.header}>
        <button
          className={`${styles.arrowButton} ${openModal ? styles.opened : ""}`}
          onClick={() => setOpenModal(!openModal)}
          disabled={!currentCourt}
          aria-label={openModal ? "코트 정보 닫기" : "코트 정보 열기"}
        >
          <IoIosArrowUp size={20} color="#666666" />
        </button>
        {!currentCourt && <p className={styles.title}>코트를 선택해주세요</p>}
        {currentCourt && <p className={styles.title}>{currentCourt.PLACENM}</p>}
      </div>
      <DetailContent currentCourt={currentCourt} openModal={openModal} />
    </div>
  );
};
export default DetailSection;
