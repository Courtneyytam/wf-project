import React, { useCallback, useState } from "react";
import { Button, ButtonGroup } from "@shopify/polaris";

export default function PressedButton(props) {
  const [isFirstButtonActive, setIsFirstButtonActive] = useState(
    props.isUnique ? false : true
  );

  const handleFirstButtonClick = useCallback(() => {
    if (isFirstButtonActive) return;
    props.changeScope(true);
    setIsFirstButtonActive(true);
  }, [isFirstButtonActive]);

  const handleSecondButtonClick = useCallback(() => {
    if (!isFirstButtonActive) return;
    props.changeScope(false);
    setIsFirstButtonActive(false);
  }, [isFirstButtonActive]);

  return (
    <ButtonGroup segmented>
      <Button pressed={isFirstButtonActive} onClick={handleFirstButtonClick}>
        Global
      </Button>
      <Button pressed={!isFirstButtonActive} onClick={handleSecondButtonClick}>
        Unique
      </Button>
    </ButtonGroup>
  );
}
