import Image from "next/image";
import type { Court } from "../../types/court";
// import Naver from "public/images/naver.png";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import styles from "../../styles/detail.module.scss";

type Props = {
  currentCourt?: Court;
  openModal: boolean;
};

const DetailContent = ({ currentCourt, openModal }: Props) => {
  if (!currentCourt) return null;
  return (
    <div
      className={`${styles.detailContent} ${openModal ? styles.openModal : ""}`}
    >
      <div className={styles.images}>
        {/* {currentCourt.images.slice(0, 3).map((image) => ( */}
        <div
          style={{ position: "relative", maxWidth: "100%", height: 120 }}
          // key={image}
        >
          <Image
            src={currentCourt.IMGURL}
            alt=""
            fill
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0WhFsDwADzwF2mLYSJgAAAABJRU5ErkJggg=="
          />
        </div>
        {/* ))} */}
      </div>
      {openModal && (
        <>
          <div className={styles.description}>
            <h2>설명</h2>
            <p>{currentCourt.description}</p>
          </div>
          <hr />
          <div className={styles.basicInfo}>
            <h2>기본 정보</h2>
            <div className="address">
              <IoLocationOutline size={20} />
              <span>{currentCourt.address || "정보가 없습니다."}</span>
            </div>
            <div className="phone">
              <IoCallOutline size={20} />
              <span>{currentCourt.phone || "정보가 없습니다."}</span>
            </div>
            <div className="naverUrl">
              {/* <Image src={Naver} width={20} height={20} alt="" /> */}
              <a
                href={`https://pcmap.place.naver.com/restaurant/${currentCourt.nid}/home`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span>네이버 상세 정보</span>
              </a>
            </div>
          </div>
          <hr />
          <div className={styles.menus}>
            <h2>메뉴</h2>
            <ul>
              {currentCourt.menus?.map((menu) => (
                <li className={styles.menu} key={menu.name}>
                  <span className={styles.name}>{menu.name}</span>
                  <span className={styles.price}>{menu.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
export default DetailContent;
