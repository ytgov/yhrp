export interface Place {
  id: number;
  name: string;
  recognitionDate: Date;
  status: string;
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

export interface Photo {
  id: number;
  url: string;
  caption: string;
}

export interface PhotoFile {
  file: Buffer;
}

export interface Description {
  type: number;
  descriptionText: string;
}

export interface RegisterService {
  getRegisterAll(_skip: number, _take: number): Promise<Place[]>;
  getPlaceInRegisterCount(): Promise<number>;
  getRegisterById(_id: number): Promise<Place | null>;
}

export interface DescriptionService {
  getForPlace(_id: number): Promise<Description[]>;
}

export interface PhotoService {
  getAllForPlace(_id: number): Promise<Photo[]>;
  getFileById(_id: string): Promise<PhotoFile | null>;
}

// TODO: Implement actual service with database calls
export class RegisterServiceImpl implements RegisterService {
  async getRegisterAll(_skip: number, _take: number): Promise<Place[]> {
    // TODO: Implement actual database query
    throw new Error("Not implemented");
  }

  async getPlaceInRegisterCount(): Promise<number> {
    // TODO: Implement actual database query
    throw new Error("Not implemented");
  }

  async getRegisterById(_id: number): Promise<Place | null> {
    // TODO: Implement actual database query
    throw new Error("Not implemented");
  }
}

export class DescriptionServiceImpl implements DescriptionService {
  async getForPlace(_id: number): Promise<Description[]> {
    // TODO: Implement actual database query
    throw new Error("Not implemented");
  }
}

export class PhotoServiceImpl implements PhotoService {
  async getAllForPlace(_id: number): Promise<Photo[]> {
    // TODO: Implement actual database query
    throw new Error("Not implemented");
  }

  async getFileById(_id: string): Promise<PhotoFile | null> {
    // TODO: Implement actual file retrieval
    throw new Error("Not implemented");
  }
}
