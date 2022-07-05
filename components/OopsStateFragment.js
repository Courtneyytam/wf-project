import { EmptyState } from "@shopify/polaris";
import React, { Fragment } from "react";

var helpers = require("../helpers.js");

class OopsStateFragment extends React.Component {
  render() {
    console.log(this.props.message);
    return (
      <Fragment>
        <EmptyState heading="Oops!" image="/404.svg">
          <p>
            Something went wrong. Wait a moment, then try refreshing the page.
            If the issue persists, contact the boodl support team.
          </p>
        </EmptyState>
      </Fragment>
    );
  }
}

export default OopsStateFragment;
