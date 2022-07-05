import React, { useState } from "react";
import { SettingToggle } from "@shopify/polaris";

export default function SectionToggle(props) {
  const [active, setActive] = useState(props.isEnabled);
  const handleToggle = function () {
    props.action(!active);
    setActive((active) => !active);
  };
  const contentStatus = active ? "Disable" : "Enable";

  return (
    <SettingToggle
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={active}
    />
  );
}
