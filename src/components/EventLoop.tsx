import { useState } from "react"
import styled from "styled-components"
import { TaskQueues } from "./TaskQueues"
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
  id: number
}

interface Props {
  sources: string[]
  rendering: boolean
}

export function EventLoop({ sources, rendering }: Props) {
  const [nextId, setNextId] = useState(0)
  const [tasks, setTasks] = useState<Task[]>([])

  const pushTask = (task: string) => {
    setTasks((tasks) => [...tasks, { type: task, id: nextId }])
    setNextId((nextId) => nextId + 1)
  }

  const popTask = () => {
    setTasks(tasks.slice(1))
  }

  return (
    <Container>
      <Sources>
        {sources.map((source) => (
          <TaskSource key={source} type={source} pushTask={pushTask} />
        ))}
      </Sources>
      <TaskQueues
        rendering={rendering}
        tasks={tasks}
        popTask={popTask}
      ></TaskQueues>
    </Container>
  )
}
