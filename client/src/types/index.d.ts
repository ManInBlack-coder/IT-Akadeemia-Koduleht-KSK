type KonsultatsioonType = {
  opetaja: string;
  oppeaine: string;
  paev: string;
  aeg: string;
  kuupaevad: string[];
  ruum: string;
  lisainfo: string | null;
  tegevus: string;
};

type KonsultatsioonidData = {
  aasta: number;
  periood: string;
  konsultatsioonid: Konsultatsioon[];
};

type Grupp = {
  id: number;
  tahis: string;
  oppekava: string;
  kursus: number | string;
};

type GrupidData = {
  grupid: Grupp[];
};

type ScheduleItem = {
  tund: string;
  algus: string;
  lopp: string;
  aine: string;
  grupp: string;
  opetaja: string;
  ruum: string;
};

type ScheduleType = {
  nadal: string;
  tunnid: { [key: string]: ScheduleItem[] };
  ajad: {
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
    "6": string;
    "7": string;
    "8": string;
    "9": string;
    "soomine": string;
  };
};