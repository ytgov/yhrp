/**
 * Place shape returned by the YHIS public register API
 * (https://yhis.gov.yk.ca/api/register), which our Express proxy forwards.
 *
 * List responses include summary fields (+ optional ThumbFile).
 * Detail responses add the bilingual description fields.
 *
 * Frontend maps this via Place.fromApi() in
 * src/web/src/modules/places/models/Place.js.
 *
 * French metadata uses YHIS `fr_*` prefixes (fr_primaryName, etc.).
 * French description bodies use `*Fr` suffixes (placeDescriptionFr, etc.).
 */
export interface RegisterPlace {
  id: number;
  primaryName: string;
  /** French place name from YHIS (may be null) */
  fr_primaryName?: string | null;
  yHSIId: string;
  communityName?: string;
  /** French community name from YHIS (may be null) */
  fr_communityName?: string | null;
  latitude?: string;
  longitude?: string;
  recognitionDate?: string | null;
  /** Designation level string from YHIS (e.g. "Federal") */
  designations?: string;
  /** French designation level from YHIS (e.g. "Federal") */
  fr_designations?: string | null;
  caption?: string | null;
  /** Embedded list thumbnail (Buffer-like JSON) when present */
  ThumbFile?: {
    type?: string;
    data?: number[];
  } | null;

  // Detail-only bilingual description fields
  placeDescriptionEn?: string;
  placeDescriptionFr?: string;
  heritageValueEn?: string;
  heritageValueFr?: string;
  characterDefEn?: string;
  characterDefFr?: string;
  descBoundEn?: string;
  descBoundFr?: string;
  additionalInfoEn?: string;
  additionalInfoFr?: string;
}
