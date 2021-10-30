import { useState } from "react"
import styled from "styled-components"
import { TaskQueues } from "./TaskQueues"
import { TaskSource } from "./TaskSource"

const Container = styled.div`
  height: 700px;
  padding: 50px;
  padding-bottom: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`

const Sources = styled.div`
  display: flex;
  flex-wrap: wrap;
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
    setTasks([...tasks, { type: task, id: nextId }])
    setNextId(nextId + 1)
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
{
  /* <script>

  const width = 960;
  const height = 700;

  class EventLoop extends HTMLElement {

    startTimer() {
      this.queues.startTimer();
    }

    addTask(taskType) {
      this.queues.addTask(taskType);
    }

    setScale(scale) {
      this.style.transform = `translate(-50%, calc(-50% - 8px)) scale(${scale})`;
    }
  }
</script>
  */
}
