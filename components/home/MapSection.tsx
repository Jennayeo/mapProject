import Map from "./Map";
import Markers from "./Markers";
import useMap from "../../hooks/useMap";
import useCurrentCourt from "../../hooks/useCurrentCourt";
import type { NaverMap } from "../../types/map";

const MapSection = () => {
  const { initializeMap } = useMap();
  const { clearCurrentCourt } = useCurrentCourt();

  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
    naver.maps.Event.addListener(map, "click", clearCurrentCourt);
  };

  return (
    <>
      <Map onLoad={onLoadMap} />
      <Markers />
    </>
  );
};
export default MapSection;
