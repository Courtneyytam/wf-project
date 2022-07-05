import { Icon } from "@shopify/polaris";
import PressedButton from "./PressedButton";
import "./SectionCellAlternate.css";
import {
  DeleteMinor,
  DragHandleMinor,
  HideMinor,
  ViewMinor,
} from "@shopify/polaris-icons";

class SectionCellAlternate extends React.Component {
  render() {
    return (
      <div
        ref={this.props.provided.innerRef}
        {...this.props.provided.draggableProps}
        {...this.props.provided.dragHandleProps}
      >
        <div className="Polaris-Card sectionTile">
          <div className="Polaris-Card__Header">
            <div className="Polaris-Stack Polaris-Stack--alignmentBaseline">
              <div className="Polaris-Stack__Item Polaris-Stack__Item--fill">
                <h2 className="Polaris-Heading">{this.props.item.title}</h2>
              </div>
              <div className="Polaris-Stack__Item">
                <div className="Polaris-ButtonGroup">
                  <span
                    className="iconButton"
                    onClick={() =>
                      this.props.onDelete(
                        this.props.index,
                        this.props.item.sectionType
                      )
                    }
                  >
                    <Icon
                      source={
                        this.props.item.sectionType == "page-content"
                          ? this.props.item.isHidden
                            ? HideMinor
                            : ViewMinor
                          : DeleteMinor
                      }
                      color="inkLighter"
                    />
                  </span>
                  <Icon source={DragHandleMinor} color="inkLighter" />
                </div>
              </div>
            </div>
          </div>
          <div className="Polaris-Card__Section">
            <p>{this.props.item.description}</p>
            {this.props.item.title.indexOf("Page Content") < 0 && (
              <PressedButton
                changeScope={this.props.changeScope}
                isUnique={this.props.item.isUnique}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SectionCellAlternate;
