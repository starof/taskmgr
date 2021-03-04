export enum IdentityType {
  IdCard = 0,
  Insurance,
  Passport,
  Militory,
  Other
}
export interface Address {
  provice: string,
  city: string,
  district: string,
  street?: string
}

export interface Identity {
  identityNo: string;
  identityType: IdentityType
}
export interface User {
  id?: string;
  email: string;
  name?: string;
  password?: string;
  avatar?: string;
  projectIds?: string[];
  taskIds?: string[];
  address?: Address;
  dateOfBirth?: string;
  identity?: Identity;
}