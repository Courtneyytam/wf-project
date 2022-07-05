import React, { useCallback, useState } from "react";
import { Autocomplete, Icon, TextField } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";

export default function AutocompleteExample(props) {
  var deselectedOptions = [];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  const escapeRegExp = function (string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  };

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        props.updateFilter(null);
        setOptions([]);
        return;
      } else if (deselectedOptions.length == 0) {
        deselectedOptions = props.itemList;
      }

      const filterRegex = new RegExp(escapeRegExp(value), "i");
      props.updateFilter(filterRegex);
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      // setOptions(resultOptions); // uncomment to enable autocomplete suggestions
    },
    [deselectedOptions]
  );

  const updateSelection = useCallback((selected) => {
    const selectedValue = selected.map((selectedItem) => {
      const matchedOption = deselectedOptions.find((option) => {
        return option.value.match(selectedItem);
      });
      props.updateFilter(new RegExp(selectedItem, "i"));
      return matchedOption && matchedOption.label;
    });

    setSelectedOptions(selected);
    setInputValue(selectedValue);
  }, []);

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="inkLighter" />}
      placeholder="Search"
    />
  );

  return (
    <div style={props.style ? props.style : { height: "75px" }}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
        loading={false}
        preferredPosition="above"
      />
    </div>
  );
}
