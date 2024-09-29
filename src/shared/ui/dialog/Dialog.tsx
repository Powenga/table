import { FC, PropsWithChildren } from "react";
import {
  Button,
  Dialog as MUIDialog,
  DialogTitle,
  Box,
  CircularProgress,
} from "@mui/material";

const PADDING = "16px 24px";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  title?: string;
  submitButton: {
    label: string;
    variant: "text" | "outlined" | "contained";
    color?: "primary" | "secondary";
  };
  isSubmitButtonDisabled?: boolean;
  isSubmiting?: boolean;
  cancelButton: {
    label: string;
    variant: "text" | "outlined" | "contained";
    color?: "primary" | "secondary";
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
          padding: PADDING,
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: PADDING,
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <Button
          type="button"
          variant={cancelButton.variant}
          onClick={onCancel}
          color={cancelButton.color}
        >
          {cancelButton.label}
        </Button>
        <Button
          sx={{ position: "relative" }}
          type="submit"
          variant={submitButton.variant}
          color={submitButton.color}
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
