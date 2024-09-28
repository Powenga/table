export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  mobileNumber: string | null;
  email: string | null;
  address: string | null;
}

export type TUserCreateDTO = Omit<
  IUser,
  "id" | "phoneNumber" | "mobileNumber" | "email" | "address"
> & {
  phoneNumber?: string;
  mobileNumber?: string;
  email?: string;
  address?: string;
};
