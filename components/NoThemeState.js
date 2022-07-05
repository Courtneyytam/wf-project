import { Card, EmptyState } from "@shopify/polaris";
import React from "react";

class NoThemeState extends React.Component {
  render() {
    return (
      <Card>
        <Card.Section>
          <EmptyState
            heading="Pick a theme to get started"
            action={{ content: "Settings", url: "/account" }}
            image="https://cdn.shopify.com/s/files/1/2376/3301/products/file-upload-empty-state.png"
          >
            <p>You must pick a specific theme to edit.</p>
          </EmptyState>
        </Card.Section>
      </Card>
    );
  }
}

export default NoThemeState;
