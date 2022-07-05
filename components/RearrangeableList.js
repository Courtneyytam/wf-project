import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SectionCellAlternate from "./SectionCellAlternate";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = () => ({
  padding: 8,
});

class RearrangeableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.sections,
      parentDragEnd: props.dragEnd,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.sections });
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      // optionally, delete items
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });

    this.state.parentDragEnd(items);
  }

  removeItem = (index, pageType) => {
    if (pageType == "page-content") {
      this.state.items[index].isHidden = !this.state.items[index].isHidden;
      if (this.state.items[index].isHidden) {
        this.state.items[index].sectionContent =
          "{% comment %}\nboodl-hide" +
          this.state.items[index].sectionContent +
          "boodl-hide-end\n{% endcomment %}";
      } else {
        this.state.items[index].sectionContent = this.state.items[
          index
        ].sectionContent
          .replace("{% comment %}\nboodl-hide", "")
          .replace("boodl-hide-end\n{% endcomment %}", "");
      }
    } else {
      this.state.items.splice(index, 1);
    }
    this.setState({ items: this.state.items });
    this.props.registerChange();
  };

  changeScope = (index, comp) => {
    return function (isGlobal) {
      comp.props.changeScope(index, !isGlobal);
      comp.state.items[index].isUnique = !isGlobal;
    };
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable
                  key={item.sectionName + "-" + index}
                  draggableId={"" + item.sectionName + "-" + index}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <SectionCellAlternate
                      item={item}
                      provided={provided}
                      snapshot={snapshot}
                      index={index}
                      onDelete={this.removeItem}
                      changeScope={this.changeScope(index, this)}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default RearrangeableList;
