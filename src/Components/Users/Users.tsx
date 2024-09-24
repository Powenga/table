import { FC } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../Table/Table";
import { User } from "../../types/user";
import { data } from "../../data";

const Users: FC = () => {
  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor("lastName", {
      cell: (props) => props.getValue(),
      header: "Фамиля",
    }),
    columnHelper.accessor("firstName", {
      cell: (props) => props.getValue(),
      header: "Имя",
    }),
    columnHelper.accessor("phoneNumber", {
      cell: (props) => props.getValue(),
      header: "Номер телефона",
    }),
    columnHelper.accessor("mobileNumber", {
      cell: (props) => props.getValue(),
      header: "Мобильный телефон",
    }),
    columnHelper.accessor("email", {
      cell: (props) => props.getValue(),
      header: "Email",
    }),
    columnHelper.accessor("address", {
      cell: (props) => props.getValue(),
      header: "Адрес",
    }),
  ];

  return <Table data={data} columns={columns} />;
};

export default Users;
