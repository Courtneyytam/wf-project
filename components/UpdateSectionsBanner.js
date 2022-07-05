import { Banner } from "@shopify/polaris";

class UpdateSectionsBanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShow: true,
    };
  }

  render() {
    if (!this.state.shouldShow) {
      return null;
    }
    return (
      <Banner
        title={`There are ${this.props.updateCount} section updates available.`}
        action={{
          content: "Update now",
          onAction: this.props.update,
        }}
        onDismiss={() => {
          this.setState({ shouldShow: false });
        }}
        status="info"
      >
        <p>Update your sections to get the latest and greatest versions!</p>
      </Banner>
    );
  }
}

export default UpdateSectionsBanner;
