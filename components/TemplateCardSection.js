import { Card } from "@shopify/polaris";

class TemplateCard extends React.Component {
  render() {
    return (
      <Card.Section
        title={this.props.title}
        actions={[
          {
            content: "Edit",
            onAction: () => {
              this.props.editTemplate(
                this.props.title
                  .replace("templates/", "")
                  .replace(".liquid", "")
              );
            },
          },
          {
            destructive: true,
            content: "Delete",
            onAction: this.props.onDelete,
          },
        ]}
      ></Card.Section>
    );
  }
}

export default TemplateCard;
