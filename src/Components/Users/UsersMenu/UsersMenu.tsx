import { FC, useState } from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";
import cn from "classnames";
import {
  useAddUserMutation,
  useDeleteUsersMutation,
} from "../../../hooks/useMutations";
import { TUserCreateDTO } from "../../../types/User";

import classes from "./UsersMenu.module.css";
import { removeEmptyFields } from "../../../utils/helper";
import ConfirmationForm from "../../ConfirmationForm/ConfirmationForm";
import AddUserDialog from "../../../entities/user/ui/addUserDialog/AddUserDialog";

const ADD_USER_FORM_NAME = "add-user-form";

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
    onSettled: handleCloseAddDialog,
  });
  const { deleteUsers, deleteUsersStatus } = useDeleteUsersMutation({
    onSuccess: () => {
      resetSelectedUsers(selectedUserIdList);
      handleCloseDeleteDialog();
    },
    // onSettled: handleCloseDeleteDialog,
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

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Добавить пользователя</DialogTitle>
        <ConfirmationForm
          name={ADD_USER_FORM_NAME}
          onCancel={handleCloseDeleteDialog}
          onSubmit={handleDeleteUser}
          content={`Вы действительно хотите удалить выбранных пользователей (${selectedUserIdList?.length})?`}
        />
      </Dialog>
    </div>
  );
};

export default UsersMenu;
