import { FC } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IUser } from "../../../types/user";

import classes from "./UserForm.module.css";

type TFields = Omit<IUser, "id">;

const DEFAULT_VALUES: TFields = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  mobileNumber: "",
  email: "",
  address: "",
};

const FIELDS: {
  name: keyof TFields;
  label: string;
  size: "small" | "medium";
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}[] = [
  {
    name: "lastName",
    label: "Фамилия",
    size: "small",
    required: true,
  },
  {
    name: "firstName",
    label: "Имя",
    size: "small",
    required: true,
  },
  {
    name: "phoneNumber",
    label: "Номер телефона",
    size: "small",
  },
  {
    name: "mobileNumber",
    label: "Номер моб. телефон",
    size: "small",
  },
  {
    name: "email",
    label: "Email",
    size: "small",
  },
  {
    name: "address",
    label: "Адрес",
    size: "small",
    multiline: true,
    rows: 2,
  },
];

interface Props {
  name: string;
  defaultValues?: TFields;
  onSubmit: (fields: TFields) => void;
  onCancel: () => void;
  isSubmiting?: boolean;
}

const UserForm: FC<Props> = ({
  name,
  defaultValues = DEFAULT_VALUES,
  onSubmit,
  onCancel,
  isSubmiting = false,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<TFields>({
    defaultValues,
  });

  const isSubmitButtonDisabled = !isDirty || !isValid || isSubmiting;

  const handleCancel = () => {
    reset(defaultValues);
    onCancel();
  };

  return (
    <form
      name={name}
      onSubmit={handleSubmit(onSubmit)}
      className={classes["user-form"]}
    >
      {FIELDS.map(({ name, label, size, required, rows, multiline }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              label={label}
              size={size}
              value={field.value}
              onChange={field.onChange}
              required={required}
              rows={rows}
              multiline={multiline}
            />
          )}
        />
      ))}

      <div className={classes["user-form__buttons"]}>
        <Button
          type="button"
          variant="outlined"
          onClick={handleCancel}
          disabled={isSubmiting}
        >
          Отменить
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ position: "relative" }}
          disabled={isSubmitButtonDisabled}
        >
          Добавить
          {isSubmiting && (
            <CircularProgress size={24} sx={{ position: "absolute" }} />
          )}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
