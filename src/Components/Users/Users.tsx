import { FC, useState } from "react";
import { createColumnHelper, RowSelectionState } from "@tanstack/react-table";
import { Checkbox } from "@mui/material";
import { Table } from "../../shared/ui/Table/Table";
import { useGetUsersQuery } from "../../entities/user";
import { IUser } from "../../shared/api/user";
import { multiSelectFilterFunction } from "../../shared/lib";
import { UsersMenu } from "../../features/userMenu";

import classes from "./Users.module.css";

const FILTER_FN = multiSelectFilterFunction;

const Users: FC = () => {
  const { users } = useGetUsersQuery();
  const columnHelper = createColumnHelper<IUser>();

  const [selectedUsers, setSelectedUsers] = useState<RowSelectionState>({});

  const columns = [
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          size="small"
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          size="small"
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
      size: 38,
    }),
    columnHelper.accessor("lastName", {
      cell: (props) => props.getValue(),
      header: "Фамилия",
      filterFn: FILTER_FN,
    }),
    columnHelper.accessor("firstName", {
      cell: (props) => props.getValue(),
      header: "Имя",
      filterFn: FILTER_FN,
    }),
    columnHelper.accessor("phoneNumber", {
      cell: (props) => props.getValue(),
      header: "Номер телефона",
      filterFn: FILTER_FN,
    }),
    columnHelper.accessor("mobileNumber", {
      cell: (props) => props.getValue(),
      header: "Мобильный телефон",
      filterFn: FILTER_FN,
    }),
    columnHelper.accessor("email", {
      cell: (props) => props.getValue(),
      header: "Email",
      filterFn: FILTER_FN,
    }),
    columnHelper.accessor("address", {
      cell: (props) => props.getValue(),
      header: "Адрес",
      filterFn: FILTER_FN,
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
      <UsersMenu
        selectedUserIdList={Object.entries(selectedUsers)
          .filter(([key, value]) => value && key)
          .map(([key]) => key)}
        resetSelectedUsers={() => setSelectedUsers({})}
        className={classes["users__menu"]}
      />
      <Table
        className={classes["users__table"]}
        data={users}
        columns={columns}
        rowIdGetter={(row) => row.id}
        rowSelection={selectedUsers}
        setRowSelection={setSelectedUsers}
        enableColumnResizing
      />
    </>
  );
};

export default Users;
