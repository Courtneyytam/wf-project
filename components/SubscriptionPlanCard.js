import {
  Badge,
  Button,
  Card,
  FormLayout,
  TextContainer,
  TextField,
} from "@shopify/polaris";

class SubscriptionPlanCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textFieldValue: "",
      showPromoCodeBox: false,
    };
  }

  setTextFieldValue = (value) => {
    this.setState({ textFieldValue: value });
  };

  activateAgency = () => {
    this.props.activateAgency(this.state.textFieldValue);
  };

  render() {
    let isActive = this.props.plan.planLevel == this.props.activePlanLevel;
    var promoCodeField = (
      <Card.Section>
        {this.props.showAgencyBanner && this.props.banner}
        <FormLayout>
          <TextField
            label="Promo Code"
            type="text"
            value={this.state.textFieldValue}
            onChange={this.setTextFieldValue}
          />
          <Button
            onClick={() => {
              this.activateAgency();
            }}
            disabled={this.props.isProcessing}
          >
            Apply
          </Button>
        </FormLayout>
      </Card.Section>
    );

    return (
      <Card>
        <Card.Header
          title={this.props.plan.planName}
          actions={
            isActive
              ? []
              : [
                  {
                    content: "Activate",
                    url:
                      "/subscriptions/update/" +
                      this.props.plan._id +
                      "/" +
                      this.props.promoCode,
                    external: true,
                  },
                ]
          }
        >
          {isActive && <Badge status="info">Current Plan</Badge>}
        </Card.Header>
        <Card.Section>
          <TextContainer>{this.props.plan.planDescription}</TextContainer>
          {this.props.plan.acceptPromo && !isActive && (
            <Button
              plain
              onClick={() => {
                this.setState({ showPromoCodeBox: true });
              }}
            >
              Got a promo code?
            </Button>
          )}
          {this.state.showPromoCodeBox && promoCodeField}
        </Card.Section>
      </Card>
    );
  }
}

export default SubscriptionPlanCard;
