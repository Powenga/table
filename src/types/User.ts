export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  mobileNumber: string;
  email: string;
  address: string;
}

export type TUserCreateDTO = Omit<IUser, "id">;
