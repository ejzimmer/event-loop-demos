import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
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

const readDrive = keyframes`
  from { transform: rotate(.09turn); }
  to { transform: rotate(.18turn); }
`

const Arm = styled.div`
  --arm-height: calc(var(--width) * 0.5);
  height: --arm-height;
  border: 8px solid transparent;
  border-bottom: white solid var(--arm-height);
  box-sizing: border-box;
  width: 8px;
  position: absolute;
  bottom: 20%;
  left: calc(30% - 8px);
  transform-origin: bottom;
  transform: rotate(0.1turn);
  animation: ${readDrive} 2s infinite alternate linear;
  animation-play-state: paused;
`

const syncTasks = [
  "html",
  "browser",
  "promise",
  "animation",
  "immediate",
  "next-tick",
  "postmessage",
]
const asyncTasks = ["timer", "network", "drive"]

interface Props {
  type: string
  pushTask: (type: string) => void
}

export function TaskSource({ type, pushTask }: Props) {
  const [threads, setThreads] = useState<{ id: string; time: number }[]>([])
  const [nextId, setNextId] = useState(0)

  const isAsync = asyncTasks.includes(type)

  const addTask = () => {
    isAsync ? pushThread(Math.random() * 4 + 2) : pushTask(type)
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
      <div className={type} style={{ margin: "auto" }} />
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
      {/* {type === "drive" && <Arm />} */}
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

{
  /* <template id="task-source"> */
}
{
  /* <style>

    .animation {
      width: var(--width);
      height: var(--width);
      background-image: url('cat.png');
      background-size: contain;
    }
    .animation.running {
      background-image: url('css/cat.gif');
    }

  </style> */
}
// </template>
{
  // startAsyncTask() {
  //   requestAnimationFrame(() => asyncTask.classList.add('go'));
  // addTask() {
  //   const type = this.type === 'promise' ? 'microtask' : this.type;
  // }
}
