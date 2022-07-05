import { Button } from "@shopify/polaris";
import PressedButton from "./PressedButton";

class SectionCell extends React.Component {
  render() {
    return (
      <div
        style="--top-bar-background:#00848e; --top-bar-background-lighter:#1d9ba4; --top-bar-color:#f9fafb;"
        ref={this.props.provided.innerRef}
        {...this.props.provided.draggableProps}
        {...this.props.provided.dragHandleProps}
      >
        <div className="Polaris-Card">
          <div className="Polaris-ResourceList__ResourceListWrapper">
            <ul className="Polaris-ResourceList" aria-live="polite">
              <li className="Polaris-ResourceList__ItemWrapper">
                <div className="Polaris-ResourceItem" data-href="customers/145">
                  <a
                    aria-describedby={
                      "" + this.props.item.id + "-" + this.props.index
                    }
                    aria-label="View details for Yi So-Yeon"
                    className="Polaris-ResourceItem__Link"
                    tabIndex="0"
                    id="ResourceListItemOverlay8"
                    href="customers/145"
                    data-polaris-unstyled="true"
                  ></a>
                  <div
                    className="Polaris-ResourceItem__Container"
                    id={"" + this.props.item.id + "-" + this.props.index}
                  >
                    <div className="Polaris-ResourceItem__Owned">
                      <div className="Polaris-ResourceItem__Media">
                        <span
                          aria-label={this.props.item.title}
                          role="img"
                          className="Polaris-Avatar Polaris-Avatar--styleSix Polaris-Avatar--sizeMedium Polaris-Avatar--hasImage"
                        >
                          <img
                            src="https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746"
                            className="Polaris-Avatar__Image"
                            alt=""
                            role="presentation"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="Polaris-ResourceItem__Content">
                      <h3>
                        <span className="Polaris-TextStyle--variationStrong">
                          {this.props.item.title}
                        </span>
                      </h3>
                      <div>{this.props.item.description}</div>
                      <Button
                        destructive
                        onClick={() => this.props.onDelete(this.props.index)}
                      >
                        Delete section
                      </Button>
                      {this.props.item.title.indexOf("Page Content") < 0 && (
                        <PressedButton changeScope={this.props.changeScope} />
                      )}
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

export default SectionCell;
