import { Card } from "@shopify/polaris";
import React from "react";

class HelpCard extends React.Component {
  render() {
    return (
      <Card title={this.props.questionData.title} sectioned>
        <p>{this.props.questionData.content}</p>
      </Card>
    );
  }
}

export default HelpCard;
