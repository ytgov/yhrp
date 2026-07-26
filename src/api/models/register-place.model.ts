/**
 * Place shape returned by the YHIS public register API
 * (https://yhis.gov.yk.ca/api/register), which our Express proxy forwards.
 *
 * List responses include summary fields (+ optional ThumbFile).
 * Detail responses add the bilingual description fields.
 *
 * Frontend maps this via Place.fromApi() in
 * src/web/src/modules/places/models/Place.js.
 */
export interface RegisterPlace {
  id: number;
  primaryName: string;
  yHSIId: string;
  communityName?: string;
  latitude?: string;
  longitude?: string;
  recognitionDate?: string | null;
  /** Designation level string from YHIS (e.g. "Federal") */
  designations?: string;
  caption?: string | null;
  /** Embedded list thumbnail (Buffer-like JSON) when present */
  ThumbFile?: {
    type?: string;
    data?: number[];
  } | null;

  // Detail-only bilingual fields
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
