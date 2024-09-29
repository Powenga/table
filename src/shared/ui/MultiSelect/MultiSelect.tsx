import { ChangeEventHandler, FC, useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  IconButton,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import DeleteIcon from "@mui/icons-material/Delete";
import { matchSorter } from "match-sorter";

import classes from "./MultiSelect.module.css";

const DEBOUNCE = 200;
const DEFAULT_WIDTH = 250;
const DEFAULT_HEIGHT = 250;
const ROW_HEIGHT = 40;
const OVERSCAN_COUNT = 5;

type TValue = string | null;

interface Props {
  selectedValues: TValue[];
  setSelectedValues: (selectedValues: TValue[]) => void;
  width?: number;
  options: TValue[];
}

const Multiselect: FC<Props> = ({
  selectedValues,
  setSelectedValues,
  width,
  options,
}) => {
  const [searchString, setSearchString] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<TValue[]>([]);

  const hasFilters = Boolean(selectedValues.length);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setSearchString(event.target.value);
  };

  const handleDeleteValue = (value: TValue) => {
    setSelectedValues(
      selectedValues.filter((selectedValue) => selectedValue !== value)
    );
  };

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    const isChecked = event.target.checked;
    const value = event.target.value || null;

    if (isChecked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      handleDeleteValue(value);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredOptions(() => {
        if (!searchString) {
          return options;
        }
        return matchSorter(options, searchString);
      });
    }, DEBOUNCE);

    return () => clearTimeout(timeout);
  }, [options, searchString]);

  const filteredPrepOptions = filteredOptions.map((label) => ({
    label,
    checked: selectedValues.includes(label),
  }));

  function renderRow(props: ListChildComponentProps) {
    const { index, style, data } = props;
    const item = data[index];

    return (
      <ListItem style={style} key={index} disablePadding>
        <FormControlLabel
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          control={
            <Checkbox
              value={item.label || ""}
              onChange={handleChangeValue}
              checked={item.checked}
            />
          }
          label={
            <Typography overflow="hidden" textOverflow="ellipsis">
              {item.label || "-"}
            </Typography>
          }
        />
      </ListItem>
    );
  }

  return (
    <div className={classes.multiselect}>
      <div className={classes["multiselect__title"]}>
        <Typography variant="h6">Фильтр</Typography>
        <IconButton
          area-label="Удалить фильтры"
          disabled={!hasFilters}
          onClick={() => setSelectedValues([])}
        >
          <DeleteIcon
            sx={{ color: hasFilters ? "#d50000" : "disabled" }}
            fontSize="small"
          />
        </IconButton>
      </div>

      <div className={classes["multiselect__input"]}>
        <TextField
          id="outlined-basic"
          label="Поиск"
          variant="outlined"
          size="small"
          value={searchString}
          onChange={handleSearch}
        />
      </div>
      <Box
        sx={{
          width: "100%",
          height: DEFAULT_HEIGHT,
          maxWidth: width || DEFAULT_WIDTH,
          bgcolor: "background.paper",
        }}
      >
        <FixedSizeList
          height={DEFAULT_HEIGHT}
          width={width || DEFAULT_WIDTH}
          itemSize={ROW_HEIGHT}
          itemData={filteredPrepOptions}
          itemCount={filteredPrepOptions.length}
          overscanCount={OVERSCAN_COUNT}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
      {hasFilters && (
        <ul
          className={classes["multiselect__chips"]}
          style={{ width: width || DEFAULT_WIDTH }}
        >
          {selectedValues.map((option) => (
            <li
              key={option}
              className={classes["multiselect__chips-item-wrap"]}
            >
              <Chip
                sx={{
                  fontSize: 12,
                }}
                size="small"
                label={option}
                variant="outlined"
                onDelete={() => handleDeleteValue(option)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Multiselect;
