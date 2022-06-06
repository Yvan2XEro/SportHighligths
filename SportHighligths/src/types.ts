export type MediaPickable = {
  uri: string;
  mime: string;
  width?: number;
  height?: number;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  dateJoined: Date
  followersCount: number;
  followingsCount: number;
  publicationsCount: number;
  followed: boolean;
}

export type RegisterUser = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  // passwordConfirmation?: string;
}