import { Button, Card } from "@shopify/polaris";

class TemplateCard extends React.Component {
  render() {
    return (
      <Card
        title={this.props.title}
        actions={[
          {
            content: "Edit template",
            onAction: () => {
              this.props.editTemplate(
                this.props.title
                  .replace("templates/", "")
                  .replace(".liquid", "")
              );
            },
          },
        ]}
      >
        <Card.Section>
          <Button destructive onClick={this.props.onDelete}>
            Delete template
          </Button>
        </Card.Section>
      </Card>
    );
  }
}

export default TemplateCard;
