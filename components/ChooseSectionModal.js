import React, { Fragment, useCallback, useState } from "react";
import { Button, Modal, Tabs } from "@shopify/polaris";
import SectionListEntry from "./SectionListEntry";
import SectionListEntryLargeRaw from "./SectionListEntryLargeRaw";
import SearchBar from "./SearchBar";
import "./ChooseSectionModal.css";

export default function ModalWithScrollListenerExample(props) {
  const [active, setActive] = useState(false);
  const [boodlOnly, setBoodlOnly] = useState(false);
  const [filter, setFilter] = useState(null);
  const handleChange = useCallback(() => {
    setActive(!active);
    setFilter(null);
  }, [active]);
  const toggleModal = useCallback(() => {
    setActive((active) => !active);
    setFilter(null);
  }, []);

  const filteredSections =
    filter == null
      ? props.sections
      : props.sections.filter((section) => section.title.match(filter));
  const boodlOnlySections = filteredSections.filter(
    (section) => section.title.indexOf("boodl-") == 0
  );

  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelected(selectedTabIndex);
    setBoodlOnly(selectedTabIndex > 0);
  }, []);

  const generateCard = useCallback((section) => {
    if (section.sectionName.indexOf("boodl-") > -1) {
      return (
        <SectionListEntryLargeRaw
          key={section.sectionName}
          section={section}
          action={props.insertSection(section)}
        />
      );
    } else {
      return (
        <SectionListEntry
          key={section.sectionName}
          title={section.title}
          action={props.insertSection(section)}
        />
      );
    }
  }, []);

  return (
    <Fragment>
      <Button fullWidth={true} onClick={handleChange}>
        Add section
      </Button>
      <Modal
        open={active}
        title="Available Sections"
        onClose={handleChange}
        primaryAction={{
          content: "Close",
          onAction: toggleModal,
        }}
      >
        <Modal.Section key="searchbar">
          <SearchBar
            style={{ height: "40px" }}
            itemList={props.sections.map((section) => ({
              value: section.sectionName,
              label: section.title,
            }))}
            updateFilter={setFilter}
          />
          <Tabs
            tabs={[
              { id: "All", content: "All" },
              { id: "Boodl", content: "Boodl" },
            ]}
            selected={selected}
            onSelect={handleTabChange}
          ></Tabs>
          {!boodlOnly &&
            filteredSections.map((section) => generateCard(section))}
          {boodlOnly &&
            boodlOnlySections.map((section) => generateCard(section))}
        </Modal.Section>
      </Modal>
    </Fragment>
  );
}
