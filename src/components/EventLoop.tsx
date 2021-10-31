import { useState } from "react"
import styled from "styled-components"
import { Queue, TaskQueues } from "./TaskQueues"
import { TaskSource } from "./TaskSource"

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  box-sizing: border-box;
  height: 75%;
`

const Sources = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
`

export interface Task {
  type: string
  id: string
}

interface Props {
  sources: string[]
  rendering: boolean
  additionalQueues?: Queue[]
  forceTimeoutsToZero?: boolean
}

export function EventLoop({
  sources,
  rendering,
  additionalQueues,
  forceTimeoutsToZero,
}: Props) {
  const [nextId, setNextId] = useState(0)
  const [tasks, setTasks] = useState<Task[]>([])

  const pushTask = (task: string) => {
    setTasks((tasks) => [...tasks, { type: task, id: `${task}-${nextId}` }])
    setNextId((nextId) => nextId + 1)
  }

  const popTask = (type: string) => {
    setTasks((tasks) => {
      const firstIndex = tasks.findIndex((task) => task.type === type)
      return [...tasks.slice(0, firstIndex), ...tasks.slice(firstIndex + 1)]
    })
  }

  return (
    <Container>
      <Sources>
        {sources.map((source) => (
          <TaskSource
            key={source}
            type={source}
            pushTask={pushTask}
            forceTimeoutsToZero={forceTimeoutsToZero}
          />
        ))}
      </Sources>
      <TaskQueues
        rendering={rendering}
        tasks={tasks}
        popTask={popTask}
        additionalQueues={additionalQueues}
      ></TaskQueues>
    </Container>
  )
}
