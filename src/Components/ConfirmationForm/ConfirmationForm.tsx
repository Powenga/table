import { Button, Typography } from "@mui/material";
import { FC, SyntheticEvent } from "react";

interface Props {
  name: string;
  onSubmit: () => void;
  onCancel: () => void;
  content?: string;
}

const ConfirmationForm: FC<Props> = ({ name, onSubmit, onCancel, content }) => {
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form name={name} onSubmit={handleSubmit}>
      <Typography>{content}</Typography>
      <div>
        <Button type="button" variant="outlined" onClick={onCancel}>
          Отменить
        </Button>
        <Button type="submit" variant="contained">
          Удалить
        </Button>
      </div>
    </form>
  );
};

export default ConfirmationForm;
