import { ChangeEventHandler, FC, useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  ListItem,
  ListItemText,
} from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import classes from "./MultiSelect.module.css";

const DEBOUNCE = 200;

interface Props {
  selectedValues: string[];
  setSelectedValues: (selectedValues: string[]) => void;
  options: string[];
}

const Multiselect: FC<Props> = ({
  selectedValues,
  setSelectedValues,
  options,
}) => {
  const [searchString, setSearchString] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setSearchString(event.target.value);
  };

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    // event.preventDefault();
    const isChecked = event.target.checked;
    console.log(event.target.value, event.target.checked);

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
        options.filter((option) => option.toLowerCase().includes(searchString))
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
    const { items, onChange } = data;
    const item = items[index];

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemText>
          <FormControlLabel
            control={
              <Checkbox
                value={item.label}
                onChange={onChange}
                checked={item.checked}
              />
            }
            label={item.label}
          />
        </ListItemText>
      </ListItem>
    );
  }

  return (
    <div className={classes.multiselect}>
      <p className={classes["multiselect__title"]}>Фильтр</p>
      <input
        type="text"
        value={searchString}
        onChange={handleSearch}
        className={classes["multiselect__input"]}
      />
      <Box
        sx={{
          width: "100%",
          height: 250,
          maxWidth: 250,
          bgcolor: "background.paper",
        }}
      >
        <FixedSizeList
          height={250}
          width={250}
          itemSize={40}
          itemData={{ items: filteredPrepOptions, onChange: handleChangeValue }}
          itemCount={filteredPrepOptions.length}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </div>
  );
};

export default Multiselect;
