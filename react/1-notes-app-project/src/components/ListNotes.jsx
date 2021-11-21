import React from "react";
import Note from "./Note";
import "../css/listNotes.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class ListNotes extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnDragEnd.bind(this);
    
  }

  
  /* Save new position array after drag n drop */
  handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(this.props.listOfNotes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.props.setListOfNotes(items);
  }

  render() {
    return (
      <div className={this.props.fade}>
        <DragDropContext onDragEnd={(result) => this.handleOnDragEnd(result)}>
          <Droppable droppableId="list-notes">
            {(provided, snapshot) => (
              <ul
                className="list-notes"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.props.listOfNotes.map((note, index) => {
                  return (
                    <Draggable key={note.id} draggableId={note.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Note
                            note={note}
                            handleOpenModal={this.props.handleOpenModal}
                            archiveNoteFromList={this.props.archiveNoteFromList}
                          />
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default ListNotes;
