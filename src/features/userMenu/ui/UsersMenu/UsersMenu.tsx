import { FC, useState } from "react";
import { Button } from "@mui/material";
import cn from "classnames";
import {
  useAddUserMutation,
  useDeleteUsersMutation,
} from "../../model/useMutations";
import { AddUserDialog } from "../../../../entities/user";
import { TUserCreateDTO } from "../../../../shared/api/user";
import { removeEmptyFields } from "../../../../shared/lib";
import Dialog from "../../../../shared/ui/Dialog/Dialog";

import classes from "./UsersMenu.module.css";
import { socket } from "../../../../shared/api/socket";
import { UPDATE_MESSAGE } from "../../../../shared/config/config";

const sendUpdateMessage = () => socket.emit(UPDATE_MESSAGE);

const DELETE_USERS_FORM_NAME = "Удалить пользователей";

const BUTTONS = {
  submitButton: {
    label: "Удалить",
    variant: "contained" as const,
    color: "secondary" as const,
  },
  cancelButton: {
    label: "Отменить",
    variant: "outlined" as const,
  },
};

interface IProps {
  selectedUserIdList: string[];
  resetSelectedUsers: (removedUserIdList: string[]) => void;
  className?: string;
}

export const UsersMenu: FC<IProps> = ({
  selectedUserIdList,
  resetSelectedUsers,
  className,
}) => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const { addUser, addUserStatus } = useAddUserMutation({
    onSuccess: () => {
      handleCloseAddDialog();
      sendUpdateMessage();
    },
  });

  const { deleteUsers, deleteUsersStatus } = useDeleteUsersMutation({
    onSuccess: () => {
      resetSelectedUsers(selectedUserIdList);
      handleCloseDeleteDialog();
      sendUpdateMessage();
    },
  });

  const handleAddUser = (fields: TUserCreateDTO) => {
    removeEmptyFields(fields);
    addUser(fields);
  };

  const handleDeleteUser = () => {
    deleteUsers(selectedUserIdList);
  };

  return (
    <div className={cn(classes["users-menu"], className)}>
      <Button type="button" variant="contained" onClick={handleOpenAddDialog}>
        Добавить пользователя
      </Button>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        onClick={handleOpenDeleteDialog}
        disabled={Boolean(!selectedUserIdList?.length)}
      >
        Удалить выбранные
      </Button>
      <AddUserDialog
        open={openAddDialog}
        onSubmit={handleAddUser}
        onCancel={handleCloseAddDialog}
        isSubmiting={addUserStatus === "pending"}
      />
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        title={DELETE_USERS_FORM_NAME}
        onSubmit={handleDeleteUser}
        onCancel={handleCloseDeleteDialog}
        isSubmiting={deleteUsersStatus === "pending"}
        submitButton={BUTTONS.submitButton}
        cancelButton={BUTTONS.cancelButton}
      >
        {`Вы действительно хотите удалить выбранных пользователей (${selectedUserIdList?.length})?`}
      </Dialog>
    </div>
  );
};
