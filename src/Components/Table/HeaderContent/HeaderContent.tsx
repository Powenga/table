import { flexRender, Header } from "@tanstack/react-table";
import classNames from "classnames";
import Filter from "../Filter/Filter";
import arrowSrc from "./arrow.svg";

import classes from "./HeaderContent.module.css";

interface Props<T> {
  header: Header<T, unknown>;
}

const HeaderContent = <T,>(props: Props<T>) => {
  const { header } = props;

  const renderArrow = () => {
    const direction = header.column.getIsSorted();
    if (!direction) {
      return null;
    }
    return (
      <img
        src={arrowSrc}
        className={classNames(
          classes["header__arrow"],
          direction === "asc" && classes["header__arrow_type_asc"]
        )}
      />
    );
  };

  return (
    <>
      <button
        type="button"
        className={classes["header__content"]}
        disabled={!header.column.getCanSort()}
        onClick={header.column.getToggleSortingHandler()}
      >
        <span>
          {flexRender(header.column.columnDef.header, header.getContext())}
        </span>
        {renderArrow()}
      </button>

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
