/**
 * Class representing a Place in the system
 */
export class Place {
  constructor(data) {
    this.placeId = data.id;
    this.id = data.id; // For backward compatibility
    this.name = data.primaryName || data.name || "";
    this.location = data.communityName || data.location || "";
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
    this.photoId = data.id; // Store the photo ID for URL construction
    this.photoUrl = this._generatePhotoUrl(data.id);

    // Additional fields from API
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
   * Generate photo URL for the place
   * @private
   */
  _generatePhotoUrl(id) {
    return `/api/register/${id}/photo`;
  }

  /**
   * Parse designations from the API data
   * @private
   */
  _parseDesignations(data) {
    if (!data.designations) return [];

    // If designations is already an array with the correct structure, return it
    if (Array.isArray(data.designations) && data.designations[0]?.level) {
      return data.designations;
    }

    // If designations is a string (from API), create a basic structure
    return [
      {
        level: data.designations || "",
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
      communityName: data.location,
      placeDescriptionEn: data.description,
      latitude: data.coordinates[0],
      longitude: data.coordinates[1],
      designations: data.designations?.[0]?.level,
      recognitionDate: data.designations?.[0]?.date,
      heritageValueEn: data.culturalHistory,
      characterDefEn: data.heritageValues?.[0]?.items?.join("\n"),
      yHSIId: data.yhsiId,
      ThumbFile: data.ThumbFile,
    });
  }
}
