import { useEffect } from 'react'
import { Box, Heading, Grid, GridItem } from '@chakra-ui/react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setTaskStatus } from '../redux/issuesSlice'
import Task from 'components/Task'
import LoadMore from 'components/LoadMore'

function Board() {
  const dispatch = useDispatch()
  const { issues, inputVal, taskStatus } = useSelector((state: RootState) => state.issues)

  useEffect(() => {
    dispatch(
      setTaskStatus({
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
      })
    )
  }, [dispatch, issues])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = taskStatus[source.droppableId]
      const destColumn = taskStatus[destination.droppableId]
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)

      const updatedTaskStatus = {
        ...taskStatus,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      }

      dispatch(setTaskStatus(updatedTaskStatus))
    } else {
      const column = taskStatus[source.droppableId]
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      const updatedColumn = {
        ...column,
        items: copiedItems
      }

      const updatedTaskStatus = {
        ...taskStatus,
        [source.droppableId]: updatedColumn
      }

      dispatch(setTaskStatus(updatedTaskStatus))
    }
  }

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={5} height="100%">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(taskStatus).map(([columnId, column], index) => {
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
                {(provided) => (
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
                    {column.items.map((item, index) => (
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
                    ))}
                    {columnId === 'toDo' && <LoadMore inputVal={inputVal} issues={issues} />}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </GridItem>
          )
        })}
      </DragDropContext>
    </Grid>
  )
}

export default Board
