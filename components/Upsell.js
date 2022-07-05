import { EmptyState, Page } from "@shopify/polaris";
import React from "react";

class Upsell extends React.Component {
  render() {
    return (
      <Page>
        <EmptyState
          heading="Upgrade to Premium to build pages"
          action={{ content: "Account Settings", url: "/account" }}
          secondaryAction={{
            content: "Learn more",
            url: "https://help.shopify.com",
          }}
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        ></EmptyState>
      </Page>
    );
  }
}

export default Upsell;
