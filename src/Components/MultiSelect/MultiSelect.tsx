import { ChangeEventHandler, FC, useEffect, useState } from "react";
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
  const [filterdOptions, setFilteredOptions] = useState<string[]>([]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setSearchString(event.target.value);
  };

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
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
        options.filter((option) => option.toLowerCase().includes(searchString))
      );
    }, DEBOUNCE);

    return () => clearTimeout(timeout);
  }, [options, searchString]);

  return (
    <div className={classes.multiselect}>
      <p className={classes["multiselect__title"]}>Фильтр</p>
      <input
        type="text"
        value={searchString}
        onChange={handleSearch}
        className={classes["multiselect__input"]}
      />
      <ul className={classes["multiselect__options"]}>
        {filterdOptions.map((option) => (
          <li key={option}>
            <label className={classes["multiselect__label"]}>
              <input
                type="checkbox"
                value={option}
                onChange={handleChangeValue}
                checked={selectedValues.includes(option)}
              />
              <span>{option}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Multiselect;
