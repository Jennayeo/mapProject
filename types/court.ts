type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];

export type Menu = { name: string; price: string };
export type Court = {
  nid: number;
  name: string;
  description: string;
  season: number;
  episode: number;
  coordinates: Coordinates;
  IMGURL: string;
  SVCSTATNM: string;
  V_MAX: string;
  V_MIN: string;
  characteristic: string;
  foodKind: string;
  address: string;
  phone: string;
  TELNO: string;
  SVCURL: string;
  X: string;
  Y: string;
  SVCID: string;
  menus: Menu[];
};
export type Result = {
  ListPublicReservationSport: any[];
};
