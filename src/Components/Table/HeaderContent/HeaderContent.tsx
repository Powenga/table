import { flexRender, Header } from "@tanstack/react-table";
import Filter from "../Filter/Filter";

import classes from "./HeaderContent.module.css";
import classNames from "classnames";

interface Props<T> {
  header: Header<T, unknown>;
}

const HeaderContent = <T,>(props: Props<T>) => {
  const { header } = props;
  return (
    <>
      {flexRender(header.column.columnDef.header, header.getContext())}

      {header.column.getCanFilter() && (
        <div className={classes["header__filter"]}>
          <Filter column={header.column} />
        </div>
      )}
      {header.column.getCanResize() && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={classNames(
            classes["header__resizer"],
            header.column.getIsResizing() &&
              classes["header__resizer_is-resizing"]
          )}
        />
      )}
    </>
  );
};

export default HeaderContent;
