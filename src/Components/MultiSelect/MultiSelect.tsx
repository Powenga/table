import { ChangeEventHandler, FC, useEffect, useState } from "react";
import classes from "./MultiSelect.module.css";

const DEBOUNCE = 200;

interface Props {
  options: string[];
}

const Multiselect: FC<Props> = ({ options }) => {
  const [searchString, setSearchString] = useState<string>("");
  const [filterdOptions, setFilteredOptions] = useState<string[]>([]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setSearchString(event.target.value);
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
              <input type="checkbox" value={option} />
              <span>{option}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Multiselect;
