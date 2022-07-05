import React, { useCallback, useState } from "react";
import { TextField } from "@shopify/polaris";

export default function TemplateNameField(props) {
  const [textFieldValue, setTextFieldValue] = useState(props.name);

  const handleTextFieldChange = useCallback(
    (value) => {
      setTextFieldValue(value);
      props.updateText(value);
    },
    [props]
  );

  return (
    <TextField
      label="Page Name"
      type="text"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      error={
        props.isValid || textFieldValue == ""
          ? null
          : "Page name must be only letters, numbers, underscore, dash, or dot."
      }
      disabled={props.disabled}
    />
  );
}
