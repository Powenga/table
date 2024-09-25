import { FC } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../Table/Table";
import { data } from "../../data";
import { IUser } from "../../types/user";

import classes from "./Users.module.css";

const Users: FC = () => {
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
    }),
  ];

  return (
    <Table
      className={classes["users__table"]}
      data={data}
      columns={columns}
      enableColumnResizing
    />
  );
};

export default Users;
