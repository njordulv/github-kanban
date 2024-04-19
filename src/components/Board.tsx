import { useState } from 'react'
import { Box, Heading, Grid, GridItem } from '@chakra-ui/react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { RootState, useSelector } from '../redux/store'
import Task from 'components/Task'
import LoadMore from 'components/LoadMore'

const onDragEnd = (result: DropResult, columns: any, setColumns: any) => {
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  } else {
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    })
  }
}

function Board() {
  const { issues, inputVal } = useSelector((state: RootState) => state.issues)

  const taskStatus = {
    toDo: {
      name: 'To do',
      items: issues
    },
    inProgress: {
      name: 'Progress',
      items: []
    },
    done: {
      name: 'Done',
      items: []
    }
  }

  const [columns, setColumns] = useState(taskStatus)

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={5} height="100%">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <GridItem key={index} border="1px solid #444c56" borderRadius="5px" bg="transparent" maxW="378px">
              <Heading
                p={2}
                fontSize="18px"
                bg="#2d323b"
                color="#c5d1de"
                borderBottom="1px solid #444c56"
                borderRadius="5px 5px 0 0"
              >
                {column.name}
              </Heading>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => {
                  return (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      display="flex"
                      flexDir="column"
                      borderRadius={2}
                      textAlign="left"
                      p={2}
                      h="100%"
                    >
                      {column.items.map((item, index) => {
                        return (
                          <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: 'none',
                                  marginBottom: '11px',
                                  borderWidth: '1px',
                                  borderStyle: 'solid',
                                  borderRadius: '5px',
                                  borderColor: snapshot.isDragging ? '#539bf5' : '#444c56',
                                  color: 'white',
                                  ...provided.draggableProps.style
                                }}
                              >
                                <Task key={item.id} {...item} />
                              </div>
                            )}
                          </Draggable>
                        )
                      })}
                      {columnId === 'toDo' && <LoadMore inputVal={inputVal} issues={issues} />}
                      {provided.placeholder}
                    </Box>
                  )
                }}
              </Droppable>
            </GridItem>
          )
        })}
      </DragDropContext>
    </Grid>
  )
}

export default Board
