import { FC, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Button, Dialog, DialogTitle } from "@mui/material";
import { Table } from "../Table/Table";
import { useGetUsersQuery } from "../../hooks/useQueries";
import { IUser } from "../../types/user";
import UserForm from "./UserForm/UserForm";

import classes from "./Users.module.css";

const ADD_USER_FORM_NAME = "add-user-form";

const Users: FC = () => {
  const { users } = useGetUsersQuery();
  const [openAddModalDialog, setOpenAddModlaDialog] = useState(false);

  const handleOpenAddModalDialog = () => setOpenAddModlaDialog(true);
  const handleCloseAddModalDialog = () => setOpenAddModlaDialog(false);

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
          onSubmit={(fields) => {
            console.log(fields);
          }}
        />
      </Dialog>
    </>
  );
};

export default Users;
