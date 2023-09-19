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
  return (
    <>
      {courts.map((court) => {
        return (
          <Marker
            map={map}
            coordinates={court.coordinates}
            // icon={generateCourtMarkerIcon(court.season, false)}
            onClick={() => {
              setCurrentCourt(court);
            }}
            key={court.nid}
          />
        );
      })}
      {currentCourt && (
        <Marker
          map={map}
          coordinates={currentCourt.coordinates}
          icon={generateCourtMarkerIcon(currentCourt.season, true)}
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
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateCourtMarkerIcon(
  markerIndex: number,
  isSelected: boolean
): ImageIcon {
  /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */
  return {
    url: isSelected ? "images/markers-selected.png" : "images/markers.png",
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0),
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT
    ),
  };
}
