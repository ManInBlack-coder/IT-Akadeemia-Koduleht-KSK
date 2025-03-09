// THESE TYPES HAVEN'T BEEN TESTED YET
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

type Language = {
  id: string;
  keel: string;
};

type StudyProgram = {
  oppegrupi_id: number;
  vastuvotu_link: string;
  oppegrupp: string;
  oppekava_nimetus: string;
  oppekava_kood: string | null;
  oppekeel: Language[];
  rahastamise_allikas: string;
  oppekava_pdf_link: string;
  oppekava_moodulitega_pdf_link: string;
  osakonna_id: string;
  osakonna_juhataja_isikukood: string | boolean;
  oppe_baastase: string | null;
  oppetase: string;
  oppeaeg: string;
  oppevorm: string;
  oppevorm_sonadega: string;
  oppekava_id: string;
  saavutatav_tase: string;
  uldtingimused?: string[];
  hindamis_kriteeriumid_pdf_link?: string;
};

type AdmissionPeriod = {
  id: number;
  nimetus: string;
  algus: string;
  lopp: string;
  "e-algus": string | null;
  "e-lopp": string | null;
  eelistusi: string;
  "e-eelistusi": string;
  erialad: Record<string, StudyProgram>;
};

type AdmissionData = Record<string, AdmissionPeriod>;


// THESE TYPES WORK FOR SURE
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