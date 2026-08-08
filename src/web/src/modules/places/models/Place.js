/**
 * Class representing a Place in the system.
 * Field names match the YHIS register wire shape (and our Express proxy).
 */
export class Place {
  constructor(data) {
    this.placeId = data.id;
    this.id = data.id; // For backward compatibility

    // Metadata — same names as YHIS / backend RegisterPlace
    this.primaryName = data.primaryName || data.name || "";
    this.fr_primaryName = data.fr_primaryName || "";
    this.communityName = data.communityName || data.location || "";
    this.fr_communityName = data.fr_communityName || "";
    this.fr_designations = data.fr_designations || "";

    // Convenience English defaults (prefer localized*() helpers in UI)
    this.name = this._toProperCase(this.primaryName);
    this.location = this.communityName;
    this.description = data.placeDescriptionEn || "";

    this.coordinates = [
      parseFloat(data.latitude || data.coordinates?.[0] || 0),
      parseFloat(data.longitude || data.coordinates?.[1] || 0),
    ];
    this.designations = this._parseDesignations(data);
    this.heritageValues = this._parseHeritageValues(data);
    this.culturalHistory = this._parseCulturalHistory(data);
    this.historicalSources = this._parseHistoricalSources(data);
    this.yhsiId = data.yHSIId || data.yhsiId || "";
    this.recognitionDate = data.recognitionDate
      ? data.recognitionDate.split("T")[0]
      : null;
    this.photoId = data.id;
    // Prefer list ThumbFile (base64 JPEG) — avoids a separate photos request per place
    this.photoUrl = this._thumbFileToDataUrl(data.ThumbFile);

    // Detail bilingual description fields (*En / *Fr)
    this.placeDescriptionEn = data.placeDescriptionEn || "";
    this.placeDescriptionFr = data.placeDescriptionFr || "";
    this.heritageValueEn = data.heritageValueEn || "";
    this.heritageValueFr = data.heritageValueFr || "";
    this.characterDefEn = data.characterDefEn || "";
    this.characterDefFr = data.characterDefFr || "";
    this.descBoundEn = data.descBoundEn || "";
    this.descBoundFr = data.descBoundFr || "";
    this.additionalInfoEn = data.additionalInfoEn || "";
    this.additionalInfoFr = data.additionalInfoFr || "";
  }

  /**
   * Localized display name (falls back to the other language if missing).
   * @param {boolean} preferEnglish
   */
  localizedName(preferEnglish = true) {
    const en = this._toProperCase(this.primaryName);
    const fr = this._toProperCase(this.fr_primaryName);
    return preferEnglish ? en || fr : fr || en;
  }

  /**
   * Localized community / location label.
   * @param {boolean} preferEnglish
   */
  localizedLocation(preferEnglish = true) {
    const en = this.communityName || "";
    const fr = this.fr_communityName || "";
    return preferEnglish ? en || fr : fr || en;
  }

  /**
   * Localized designation level string.
   * @param {boolean} preferEnglish
   */
  localizedDesignation(preferEnglish = true) {
    const en = this.designations?.[0]?.level || "";
    const fr = this.designations?.[0]?.levelFr || this.fr_designations || "";
    return preferEnglish ? en || fr : fr || en;
  }

  /**
   * Convert text to proper case (first letter of each word capitalized)
   * @private
   */
  _toProperCase(text) {
    if (!text) return "";

    return text
      .toLowerCase()
      .split(" ")
      .map((word) => {
        // Handle special cases like "of", "the", and "and" in the middle of titles
        const smallWords = [
          "of",
          "the",
          "and",
          "or",
          "but",
          "in",
          "on",
          "at",
          "to",
          "for",
          "with",
          "by",
        ];
        if (smallWords.includes(word)) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  /**
   * Convert YHIS ThumbFile buffer payload to a data URL
   * @private
   */
  _thumbFileToDataUrl(thumbFile) {
    const buffer = thumbFile?.data;
    if (!buffer?.length) return null;

    try {
      const binary = buffer.reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      );
      return `data:image/jpeg;base64,${btoa(binary)}`;
    } catch {
      return null;
    }
  }

  /**
   * Parse designations from the API data
   * @private
   */
  _parseDesignations(data) {
    if (!data.designations && !data.fr_designations) return [];

    // If designations is already an array with the correct structure, return it
    if (Array.isArray(data.designations) && data.designations[0]?.level) {
      return data.designations;
    }

    // If designations is a string (from API), create a basic structure
    return [
      {
        level: data.designations || "",
        levelFr: data.fr_designations || "",
        date: data.recognitionDate ? data.recognitionDate.split("T")[0] : null,
        bylaw: "", // API doesn't provide this yet
        reasons: [], // API doesn't provide this yet
      },
    ];
  }

  /**
   * Parse heritage values from the API data
   * @private
   */
  _parseHeritageValues(data) {
    if (!data.heritageValueEn) return [];

    return [
      {
        items: data.heritageValueEn.split("\n").filter(Boolean),
      },
    ];
  }

  /**
   * Parse cultural history from the API data
   * @private
   */
  _parseCulturalHistory(data) {
    return data.heritageValueEn || "";
  }

  /**
   * Parse historical sources from the API data
   * @private
   */
  _parseHistoricalSources(data) {
    // If already an array, return as is
    if (Array.isArray(data.historicalSources)) {
      // If array of objects with 'content', flatten to array of strings
      if (data.historicalSources[0]?.content) {
        return data.historicalSources.flatMap((hs) => hs.content);
      }
      return data.historicalSources;
    }
    // If it's a string, wrap in array
    if (typeof data.historicalSources === "string") {
      return [data.historicalSources];
    }
    // If undefined or null, return empty array
    return [];
  }

  /**
   * Create a Place instance from API data
   * @static
   */
  static fromApi(data) {
    return new Place(data);
  }

  /**
   * Create a Place instance from mock data
   * @static
   */
  static fromMock(data) {
    return new Place({
      id: data.placeId,
      primaryName: data.name,
      fr_primaryName: data.nameFr || "",
      communityName: data.location,
      fr_communityName: data.locationFr || "",
      placeDescriptionEn: data.description,
      latitude: data.coordinates[0],
      longitude: data.coordinates[1],
      designations: data.designations?.[0]?.level,
      fr_designations: data.designations?.[0]?.levelFr || "",
      recognitionDate: data.designations?.[0]?.date,
      heritageValueEn: data.culturalHistory,
      characterDefEn: data.heritageValues?.[0]?.items?.join("\n"),
      yHSIId: data.yhsiId,
      ThumbFile: data.ThumbFile,
    });
  }
}
