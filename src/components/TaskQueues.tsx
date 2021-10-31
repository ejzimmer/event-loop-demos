import { useEffect, useState } from "react"
import styled from "styled-components"
import { Task } from "./EventLoop"
import { QueueSelector } from "./QueueSelector"
import { RenderingPipeline } from "./RenderingPipeline"
import { TaskQueue } from "./TaskQueue"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px 0;
  position: relative;
  --queue-width: 100px;
  margin: 0 auto;
  width: 100%;
  justify-items: center;
`

const RenderingPipelineContainer = styled.div`
  max-width: 25%;
  align-self: end;
  justify-self: center;
`

export enum Queue {
  default,
  browser,
  promise,
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
      setNextQueue(Queue.rendering)
    } else if (queues.browser && queues.browser.length > 0) {
      setNextQueue(Queue.browser)
    } else {
      setNextQueue(Queue.default)
    }
  }

  const taskIsDone = (type: string) => {
    popTask(type)
    chooseQueue()
  }

  const numberOfTasks = () =>
    Object.values(queues).reduce((total, { length }) => total + length, 0)

  const renderDone = () => {
    setSomethingIsRunning(numberOfTasks() !== 0)
    setIsReadyToRender(false)
  }

  useEffect(() => {
    if (!isReadyToRender) {
      chooseQueue()
    }
  }, [isReadyToRender])

  useEffect(() => {
    const queues = setupQueues()

    tasks.forEach((task) => {
      if (additionalQueues.map((key) => Queue[key]).includes(task.type)) {
        queues[task.type].push(task)
      } else {
        queues[Queue[Queue.default]].push(task)
      }
    })

    setQueues(queues)
  }, [tasks])

  useEffect(() => {
    // there were no tasks and now there is one
    if (numberOfTasks() === 1) {
      chooseQueue()
      setSomethingIsRunning(true)
    }

    // there are no tasks and we're not ready to render
    else if (numberOfTasks() === 0 && !isReadyToRender) {
      setSomethingIsRunning(false)
    }
  }, [queues, somethingIsRunning])

  useEffect(() => {
    // event loop is idling and then is ready to render
    if (isReadyToRender && tasks.length === 0) {
      chooseQueue()
      setSomethingIsRunning(true)
    }
  }, [isReadyToRender])

  return (
    <Container>
      <TaskQueue
        type="default"
        tasks={queues[Queue[Queue.default]]}
        taskIsDone={taskIsDone}
        canRun={nextQueue === Queue.default}
      />
      {additionalQueues.map((queue: Queue) => (
        <TaskQueue
          key={queue}
          type={Queue[queue]}
          tasks={queues[Queue[queue]]}
          taskIsDone={taskIsDone}
          canRun={nextQueue === queue}
        />
      ))}
      {rendering && (
        <RenderingPipelineContainer>
          <RenderingPipeline
            run={nextQueue === Queue.rendering}
            readyToRender={readyToRender}
            renderDone={renderDone}
          />
        </RenderingPipelineContainer>
      )}
      <QueueSelector column={nextQueue + 1} running={somethingIsRunning} />
    </Container>
  )
}

// connectedCallback() {
//     addTask(taskType) {
//       if (this.pipeline.startTimer && !this.pipeline.interval) {
//         this.pipeline.startTimer();
//       }
//       const queue = this.findQueue(taskType);
//       queue.addTask(taskType);
//     }

//     findQueue(type) {
//       let defaultQueue;

//       for (let queue of this.queues) {
//         if (queue.type === type) {
//           return queue;
//         }
//         if (queue.type === 'default') {
//           defaultQueue = queue;
//         }
//       }

//       return defaultQueue;
//     }

//   }
// </script>
