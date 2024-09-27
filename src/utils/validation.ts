import * as yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";

const MAX_USER_NAME_LENGTH = 200;
const MAX_USER_ADDRESS_LENGTH = 2000;

const MESSAGES = {
  required: "Обязательное поле",
  phoneNumber: "Неверный формат номера телефона",
  email: "Неверный формат email",
  max: "Значение слишком большое",
};

const testPhoneNumber = (value: string | undefined) => {
  if (!value) {
    return true;
  }
  return isValidPhoneNumber(value);
};

const firstLastNameSchema = yup
  .string()
  .required(MESSAGES.required)
  .max(MAX_USER_NAME_LENGTH, MESSAGES.max);

const phoneNumberSchema = yup
  .string()
  .test("phone-number-test", MESSAGES.phoneNumber, testPhoneNumber)
  .defined();

export const createUserSchema = yup
  .object({
    firstName: firstLastNameSchema,
    lastName: firstLastNameSchema,
    phoneNumber: phoneNumberSchema,
    mobileNumber: phoneNumberSchema,
    email: yup.string().email(MESSAGES.email).defined(),
    address: yup.string().max(MAX_USER_ADDRESS_LENGTH, MESSAGES.max).defined(),
  })
  .required();
