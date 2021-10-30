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

enum Queue {
  ADDITIONAL_QUEUE,
  NORMAL_QUEUE,
  RENDERING_PIPELINE,
}
interface Props {
  rendering: boolean
  tasks: Task[]
  popTask: (type: string) => void
  additionalQueue?: string
}

export function TaskQueues({
  rendering = true,
  tasks,
  popTask,
  additionalQueue,
}: Props) {
  // if a task ends, pick a queue
  // if the rendering pipeline ends, pick a queue

  const [somethingIsRunning, setSomethingIsRunning] = useState(false)
  const [isReadyToRender, setIsReadyToRender] = useState(false)
  const [nextQueue, setNextQueue] = useState(Queue.NORMAL_QUEUE)

  const [normalTasks, setNormalTasks] = useState<Task[]>([])
  const [otherTasks, setOtherTasks] = useState<Task[]>([])

  const readyToRender = () => setIsReadyToRender(true)

  const chooseQueue = () => {
    if (isReadyToRender) {
      setNextQueue(Queue.RENDERING_PIPELINE)
    } else if (otherTasks.length > 0) {
      setNextQueue(Queue.ADDITIONAL_QUEUE)
    } else {
      setNextQueue(Queue.NORMAL_QUEUE)
    }
  }

  const taskIsDone = (type: string) => {
    popTask(type)
    chooseQueue()
  }

  const renderDone = () => {
    setSomethingIsRunning(normalTasks.length + otherTasks.length !== 0)
    setIsReadyToRender(false)
  }

  useEffect(() => {
    if (!isReadyToRender) {
      chooseQueue()
    }
  }, [isReadyToRender])

  useEffect(() => {
    if (additionalQueue) {
      setNormalTasks(tasks.filter((task) => task.type !== additionalQueue))
      setOtherTasks(tasks.filter((task) => task.type === additionalQueue))
    } else {
      setNormalTasks(tasks)
    }
  }, [tasks])

  useEffect(() => {
    if (normalTasks.length + otherTasks.length === 1) {
      chooseQueue()
      setSomethingIsRunning(true)
    } else if (
      normalTasks.length + otherTasks.length === 0 &&
      !isReadyToRender
    ) {
      setSomethingIsRunning(false)
      chooseQueue()
    }
  }, [normalTasks, otherTasks, somethingIsRunning])

  useEffect(() => {
    if (isReadyToRender && tasks.length === 0) {
      chooseQueue()
      setSomethingIsRunning(true)
    }
  }, [isReadyToRender])

  return (
    <Container>
      {additionalQueue && (
        <TaskQueue
          tasks={otherTasks}
          taskIsDone={taskIsDone}
          canRun={nextQueue === Queue.ADDITIONAL_QUEUE}
        />
      )}
      <TaskQueue
        tasks={normalTasks}
        taskIsDone={taskIsDone}
        canRun={nextQueue === Queue.NORMAL_QUEUE}
      />
      {rendering && (
        <RenderingPipelineContainer>
          <RenderingPipeline
            run={nextQueue === Queue.RENDERING_PIPELINE}
            readyToRender={readyToRender}
            renderDone={renderDone}
          />
        </RenderingPipelineContainer>
      )}
      <QueueSelector column={nextQueue + 1} running={somethingIsRunning} />
    </Container>
  )
}

{
  /* <template id="queues">
  <slot id="queues"></slot>
</template> */
}
{
  /* <script>
  class Queues extends HTMLElement { */
}

// connectedCallback() {
//   this.selector = this.shadow.querySelector('queue-selector');
//   this.pipeline = this.shadow.querySelector('rendering-pipeline');
//   this.queues = this.querySelectorAll('task-queue');
// }

// startTimer() {
//   this.pipeline.timerCount();
//   this.selector.startTimer();
// }

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
