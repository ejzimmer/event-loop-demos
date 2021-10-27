import styled, { keyframes } from "styled-components"

const Container = styled.div`
  display: flex;
  position: absolute;
  transition: left 0.3s;
  width: var(--queue-width);
  bottom: calc(-1 * var(--queue-width));
`

const spin = keyframes`
  to { transform: rotate(-1turn); }
`

interface LoopProps {
  running: boolean
}

const Loop = styled.img`
  margin: auto;
  width: 100%;
  height: 100%;
  animation: ${spin} 1s 0.3s linear infinite;
  animation-play-state: ${({ running }: LoopProps) =>
    running ? "running" : "paused"};
`

interface Props {
  running: boolean
}

export function QueueSelector({ running }: Props) {
  // useEffect(() => {
  //   setTimeout(() => pickQueue(), 500)
  // }, [])

  return (
    <Container>
      <Loop running={running} src="circular-arrow.svg" />
    </Container>
  )
}

{
  /* <script>
  class QueueSelector extends HTMLElement {

    connectedCallback() {
      this.animationQueue = document.querySelector('task-queue[type="animation"]');
      this.microtaskQueue = document.querySelector('task-queue[type="microtask"]');      

      document.body.addEventListener('click', this.startTimer.bind(this), { once: true });
    }

    startTimer() {
      setTimeout(() => { this.readyToPaint = true }, 8000);
    }

    async pickQueue() {
      const queue = this.getNextQueue();
      if (queue === this.renderingPipeline) {
        if (this.animationQueue) {
          await this.doQueue(this.animationQueue);          
        }
        await this.doQueue(this.renderingPipeline);
        setTimeout(() => this.readyToPaint = true, 8000);
      } else if (queue) {
        await this.doQueue(queue);
      } else {
        await this.wait();
      }
      this.pickQueue();
    }

    async doQueue(queue) {
      this.moveToQueue(queue);
      this.spin();
      await queue.runTask();
      this.spin(false);
    }

    getNextQueue() {
      if (this.microtaskQueue && this.microtaskQueue.getTask(0)) {
        return this.microtaskQueue;
      } 
      if (this.renderingPipeline.rendering && this.readyToPaint && this.repaint) {
        this.readyToPaint = false;
        this.repaint = false;
        return this.renderingPipeline;
      } 
      const queues = document.querySelectorAll('task-queue');
      for (let queue of queues) {
        if (queue.getTask(0)) {
          this.repaint = true;
          if (queue.type !== 'animation') {
            return queue;
          }
        }
      }
    }

    moveToQueue(queue) {
      const container = document.querySelector('task-queues');
      const containerLeft = container.getBoundingClientRect().left;
      const queueLeft = queue.getBoundingClientRect().left;

      const leftDistance = queueLeft - containerLeft;
      this.style.left = `${leftDistance + 16}px`; 
    }

    spin(run = true) {
      this.loop.style.animationPlayState = run ? 'running' : 'paused';
    }

    wait() {
      return new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  customElements.define('queue-selector', QueueSelector);
</script> */
}
