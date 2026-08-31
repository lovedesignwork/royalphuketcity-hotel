export const COUNTRY_NAMES: Record<string, string> = {
  TH: "Thailand",
  MY: "Malaysia",
  SG: "Singapore",
  CN: "China",
  HK: "Hong Kong",
  TW: "Taiwan",
  AU: "Australia",
  IN: "India",
  KR: "South Korea",
  JP: "Japan",
  GB: "United Kingdom",
  US: "United States",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  SE: "Sweden",
  AT: "Austria",
  RU: "Russia",
  UA: "Ukraine",
  PL: "Poland",
  CH: "Switzerland",
  BE: "Belgium",
  CA: "Canada",
  NZ: "New Zealand",
  PH: "Philippines",
  ID: "Indonesia",
  VN: "Vietnam",
  AE: "United Arab Emirates",
  SA: "Saudi Arabia",
  IL: "Israel",
  BR: "Brazil",
  MX: "Mexico",
};

const ISO3_TO_2: Record<string, string> = {
  tha: "TH",
  mys: "MY",
  sgp: "SG",
  chn: "CN",
  hkg: "HK",
  twn: "TW",
  aus: "AU",
  ind: "IN",
  kor: "KR",
  jpn: "JP",
  gbr: "GB",
  usa: "US",
  deu: "DE",
  fra: "FR",
  ita: "IT",
  esp: "ES",
  nld: "NL",
  swe: "SE",
  aut: "AT",
  rus: "RU",
  ukr: "UA",
  pol: "PL",
  che: "CH",
  bel: "BE",
  can: "CA",
  nzl: "NZ",
  phl: "PH",
  idn: "ID",
  vnm: "VN",
  are: "AE",
  sau: "SA",
  isr: "IL",
  bra: "BR",
  mex: "MX",
};

export function toCountryCode(value: string): string | null {
  const raw = (value || "").trim();
  if (!raw || raw === "Unknown" || raw === "Local") return null;
  if (raw.length === 2) return raw.toUpperCase();
  if (raw.length === 3) return ISO3_TO_2[raw.toLowerCase()] || null;
  const entry = Object.entries(COUNTRY_NAMES).find(
    ([, name]) => name.toLowerCase() === raw.toLowerCase()
  );
  return entry ? entry[0] : null;
}

export function countryName(code: string): string {
  return COUNTRY_NAMES[code] || code;
}
