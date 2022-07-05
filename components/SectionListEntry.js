import { Button, Icon } from "@shopify/polaris";
import { SectionMajorMonotone } from "@shopify/polaris-icons";

class SectionListEntry extends React.Component {
  render() {
    return (
      <div>
        <div className="Polaris-Card">
          <div className="Polaris-ResourceList__ResourceListWrapper">
            <ul className="Polaris-ResourceList" aria-live="polite">
              <li className="Polaris-ResourceList__ItemWrapper">
                <div className="Polaris-ResourceItem">
                  <div
                    className="Polaris-ResourceItem__Container"
                    id={this.props.title}
                  >
                    <div
                      style={
                        this.props.title.indexOf("boodl-") == 0
                          ? {}
                          : { padding: "10px 10px 0px 10px" }
                      }
                      className="Polaris-ResourceItem__Owned"
                    >
                      <div className="Polaris-ResourceItem__Media">
                        {this.props.title.indexOf("boodl-") == 0 && (
                          <span
                            style={{ borderRadius: "0px" }}
                            aria-label={this.props.title}
                            role="img"
                            className="Polaris-Avatar Polaris-Avatar--styleSix Polaris-Avatar--sizeMedium Polaris-Avatar--hasImage"
                          >
                            <img
                              style={{ borderRadius: "0px" }}
                              src={
                                this.props.title.indexOf("boodl-") == 0
                                  ? "/thumbnails/" + this.props.title + ".png"
                                  : "/thumbnails/default_section_icon.png"
                              }
                              className="Polaris-Avatar__Image"
                              alt=""
                              role="presentation"
                            />
                          </span>
                        )}
                        {this.props.title.indexOf("boodl-") != 0 && (
                          <Icon source={SectionMajorMonotone} />
                        )}
                      </div>
                    </div>
                    <div className="Polaris-ResourceItem__Content">
                      <h3>
                        <span className="Polaris-TextStyle--variationStrong">
                          {this.props.title}
                        </span>
                      </h3>
                      <Button plain onClick={this.props.action}>
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SectionListEntry;
