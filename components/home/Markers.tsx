import React, { useEffect } from "react";
import useSWR from "swr";
import { MAP_KEY } from "../../hooks/useMap";
import { COURT_KEY } from "../../hooks/useCourts";
import useCurrentCourt, {
  CURRENT_COURT_KEY,
} from "../../hooks/useCurrentCourt";
import type { ImageIcon, NaverMap } from "../../types/map";
import type { Court } from "../../types/court";
import Marker from "./Marker";

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: courts } = useSWR<Court[]>(COURT_KEY);

  const { data: currentCourt } = useSWR<Court>(CURRENT_COURT_KEY);
  const { setCurrentCourt, clearCurrentCourt } = useCurrentCourt();

  if (!map || !courts) return null;
  // useEffect(() => {
  //   console.log(courts[0].X);
  // }, []);

  return (
    <>
      {courts.map((court) => {
        // console.log([parseFloat(court.X), court.Y]);
        return (
          <Marker
            map={map}
            // coordinates={court.coordinates}
            coordinates={[parseFloat(court.Y), parseFloat(court.X)]}
            icon={generateCourtMarkerIcon(
              court.SVCSTATNM == "예약마감" ? 0 : 2,
              false
            )}
            onClick={() => {
              console.log(court);
              setCurrentCourt(court);
            }}
            key={court.SVCID}
          />
        );
      })}
      {currentCourt && (
        <Marker
          map={map}
          coordinates={[parseFloat(currentCourt.Y), parseFloat(currentCourt.X)]}
          //   coordinates={}
          icon={generateCourtMarkerIcon(1, true)}
          onClick={clearCurrentCourt}
          key={currentCourt.nid}
        />
      )}
    </>
  );
};
export default Markers;

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 3;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateCourtMarkerIcon(
  markerIndex: number,
  isSelected: boolean
): ImageIcon {
  /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */
  return {
    url: isSelected ? "images/tennis.png" : "images/tennis_sprite.png",
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0),
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * (isSelected ? 1 : NUMBER_OF_MARKER),
      SCALED_MARKER_HEIGHT
    ),
  };
}
