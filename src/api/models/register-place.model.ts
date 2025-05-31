/**
 * NOTE: Differences between backend and frontend place models
 *
 * Backend (this file):
 *   - id (number)              <-> PlaceId (frontend)
 *   - name (string)            <-> PrimaryName (frontend)
 *   - status (string)          <-> Designations (frontend)
 *   - recognitionDate (string) <-> RecognitionDate (frontend)
 *   - placeDescriptionEn/Fr    <-> EnglishTeaser/FrenchTeaser (frontend uses teasers)
 *   - heritageValueEn/Fr, characterDefEn/Fr, descBoundEn/Fr, additionalInfoEn/Fr: only in backend
 *   - (not present)            <-> YHSIId, Latitude, Longitude, PhotoURL (frontend only)
 */
export interface RegisterPlace {
  id: number;
  name: string;
  status: string;
  recognitionDate: string; // ISO date string (YYYY-MM-DD)
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
