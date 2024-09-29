import { FC, useState } from "react";
import { Button } from "@mui/material";
import cn from "classnames";
import {
  useAddUserMutation,
  useDeleteUsersMutation,
} from "../../../hooks/useMutations";
import { TUserCreateDTO } from "../../../types/User";
import { removeEmptyFields } from "../../../utils/helper";
import AddUserDialog from "../../../entities/user/ui/addUserDialog/AddUserDialog";
import Dialog from "../../../shared/ui/dialog/Dialog";

import classes from "./UsersMenu.module.css";

const DELETE_USERS_FORM_NAME = "Удалить пользователей";

const BUTTONS = {
  submitButton: {
    label: "Удалить",
    variant: "contained" as const,
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

const UsersMenu: FC<IProps> = ({
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
    onSuccess: handleCloseAddDialog,
  });

  const { deleteUsers, deleteUsersStatus } = useDeleteUsersMutation({
    onSuccess: () => {
      resetSelectedUsers(selectedUserIdList);
      handleCloseDeleteDialog();
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
        onClick={handleOpenDeleteDialog}
        disabled={Boolean(!selectedUserIdList?.length)}
      >
        Удалить выбранные
      </Button>
      <AddUserDialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
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

export default UsersMenu;
