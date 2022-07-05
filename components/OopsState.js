import { EmptyState, Page } from "@shopify/polaris";
import React from "react";

class OopsState extends React.Component {
  render() {
    console.log(this.props.message);
    return (
      <Page>
        <EmptyState heading="Oops!" image="/404.svg">
          <p>
            Something went wrong. Wait a moment, then try refreshing the page.
            If the issue persists, contact the boodl support team.
          </p>
        </EmptyState>
      </Page>
    );
  }
}

export default OopsState;
