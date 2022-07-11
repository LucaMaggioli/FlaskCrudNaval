import Pp1 from "./../images/profilePictures/pp-1.png";
import Pp2 from "./../images/profilePictures/pp-2.png";
import Pp3 from "./../images/profilePictures/pp-3.png";
import Pp4 from "./../images/profilePictures/pp-4.png";
import Pp5 from "./../images/profilePictures/pp-5.png";
import Pp6 from "./../images/profilePictures/pp-6.png";
import Pp7 from "./../images/profilePictures/pp-7.png";
import Pp8 from "./../images/profilePictures/pp-8.png";

export const profilesPictures = [Pp1, Pp2, Pp3, Pp4, Pp5, Pp6, Pp7, Pp8];

export const CordinateStatus = {
  WATER: 1,
  BOAT: 2,
  HIT: 3,
  MISS: 4,
  SUNK: 5,
};

export const GameStates = {
  WAITING: -1,
  PLACINGBOATS: 1,
  PLAYING: 2,
  PLAYER1TURN: 10,
  PLAYER1WIN: 11,
  PLAYER2TURN: 20,
  PLAYER2WIN: 22,
  FINISHED: 30,
};

export const VERTICAL = 0;
export const HORIZONTAL = 1;
