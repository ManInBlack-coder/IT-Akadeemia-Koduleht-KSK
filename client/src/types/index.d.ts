type Konsultatsioon = {
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

type TunniplaanAjad = {
  [key: string]: string;
};

type Tunniplaan = {
  nadal: string;
  ajad: TunniplaanAjad;
  tunnid: any[];
};