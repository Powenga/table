import { FC, PropsWithChildren } from "react";
import {
  Button,
  Dialog as MUIDialog,
  DialogTitle,
  Box,
  CircularProgress,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  title?: string;
  submitButton: {
    label: string;
    variant: "text" | "outlined" | "contained";
  };
  isSubmitButtonDisabled?: boolean;
  isSubmiting?: boolean;
  cancelButton: {
    label: string;
    variant: "text" | "outlined" | "contained";
  };
}

const Dialog: FC<PropsWithChildren<Props>> = ({
  open,
  onSubmit,
  onCancel,
  onClose,
  title,
  submitButton,
  isSubmitButtonDisabled = false,
  isSubmiting = false,
  cancelButton,
  children,
}) => {
  return (
    <MUIDialog open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <Box
        sx={{
          padding: "24px",
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "24px",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button type="button" variant={cancelButton.variant} onClick={onCancel}>
          {cancelButton.label}
        </Button>
        <Button
          sx={{ position: "relative" }}
          type="submit"
          variant={submitButton.variant}
          onClick={onSubmit}
          disabled={isSubmitButtonDisabled}
        >
          {submitButton.label}
          {isSubmiting && (
            <CircularProgress size={24} sx={{ position: "absolute" }} />
          )}
        </Button>
      </Box>
    </MUIDialog>
  );
};

export default Dialog;
