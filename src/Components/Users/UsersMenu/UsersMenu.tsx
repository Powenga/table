import { FC, useState } from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";
import cn from "classnames";
import { useAddUserMutation } from "../../../hooks/useMutations";
import { TUserCreateDTO } from "../../../types/user";
import UserForm from "../UserForm/UserForm";

import classes from "./UsersMenu.module.css";

const ADD_USER_FORM_NAME = "add-user-form";

interface IProps {
  className?: string;
}

const UsersMenu: FC<IProps> = ({ className }) => {
  const [openAddModalDialog, setOpenAddModlaDialog] = useState(false);

  const handleOpenAddModalDialog = () => setOpenAddModlaDialog(true);
  const handleCloseAddModalDialog = () => setOpenAddModlaDialog(false);

  const { addUser, addUserStatus } = useAddUserMutation(
    handleCloseAddModalDialog
  );

  const handleAddUser = (fields: TUserCreateDTO) => {
    addUser(fields);
  };
  return (
    <div className={cn(classes["users-menu"], className)}>
      <Button
        type="button"
        variant="contained"
        onClick={handleOpenAddModalDialog}
      >
        Добавить пользователя
      </Button>
      <Dialog open={openAddModalDialog} onClose={handleCloseAddModalDialog}>
        <DialogTitle>Добавить пользователя</DialogTitle>
        <UserForm
          name={ADD_USER_FORM_NAME}
          onCancel={handleCloseAddModalDialog}
          onSubmit={handleAddUser}
        />
      </Dialog>
    </div>
  );
};

export default UsersMenu;
