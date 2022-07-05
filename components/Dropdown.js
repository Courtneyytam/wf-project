import React, { useCallback, useEffect, useState } from "react";
import { Select } from "@shopify/polaris";

export default function Dropdown(props) {
  const [selected, setSelected] = useState(props.selected);
  const handleSelectChange = useCallback(
    (value) => {
      setSelected(value);
      props.updateSelected(value);
    },
    [props]
  );

  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  let options = props.options;
  if (props.selected == "") {
    options = [{ value: "", label: "Select" }].concat(props.options);
  }

  return (
    <Select
      label="Theme to edit"
      options={options}
      onChange={handleSelectChange}
      value={selected}
      disabled={props.disabled}
    />
  );
}
