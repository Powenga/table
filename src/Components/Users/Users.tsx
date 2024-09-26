import { FC, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Button, Dialog, DialogTitle } from "@mui/material";
import { Table } from "../Table/Table";
import { useGetUsersQuery } from "../../hooks/useQueries";
import { IUser, TUserCreateDTO } from "../../types/user";
import UserForm from "./UserForm/UserForm";

import classes from "./Users.module.css";
import { useAddUserMutation } from "../../hooks/useMutations";

const ADD_USER_FORM_NAME = "add-user-form";

const Users: FC = () => {
  const [openAddModalDialog, setOpenAddModlaDialog] = useState(false);
  const { users } = useGetUsersQuery();

  const handleOpenAddModalDialog = () => setOpenAddModlaDialog(true);
  const handleCloseAddModalDialog = () => setOpenAddModlaDialog(false);
  const handleAddUser = (fields: TUserCreateDTO) => {
    addUser(fields);
  };

  const { addUser, addUserStatus } = useAddUserMutation(
    handleCloseAddModalDialog
  );

  const columnHelper = createColumnHelper<IUser>();

  const columns = [
    columnHelper.accessor("lastName", {
      cell: (props) => props.getValue(),
      header: "Фамилия",
      filterFn: "arrIncludesSome",
    }),
    columnHelper.accessor("firstName", {
      cell: (props) => props.getValue(),
      header: "Имя",
      filterFn: "arrIncludesSome",
    }),
    columnHelper.accessor("phoneNumber", {
      cell: (props) => props.getValue(),
      header: "Номер телефона",
      filterFn: "arrIncludesSome",
    }),
    columnHelper.accessor("mobileNumber", {
      cell: (props) => props.getValue(),
      header: "Мобильный телефон",
      filterFn: "arrIncludesSome",
    }),
    columnHelper.accessor("email", {
      cell: (props) => props.getValue(),
      header: "Email",
      filterFn: "arrIncludesSome",
    }),
    columnHelper.accessor("address", {
      cell: (props) => props.getValue(),
      header: "Адрес",
      filterFn: "arrIncludesSome",
      meta: {
        filterWidth: 400,
      },
    }),
  ];

  if (!users) {
    return null;
  }

  return (
    <>
      <div className={classes["users__button-wrap"]}>
        <Button
          type="button"
          variant="contained"
          onClick={handleOpenAddModalDialog}
        >
          Добавить пользователя
        </Button>
      </div>
      <Table
        className={classes["users__table"]}
        data={users}
        columns={columns}
        enableColumnResizing
      />
      <Dialog
        open={openAddModalDialog}
        onClose={handleCloseAddModalDialog}
        maxWidth="lg"
      >
        <DialogTitle>Добавить пользователя</DialogTitle>
        <UserForm
          name={ADD_USER_FORM_NAME}
          onCancel={handleCloseAddModalDialog}
          onSubmit={handleAddUser}
        />
      </Dialog>
    </>
  );
};

export default Users;
