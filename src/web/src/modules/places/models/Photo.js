/**
 * Photo model class for handling photo data from the API
 */
export class PhotoModel {
  /**
   * @param {Object} data - The photo data from the API
   * @param {string} data.rowId - Unique row identifier (UUID)
   * @param {number} data.id - The photo ID
   * @param {number} data.placeId - The place ID this photo belongs to
   * @param {string} data.originalFileName - Original file name
   * @param {string} data.featureName - Feature name
   * @param {number} data.communityId - Community ID
   * @param {string} data.nTSMapNumber - NTS map number
   * @param {string|null} data.address - Address
   * @param {string} data.dateCreated - Date the photo record was created
   * @param {string|null} data.datePhotoTaken - Date the photo was taken
   * @param {string|null} data.yHSIRecord - YHSI record
   * @param {string|null} data.bordenRecord - Borden record
   * @param {string|null} data.paleoRecord - Paleo record
   * @param {string|null} data.archivalRecord - Archival record
   * @param {boolean} data.isOtherRecord - Is other record
   * @param {number} data.originalMediaId - Original media ID
   * @param {string|null} data.originalRecord - Original record
   * @param {number} data.mediaStorage - Media storage type
   * @param {string|null} data.comments - Comments
   * @param {string|null} data.caption - Photo caption
   * @param {number} data.copyright - Copyright code
   * @param {string|null} data.creditLine - Credit line
   * @param {number} data.ownerId - Owner ID
   * @param {number} data.photoProjectId - Photo project ID
   * @param {number} data.program - Program code
   * @param {string|null} data.creator - Creator/photographer
   * @param {string|null} data.communityName - Community name
   * @param {string|null} data.location - Location
   * @param {number} data.usageRights - Usage rights code
   * @param {boolean} data.isComplete - Is the record complete
   * @param {number} data.imageHeight - Image height in pixels
   * @param {number} data.imageWidth - Image width in pixels
   * @param {number} data.rating - Rating
   * @param {string|null} data.subjects - Subjects
   * @param {string|null} data.legacyBatchInfo - Legacy batch info
   * @param {boolean} data.isSiteDefault - Is site default photo
   * @param {boolean} data.isPrivate - Is private
   * @param {Object} data.ThumbFile - The thumbnail file data
   * @param {string} [data.primaryName] - Primary name of the place (legacy)
   * @param {string} [data.description] - Photo description (legacy)
   * @param {string} [data.dateTaken] - Date when the photo was taken (legacy)
   * @param {string} [data.url] - Direct URL to the photo (legacy)
   * @param {string} [data.fileType] - Type of the file (legacy)
   * @param {number} [data.fileSize] - Size of the file (legacy)
   * @param {number} [data.width] - Width of the image (legacy)
   * @param {number} [data.height] - Height of the image (legacy)
   * @param {boolean} [data.isPrimary] - Whether this is the primary photo (legacy)
   * @param {boolean} [data.isPublic] - Whether the photo is public (legacy)
   * @param {string} [data.createdAt] - Creation timestamp (legacy)
   * @param {string} [data.updatedAt] - Last update timestamp (legacy)
   */
  constructor(data) {
    this.rowId = data.rowId;
    this.id = data.id;
    this.placeId = data.placeId;
    this.originalFileName = data.originalFileName;
    this.featureName = data.featureName;
    this.communityId = data.communityId;
    this.nTSMapNumber = data.nTSMapNumber;
    this.address = data.address;
    this.dateCreated = data.dateCreated;
    this.datePhotoTaken = data.datePhotoTaken;
    this.yHSIRecord = data.yHSIRecord;
    this.bordenRecord = data.bordenRecord;
    this.paleoRecord = data.paleoRecord;
    this.archivalRecord = data.archivalRecord;
    this.isOtherRecord = data.isOtherRecord;
    this.originalMediaId = data.originalMediaId;
    this.originalRecord = data.originalRecord;
    this.mediaStorage = data.mediaStorage;
    this.comments = data.comments;
    this.caption = data.caption;
    this.copyright = data.copyright;
    this.creditLine = data.creditLine;
    this.ownerId = data.ownerId;
    this.photoProjectId = data.photoProjectId;
    this.program = data.program;
    this.creator = data.creator;
    this.communityName = data.communityName;
    this.location = data.location;
    this.usageRights = data.usageRights;
    this.isComplete = data.isComplete;
    this.imageHeight = data.imageHeight;
    this.imageWidth = data.imageWidth;
    this.rating = data.rating;
    this.subjects = data.subjects;
    this.legacyBatchInfo = data.legacyBatchInfo;
    this.isSiteDefault = data.isSiteDefault;
    this.isPrivate = data.isPrivate;
    this.ThumbFile = data.ThumbFile;
    // Legacy/optional fields
    this.primaryName = data.primaryName;
    this.description = data.description;
    this.dateTaken = data.dateTaken;
    this.url = data.url;
    this.fileType = data.fileType;
    this.fileSize = data.fileSize;
    this.width = data.width;
    this.height = data.height;
    this.isPrimary = data.isPrimary;
    this.isPublic = data.isPublic;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Gets the URL for the photo
   * @returns {string} URL for the photo
   */
  get imageUrl() {
    return `/api/register/${this.placeId}/photos/${this.id}`;
  }

  /**
   * Gets the display name for the photo
   * @returns {string} Human-readable name for the photo
   */
  get displayName() {
    return (
      this.featureName ||
      this.primaryName ||
      this.communityName ||
      `Photo ${this.id}`
    );
  }

  /**
   * Gets the caption or description for the photo
   * @returns {string} Photo caption or description
   */
  get displayCaption() {
    return this.caption || this.comments || this.description || "";
  }
}
