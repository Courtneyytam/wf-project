import { Card } from "@shopify/polaris";
import CustomSettingToggle from "./CustomSettingToggle";
import "./SectionCard.css";

var helpers = require("../helpers.js");

class SectionCard extends React.Component {
  render() {
    function getToggleSection(props) {
      return function toggleSection(shouldInsert) {
        if (shouldInsert) {
          helpers.putSection(props.themeId, props.section);
        } else {
          helpers.deleteSection(props.themeId, props.section);
        }
      };
    }

    const toggleSectionFn = getToggleSection(this.props);
    // <Card.Header title={<Fragment> {this.props.title} <Badge status="info">Premium</Badge></Fragment>}>
    return (
      <Card subdued={!this.props.isAuthorized}>
        <Card.Header title={this.props.title}>
          <CustomSettingToggle
            action={toggleSectionFn}
            enabled={this.props.isEnabled}
            clickable={this.props.isAuthorized}
          />
        </Card.Header>
        <Card.Section>
          <div>
            <img
              className={
                "section-thumbnail " +
                (this.props.isAuthorized ? "" : "thumbnail-disabled")
              }
              src={"/thumbnails/" + this.props.section + ".png"}
            />
            <p>{this.props.description}</p>
          </div>
        </Card.Section>
      </Card>
    );
  }
}

export default SectionCard;
