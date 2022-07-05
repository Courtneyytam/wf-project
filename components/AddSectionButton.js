import { Icon } from "@shopify/polaris";
import { AddMajorMonotone } from "@shopify/polaris-icons";
var helpers = require("../helpers.js");

class AddSectionButton extends React.Component {
  render() {
    return (
      <div>
        <div
          style={{
            topBarBackground: "#00848e",
            topBarBackgroundLighter: "#1d9ba4",
            topBarColor: "#f9fafb",
          }}
        >
          <div className="Polaris-Card">
            <button
              type="button"
              className="Polaris-Button Polaris-Button--textAlignLeft Polaris-Button--fullWidth"
              onClick={this.props.onClick}
            >
              <div className="Polaris-ResourceList__ResourceListWrapper">
                <ul className="Polaris-ResourceList" aria-live="polite">
                  <li className="Polaris-ResourceList__ItemWrapper">
                    <div className="Polaris-ResourceItem">
                      <a
                        aria-describedby="add-sections"
                        aria-label="Add more sections"
                        className="Polaris-ResourceItem__Link"
                        tabIndex="0"
                        id="ResourceListItemOverlay8"
                        data-polaris-unstyled="true"
                      ></a>
                      <div
                        className="Polaris-ResourceItem__Container"
                        id="add-sections"
                      >
                        <div className="Polaris-ResourceItem__Owned">
                          <div className="Polaris-ResourceItem__Media">
                            <span
                              aria-label="add-sections"
                              role="img"
                              className="Polaris-Avatar Polaris-Avatar--styleSix Polaris-Avatar--sizeMedium Polaris-Avatar--hasImage"
                              style={{ overflow: "visible" }}
                            >
                              {<Icon source={AddMajorMonotone} />}
                            </span>
                          </div>
                        </div>
                        <div className="Polaris-ResourceItem__Content">
                          Add Section
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddSectionButton;
