import { useEffect, useState } from "react"
import styled, { useTheme } from "styled-components"
import { Task } from "./EventLoop"
import { QueueSelector } from "./QueueSelector"
import { RenderingPipeline } from "./RenderingPipeline"
import { TaskQueue } from "./TaskQueue"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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

interface Props {
  rendering: boolean
  tasks: Task[]
  popTask: () => void
}

export function TaskQueues({ rendering = true, tasks, popTask }: Props) {
  const [pipelineIsRunning, setPipelineIsRunning] = useState(false)
  const [isReadyToRender, setIsReadyToRender] = useState(false)

  const readyToRender = () => setIsReadyToRender(true)

  const taskIsDone = () => {
    popTask()

    if (isReadyToRender) {
      setPipelineIsRunning(true)
    }
  }

  const renderDone = () => {
    setPipelineIsRunning(false)
    setIsReadyToRender(false)
  }

  useEffect(() => {
    if (isReadyToRender && tasks.length === 0) {
      setPipelineIsRunning(true)
    }
  }, [isReadyToRender])

  return (
    <Container>
      <TaskQueue
        tasks={tasks}
        taskIsDone={taskIsDone}
        canRun={!pipelineIsRunning}
      />
      {rendering && (
        <RenderingPipelineContainer>
          <RenderingPipeline
            run={pipelineIsRunning}
            readyToRender={readyToRender}
            renderDone={renderDone}
          />
        </RenderingPipelineContainer>
      )}
      <QueueSelector
        column={pipelineIsRunning ? -2 : 1}
        running={tasks.length > 0 || pipelineIsRunning}
      />
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
