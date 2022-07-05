import React, { useCallback, useState } from "react";
import { ChoiceList, Filters } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";

export default function FilterBar(props) {
  const escapeRegExp = function (string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  };

  const [filterTags, setFilterTags] = useState(null);
  const [queryValue, setQueryValue] = useState(null);

  const handlefilterTagsChange = useCallback((value) => {
    if (value.length) {
      props.updateFilterTags(value);
    } else {
      props.updateFilterTags(null);
    }

    setFilterTags(value);
  }, []);
  const handleFiltersQueryChange = useCallback((value) => {
    if (value === "") {
      props.updateFilter(null);
    } else {
      let filterRegex = new RegExp(escapeRegExp(value), "i");
      props.updateFilter(filterRegex);
    }
    setQueryValue(value);
  }, []);
  const handlefilterTagsRemove = useCallback(() => {
    props.updateFilterTags(null);
    setFilterTags(null);
  }, []);
  const handleQueryValueRemove = useCallback(() => {
    props.updateFilter(null);
    setQueryValue(null);
  }, []);
  const handleFiltersClearAll = useCallback(() => {
    handlefilterTagsRemove();
    handleQueryValueRemove();
  }, [handlefilterTagsRemove, handleQueryValueRemove]);

  const filters = [
    {
      key: "tags",
      label: "Filter",
      filter: (
        <ChoiceList
          title="Filter"
          titleHidden
          choices={props.tagList.map((tag) => {
            return { label: tag, value: tag };
          })}
          selected={filterTags || []}
          onChange={handlefilterTagsChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];

  let appliedFilters = [];
  if (!isEmpty(filterTags)) {
    const key = "tags";
    let tagList = filterTags.map((tag) => ({
      key: key + "-" + tag,
      label: tag,
      onRemove: () => {
        let newTagList = filterTags.filter((tagName) => tagName !== tag);
        setFilterTags(newTagList);
        handlefilterTagsChange(newTagList);
      },
    }));
    appliedFilters = appliedFilters.concat(tagList);
  }

  return (
    <div style={{ height: "80px" }}>
      <Filters
        queryValue={queryValue}
        filters={filters}
        appliedFilters={appliedFilters}
        onQueryChange={handleFiltersQueryChange}
        onQueryClear={handleQueryValueRemove}
        onClearAll={handleFiltersClearAll}
        queryPlaceholder="Search"
      />
    </div>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case "tags":
        return value.join(", ");
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
}
