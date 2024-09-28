import { FC } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TUserCreateDTO } from "../../../types/User";
import { createUserSchema } from "../../../utils/validation";

import classes from "./UserForm.module.css";

const DEFAULT_VALUES: TUserCreateDTO = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  mobileNumber: "",
  email: "",
  address: "",
};

const FIELDS: {
  name: keyof TUserCreateDTO;
  label: string;
  size: "small" | "medium";
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
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
    placeholder: "+7 (777) 777-77-77",
  },
  {
    name: "mobileNumber",
    label: "Номер моб. телефон",
    size: "small",
    placeholder: "+7 (777) 777-77-77",
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
  defaultValues?: TUserCreateDTO;
  onSubmit: (fields: TUserCreateDTO) => void;
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
  } = useForm<TUserCreateDTO>({
    resolver: yupResolver(createUserSchema),
    defaultValues,
    mode: "onTouched",
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
      noValidate
    >
      {FIELDS.map(
        ({ name, label, size, required, rows, multiline, placeholder }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label={label}
                size={size}
                {...field}
                value={field.value}
                onChange={field.onChange}
                required={required}
                rows={rows}
                multiline={multiline}
                error={Boolean(error?.message)}
                helperText={error?.message}
                placeholder={placeholder}
              />
            )}
          />
        )
      )}

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
