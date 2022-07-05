import { Modal } from "@shopify/app-bridge-react";

var helpers = require("../helpers.js");

class ConfirmDeleteModal extends React.Component {
  render() {
    return (
      <Modal
        title={this.props.title}
        message="This action cannot be undone."
        open={this.props.open}
        primaryAction={{
          content: "Delete",
          destructive: true,
          onAction: this.props.delete,
        }}
        secondaryActions={[{ content: "Cancel", onAction: this.props.cancel }]}
        onClose={this.props.cancel}
      ></Modal>
    );
  }
}

export default ConfirmDeleteModal;
