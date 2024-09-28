import { FC } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../Table/Table";
import { useGetUsersQuery } from "../../hooks/useQueries";
import { IUser } from "../../types/User";
import UsersMenu from "./UsersMenu/UsersMenu";
import { multiSelectFilterFunction } from "../../utils/helper";

import classes from "./Users.module.css";

const FILTER_FN = multiSelectFilterFunction;

const Users: FC = () => {
  const { users } = useGetUsersQuery();
  const columnHelper = createColumnHelper<IUser>();

  const columns = [
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
      <UsersMenu className={classes["users__menu"]} />
      <Table
        className={classes["users__table"]}
        data={users}
        columns={columns}
        enableColumnResizing
      />
    </>
  );
};

export default Users;
