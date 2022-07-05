import { Badge, Button } from "@shopify/polaris";
import { Context } from "@shopify/app-bridge-react";
var helpers = require("../helpers.js");

class CustomSettingToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: props.enabled,
    };
  }

  render() {
    const handleToggle = function (action, comp) {
      return function toggleSection() {
        action(!comp.state.enabled);
        comp.setState({ enabled: !comp.state.enabled });
      };
    };
    const { message, enabled } = this.state;
    if (!this.props.clickable) {
      return <Badge status="info">Premium</Badge>;
    } else if (enabled && this.props.clickable) {
      return (
        <Button
          disabled={!this.props.clickable}
          onClick={handleToggle(this.props.action, this)}
        >
          Disable
        </Button>
      );
    } else {
      return (
        <Button
          primary
          disabled={!this.props.clickable}
          onClick={handleToggle(this.props.action, this)}
        >
          Enable
        </Button>
      );
    }
  }
}

export default CustomSettingToggle;
