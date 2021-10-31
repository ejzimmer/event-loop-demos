import { useEffect, useState } from "react"
import styled from "styled-components"
import "./task-source.css"

const Container = styled.div`
  --width: 8em;
  --thickness: 12px;
  cursor: pointer;
`

const ThreadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: calc(var(--width) + var(--thickness) * 2);
  position: absolute;
  top: 100%;
`

const asyncTasks = ["timer", "network", "drive"]

interface Props {
  type: string
  pushTask: (type: string) => void
  forceTimeoutsToZero?: boolean
}

export function TaskSource({ type, pushTask, forceTimeoutsToZero }: Props) {
  const [threads, setThreads] = useState<{ id: string; time: number }[]>([])
  const [nextId, setNextId] = useState(0)

  const isAsync = asyncTasks.includes(type)

  const addTask = () => {
    isAsync
      ? pushThread(forceTimeoutsToZero ? 0.1 : Math.random() * 4 + 2)
      : pushTask(type)
  }

  const pushThread = (time: number) => {
    setThreads((threads) => [...threads, { id: `${type}-${nextId}`, time }])
    setNextId((nextId) => nextId + 1)
  }

  const removeThread = (id: string) => {
    setThreads((threads) => threads.filter((thread) => thread.id !== id))
    pushTask(type)
  }

  return (
    <Container onClick={addTask}>
      <div className={`task-source ${type}`} style={{ margin: "auto" }} />
      <ThreadContainer>
        {threads.map((thread) => (
          <AsyncTask
            key={thread.id}
            id={thread.id}
            type={type}
            time={thread.time}
            removeThread={removeThread}
          />
        ))}
      </ThreadContainer>
    </Container>
  )
}

function AsyncTask({
  id,
  type,
  removeThread,
  time,
}: {
  id: string
  type: string
  removeThread: (id: string) => void
  time: number
}) {
  const [transform, setTransform] = useState("")

  useEffect(() => {
    if (type === "timer") {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransform("rotate(1turn)"))
      )
    } else {
      setTimeout(end, time * 1000)
    }
  }, [])

  const end = () => {
    removeThread(id)
  }

  return (
    <div className="thread-item">
      <div className="shrinker">
        <div
          className={type}
          style={{
            transitionDuration: `${time}s`,
            transform,
          }}
          onTransitionEndCapture={end}
        />
      </div>
    </div>
  )
}
