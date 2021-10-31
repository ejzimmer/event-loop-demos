import styled from "styled-components"
import { Task } from "./Task"
import "./task-types.css"

const getColour = (queueType: string) => {
  switch (queueType) {
    case "promise":
      return "#f7df1e"
    case "next-tick":
      return "green"
    case "animation":
      return "#28a828"
    default:
      return "orange"
  }
}

interface ContainerProps {
  type: string
}
const Container = styled.div`
  --container-colour: ${({ type }: ContainerProps) => getColour(type)};
  display: block;
  width: var(--queue-width);
  height: calc(var(--queue-width) * 0.5);
  position: relative;
  border: 16px solid var(--container-colour);
  border-top-color: transparent;
  align-self: flex-end;

  &::before,
  &::after {
    content: "";
    --curl-width: calc(var(--queue-width) / 4);
    width: var(--curl-width);
    height: var(--curl-width);
    display: block;
    border: 16px solid var(--container-colour);
    border-radius: 50%;
    border-bottom-color: transparent;
    border-right-color: transparent;
    transform: translateY(16px) rotate(0.125turn);
    position: absolute;
    bottom: calc(100% - 1vw - 4px);
  }
  &::before {
    right: 100%;
  }
  &::after {
    left: 100%;
  }
`

interface Props {
  tasks: { type: string; id: string }[]
  taskIsDone: (type: string) => void
  canRun: boolean
  type: string
}

export function TaskQueue({ tasks, taskIsDone, canRun, type }: Props) {
  return (
    <Container type={type}>
      {tasks.map((task, index) => (
        <div
          key={task.id}
          style={{
            position: "absolute",
            right: `${index * 8}px`,
            bottom: `${index * 8}px`,
            zIndex: index * -1,
          }}
        >
          <Task
            running={index === 0 && canRun}
            onFinished={() => taskIsDone(task.type)}
          />
        </div>
      ))}
    </Container>
  )
}

{
  /* <script>
  class TaskQueue extends HTMLElement {
    constructor() {

      this.tasks = this.shadow.querySelector('.tasks');

      const typeAttribute = this.attributes.type;
      this.type = typeAttribute ? typeAttribute.value : 'default';

      const colour = this.getColour(this.type);
      this.style.setProperty('--container-colour', colour);

      const shadowColour = this.getShadowColour(this.type);
      this.style.setProperty('--shadow-colour', shadowColour);

      this.addEventListener('do-task', this.runTask);
    }


    getShadowColour(queueType) {
      if (queueType === 'animation' || queueType === 'next-tick') {
        return '#006000';
      }

      return '#93510b';
    }

    addTask(taskType) {
      const task = document.createElement('div');
      task.classList.add('task');
      task.classList.add(taskType);

      const index = this.getTasks().length;
      this.positionTask(task, index);

      this.tasks.appendChild(task);
    }

    getTasks() {
      return this.shadow.querySelectorAll('.task');
    }
    getTask(index) {
      return this.getTasks()[index];
    }
    hasTasks() {
      return this.getTasks().length;
    }

    async runTask(time) {
      if (this.type === 'animation') {
        return this.runAnimationTasks();
      }

      const firstTask = this.getTask(0);
      if (firstTask) {
        let duration = time || this.getRandomTime();
        if (firstTask.classList.contains('repeating')) {
          this.addTask('repeating');
          duration = 2;
        }
        await this.startTask(firstTask, duration);
      }
    }

    startTask(task, duration) {
      let resolveTask;
      const taskPromise = new Promise(resolve => resolveTask = resolve);

      task.addEventListener('transitionend', (event) => {
        if (event.propertyName === 'height') {
          task.remove();
          this.redrawTasks();
          resolveTask();
        }
      })

      return taskPromise;
    }

    async runAnimationTasks() {
      const animationSource = document.querySelector('task-source[type="animation"]');
      animationSource.run();
      const currentTasks = this.getTasks();
      currentTasks.forEach(task => task.style.borderColor = 'white');
      for (let task of currentTasks) {
        await this.startTask(task);
      }
      animationSource.stop();
    }

    redrawTasks() {
      const tasks = this.getTasks();
      tasks.forEach(this.positionTask);
    }

    positionTask(task, index) {
      task.style.right = `${index * 8}px`;
      task.style.bottom = `${index * 8}px`;
      task.style.zIndex = index * -1;			
    }

  }
  customElements.define('task-queue', TaskQueue);
</script>
 */
}
