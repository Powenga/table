import { ChangeEventHandler, FC, useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  ListItem,
  Typography,
} from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import classes from "./MultiSelect.module.css";

const DEBOUNCE = 200;
const DEFAULT_WIDTH = 250;
const DEFAULT_HEIGHT = 250;
const ROW_HEIGHT = 40;
const OVERSCAN_COUNT = 5;

interface Props {
  selectedValues: string[];
  setSelectedValues: (selectedValues: string[]) => void;
  width?: number;
  options: string[];
}

const Multiselect: FC<Props> = ({
  selectedValues,
  setSelectedValues,
  width,
  options,
}) => {
  const [searchString, setSearchString] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setSearchString(event.target.value);
  };

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedValues([...selectedValues, event.target.value]);
    } else {
      setSelectedValues(
        selectedValues.filter((value) => value !== event.target.value)
      );
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredOptions(
        options.filter((option) =>
          option.toLowerCase().includes(searchString.toLocaleLowerCase())
        )
      );
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
              value={item.label}
              onChange={handleChangeValue}
              checked={item.checked}
            />
          }
          label={
            <Typography overflow="hidden" textOverflow="ellipsis">
              {item.label}
            </Typography>
          }
        />
      </ListItem>
    );
  }

  return (
    <div className={classes.multiselect}>
      <Typography variant="subtitle1" className={classes["multiselect__title"]}>
        Фильтр
      </Typography>
      <input
        type="text"
        value={searchString}
        onChange={handleSearch}
        className={classes["multiselect__input"]}
      />
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
    </div>
  );
};

export default Multiselect;
