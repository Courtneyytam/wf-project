import { Button } from "@shopify/polaris";
import "./SectionListEntryLarge.css";

class SectionListEntryRaw extends React.Component {
  render() {
    return (
      <div className="Polaris-Card highlightable-card">
        <div className="Polaris-Card__Header">
          <div className="Polaris-Stack Polaris-Stack--alignmentBaseline">
            <div className="Polaris-Stack__Item Polaris-Stack__Item--fill">
              <h2 className="Polaris-Heading">
                {this.props.section.sectionName}
              </h2>
            </div>
            <div className="Polaris-Stack__Item">
              <div className="Polaris-ButtonGroup">
                <div className="Polaris-ButtonGroup__Item Polaris-ButtonGroup__Item--plain">
                  <Button plain onClick={this.props.action}>
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Polaris-Card__Section">
          <div>
            <img
              className={"section-thumbnail-mini"}
              src={"/thumbnails/" + this.props.section.sectionName + ".png"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SectionListEntryRaw;
