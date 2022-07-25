import { useEffect, useState } from "react"
import styled from "styled-components"
import { Task } from "./EventLoop"
import { QueueSelector } from "./QueueSelector"
import { RenderingPipeline } from "./RenderingPipeline"
import { TaskQueue } from "./TaskQueue"

interface ContainerProps {
  columns: number
}
const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }: ContainerProps) =>
    `repeat(${columns}, min-content)`};
  grid-gap: 20px 80px;
  position: relative;
  --queue-width: 100px;
  margin: 0 auto;
  width: 100%;
  justify-content: center;
  justify-items: center;
  overflow: hidden;
`

const RenderingPipelineContainer = styled.div`
  max-width: 25%;
  align-self: end;
  grid-column: -2;
  justify-self: start;
`

export enum Queue {
  default,
  browser,
  promise,
  animation,
  rendering,
}
interface Props {
  rendering: boolean
  tasks: Task[]
  popTask: (type: string) => void
  additionalQueues?: Queue[]
}

export function TaskQueues({
  rendering = true,
  tasks,
  popTask,
  additionalQueues = [],
}: Props) {
  const [somethingIsRunning, setSomethingIsRunning] = useState(false)
  const [isReadyToRender, setIsReadyToRender] = useState(false)
  const [nextQueue, setNextQueue] = useState(Queue.default)
  const [animationQueueIsRunning, setAnimationQueueIsRunning] = useState(false)
  const [nextAnimationLoop, setNextAnimationLoop] = useState<Task[]>([])

  const numberOfColumns = 1 + additionalQueues.length + (rendering ? 1 : 0)

  const setupQueues = () => {
    const queues: Record<string, Task[]> = { default: [] }
    additionalQueues.forEach((queue) => (queues[Queue[queue]] = []))
    return queues
  }
  const [queues, setQueues] = useState(setupQueues)

  const readyToRender = () => setIsReadyToRender(true)

  const chooseQueue = () => {
    if (queues.promise && queues.promise.length > 0) {
      setNextQueue(Queue.promise)
    } else if (isReadyToRender) {
      if (queues.animation.length > 0) {
        setAnimationQueueIsRunning(true)
        setNextQueue(Queue.animation)
      } else {
        setNextQueue(-3) // -2 is the gridline, but we add 1 to the prop
        setSomethingIsRunning(true)
      }
      setSomethingIsRunning(true)
    } else if (queues.browser && queues.browser.length > 0) {
      setNextQueue(Queue.browser)
    } else if (queues.default.length > 0) {
      setNextQueue(Queue.default)
    }
  }

  const taskIsDone = (type: string) => {
    popTask(type)
    setSomethingIsRunning(false)
  }

  const numberOfTasks = () =>
    Object.entries(queues)
      .filter(([name]) => name !== Queue[Queue.animation])
      .reduce((total, [_, { length }]) => total + length, 0)

  const renderDone = () => {
    setSomethingIsRunning(numberOfTasks() !== 0)
    setIsReadyToRender(false)
    setAnimationQueueIsRunning(false)
    setQueues((queues) => ({
      ...queues,
      animation: [
        ...queues.animation,
        ...nextAnimationLoop.map(({ id, type }) => ({ id, type })),
      ],
    }))
    setNextAnimationLoop([])
  }

  useEffect(() => {
    if (!isReadyToRender) {
      chooseQueue()
    }
  }, [isReadyToRender])

  useEffect(() => {
    const newQueues = setupQueues()

    tasks.forEach((task) => {
      if (task.type === Queue[Queue.animation]) return

      if (additionalQueues.map((key) => Queue[key]).includes(task.type)) {
        newQueues[task.type].push(task)
      } else {
        newQueues[Queue[Queue.default]].push(task)
      }
    })

    const updatedAnimationTasks = tasks.filter(
      (task) =>
        task.type === "animation" &&
        !nextAnimationLoop.map((task) => task.id).includes(task.id)
    )
    if (!animationQueueIsRunning) {
      newQueues.animation = updatedAnimationTasks
    } else {
      const existingAnimationTasks = queues.animation
      if (existingAnimationTasks.length >= updatedAnimationTasks.length) {
        newQueues.animation = updatedAnimationTasks
      } else {
        newQueues.animation = existingAnimationTasks
        const newTask = updatedAnimationTasks.find(
          (task) => !existingAnimationTasks.map((t) => t.id).includes(task.id)
        )
        newTask &&
          setNextAnimationLoop((tasks) => [
            ...tasks,
            { ...newTask, nextTime: true },
          ])
      }
    }
    setQueues(newQueues)
  }, [tasks])

  useEffect(() => {
    if (!somethingIsRunning) {
      chooseQueue()
      if (numberOfTasks() > 0) {
        setSomethingIsRunning(true)
      }
    }
  }, [queues])

  useEffect(() => {
    // event loop is idling and then is ready to render
    if (isReadyToRender && numberOfTasks() === 0) {
      chooseQueue()
      setSomethingIsRunning(true)
    }
  }, [isReadyToRender])

  return (
    <Container columns={numberOfColumns}>
      <TaskQueue
        type="default"
        tasks={queues[Queue[Queue.default]]}
        taskIsDone={taskIsDone}
        canRun={nextQueue === Queue.default && somethingIsRunning}
      />
      {additionalQueues.map((queue: Queue) => (
        <TaskQueue
          key={queue}
          type={Queue[queue]}
          tasks={
            queue === Queue.animation
              ? [...queues.animation, ...nextAnimationLoop]
              : queues[Queue[queue]]
          }
          taskIsDone={taskIsDone}
          canRun={nextQueue === queue && somethingIsRunning}
        />
      ))}
      {rendering && (
        <RenderingPipelineContainer>
          <RenderingPipeline
            run={(nextQueue as number) === -3}
            readyToRender={readyToRender}
            renderDone={renderDone}
          />
        </RenderingPipelineContainer>
      )}
      <QueueSelector column={nextQueue + 1} running={somethingIsRunning} />
    </Container>
  )
}
