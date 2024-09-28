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
  .trim()
  .required(MESSAGES.required)
  .max(MAX_USER_NAME_LENGTH, MESSAGES.max);

const phoneNumberSchema = yup
  .string()
  .trim()
  .test("phone-number-test", MESSAGES.phoneNumber, testPhoneNumber);

export const createUserSchema = yup
  .object({
    firstName: firstLastNameSchema,
    lastName: firstLastNameSchema,
    phoneNumber: phoneNumberSchema,
    mobileNumber: phoneNumberSchema,
    email: yup.string().trim().email(MESSAGES.email),
    address: yup.string().trim().max(MAX_USER_ADDRESS_LENGTH, MESSAGES.max),
  })
  .required();
