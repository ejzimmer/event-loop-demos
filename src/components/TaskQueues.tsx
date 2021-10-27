import { useEffect, useState } from "react"
import styled from "styled-components"
import { Task } from "./EventLoop"
import { QueueSelector } from "./QueueSelector"
import { RenderingPipeline } from "./RenderingPipeline"
import { TaskQueue } from "./TaskQueue"

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  --queue-width: 100px;
  margin: 0 auto;
  min-height: calc(var(--queue-width * 2));
`

const RenderingPipelineContainer = styled.div`
  max-width: 25%;
  margin: 0 3vw;
  padding-top: 5vh;
`

interface Props {
  rendering: boolean
  tasks: Task[]
  popTask: () => void
}

export function TaskQueues({ rendering = true, tasks, popTask }: Props) {
  return (
    <Container>
      <TaskQueue tasks={tasks} popTask={popTask} />
      {/* {rendering && (
        <RenderingPipelineContainer>
          <RenderingPipeline addTask={addTask} />
        </RenderingPipelineContainer>
      )} */}
      <QueueSelector running={tasks.length > 0} />
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
