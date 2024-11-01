import { FC, useCallback, useEffect, useState } from "react";
import { createColumnHelper, RowSelectionState } from "@tanstack/react-table";
import { Checkbox } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Table } from "../../../shared/ui/Table";
import { GET_USERS_QUERY_KEY, useGetUsersQuery } from "../../../entities/user";
import { IUser } from "../../../shared/api/user";
import { multiSelectFilterFunction } from "../../../shared/lib";
import { UsersMenu } from "../../../features/userMenu";
import { socket } from "../../../shared/api/socket";
import { UPDATE_MESSAGE } from "../../../shared/config/config";

import classes from "./Users.module.css";

const FILTER_FN = multiSelectFilterFunction;

export const Users: FC = () => {
  const queryClient = useQueryClient();
  const { users } = useGetUsersQuery();
  const columnHelper = createColumnHelper<IUser>();

  const [selectedUsers, setSelectedUsers] = useState<RowSelectionState>({});

  const updataMessageHandler = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [GET_USERS_QUERY_KEY] });
  }, [queryClient]);

  useEffect(() => {
    socket.on(UPDATE_MESSAGE, updataMessageHandler);
  }, [updataMessageHandler]);

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
      size: 50,
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
        enableColumnResizing={false}
      />
    </>
  );
};
