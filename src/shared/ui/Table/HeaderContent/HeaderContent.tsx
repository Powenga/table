import { flexRender, Header } from "@tanstack/react-table";
import cn from "classnames";
import Filter from "../Filter/Filter";
import arrowSrc from "./arrow.svg";

import classes from "./HeaderContent.module.css";

interface Props<T> {
  header: Header<T, unknown>;
  className?: string;
}

const HeaderContent = <T,>(props: Props<T>) => {
  const { header, className } = props;

  const renderHeaderContent = () =>
    flexRender(header.column.columnDef.header, header.getContext());

  const renderArrow = () => {
    const direction = header.column.getIsSorted();
    if (!direction) {
      return null;
    }
    return (
      <img
        src={arrowSrc}
        className={cn(
          classes["header__arrow"],
          direction === "asc" && classes["header__arrow_type_asc"]
        )}
      />
    );
  };

  return (
    <th
      className={cn(className, classes["header-content"])}
      style={{ flexBasis: header.getSize() }}
    >
      {header.column.getCanSort() ? (
        <button
          type="button"
          className={classes["header__sort-button"]}
          onClick={header.column.getToggleSortingHandler()}
        >
          <span>{renderHeaderContent()}</span>
          {renderArrow()}
        </button>
      ) : (
        renderHeaderContent()
      )}

      {header.column.getCanFilter() && (
        <div className={classes["header__filter"]}>
          <Filter column={header.column} />
        </div>
      )}
      {header.column.getCanResize() && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={cn(
            classes["header__resizer"],
            header.column.getIsResizing() &&
              classes["header__resizer_is-resizing"]
          )}
        />
      )}
    </th>
  );
};

export default HeaderContent;
