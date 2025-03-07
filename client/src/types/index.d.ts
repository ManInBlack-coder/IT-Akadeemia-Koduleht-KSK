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
};