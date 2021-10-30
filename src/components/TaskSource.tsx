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
  const [threads, setThreads] = useState<{ id: number; time: number }[]>([])
  const [nextId, setNextId] = useState(0)

  const isAsync = asyncTasks.includes(type)

  const addTask = () => {
    isAsync ? pushThread(Math.random() * 4 + 2) : pushTask(type)
  }

  const pushThread = (time: number) => {
    setThreads((threads) => [...threads, { id: nextId, time }])
    setNextId((nextId) => nextId + 1)
  }

  const removeThread = (id: number) => {
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
  id: number
  type: string
  removeThread: (id: number) => void
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

    .network:hover {
      transform:  translateX(50%) rotate(-.125turn);
    }


    .drive {
      width: var(--width);
      height: calc(var(--width) * 1.4);
      border: 12px solid white;
      border-radius: 4px;
      position: relative;
      background: 
        radial-gradient(circle at 50% 40%, transparent, transparent 5%, white 5%, white 10%, #f7df1e 10%, grey 50%, white 50%, white calc(50% + 1px), transparent 20%),
        radial-gradient(circle at 30% 75%, #334 20%, white calc(20% + 4px), transparent calc(20% + 4px));
    }

    .promise {
      width: var(--width);
      height: var(--width);
      background-color: #f7df1e;
      position: relative;
    }
    .promise::after {
      content: 'then';
      position: absolute;
      right: 5px;
      bottom: 5px;
      color: black;
      font-size: 2em;
    }

    .animation {
      width: var(--width);
      height: var(--width);
      background-image: url('cat.png');
      background-size: contain;
    }
    .animation.running {
      background-image: url('css/cat.gif');
    }

    .postmessage {
      width: var(--width);
      height: calc(var(--width) / 1.4);
      margin-top: calc(var(--width) * .3);
      border: 4px solid white;
      position: relative;
    }

    .postmessage::after {
      content: '';
      display: block;
      border: inherit;
      width: calc(var(--width) / 1.41 - 1.5px);
      height: calc(var(--width) / 1.41 - 1.5px);
      transform-origin: top left;
      transform: rotate(-.125turn);
      position: absolute;
      left: -2.5px;
      top: -.5px;
      border-top: transparent;
      border-right: transparent;
      border-bottom-left-radius: 5px;
    }
  </style> */
}
// </template>
{
  /* <script>
  class TaskSource extends HTMLElement {

    connectedCallback() {

      if (asyncTasks.includes(this.type)) {
        this.source.addEventListener('click', () => {
          this.startAsyncTask();
        });
      } 
    } */
}

// startAsyncTask() {

//   requestAnimationFrame(() => asyncTask.classList.add('go'));

//   if (this.type === 'timer') {
//     asyncTask.style.transitionDuration = `${this.getRandomTime()}ms`;
//     asyncTask.addEventListener('transitionend', () => {
//       this.addTask();
//       task.remove();
//     });
//   } else if (this.type === 'drive') {
//     const isPlaying = this.arm.style.animationPlayState === 'running';

//     if (!isPlaying) {
//       this.arm.style.animationPlayState = 'running';
//       this.finishDriveTask(task);
//     }
//   } else {
//     this.finishTask(task);
//   }
// }

// finishTask(task, time = this.getRandomTime()) {
//   setTimeout(() => {
//     this.addTask();
//     task.remove();
//   }, time);
// }

// finishDriveTask(task) {
//   setTimeout(() => {
//     this.finishTask(task, 0);

//     const driveTasks = this.shadow.querySelectorAll('.drive + .thread .thread-item');
//     if (driveTasks.length > 1) {
//       const nextTask = driveTasks[1];
//       this.finishDriveTask(nextTask);
//     } else {
//       this.arm.style.animationPlayState = 'paused';
//     }
//   }, this.getRandomTime());
// }

// getRandomTime() {
//   return (Math.random() * 7000) + 3000;
// }

// addTask() {
//   const type = this.type === 'promise' ? 'microtask' : this.type;
// }

//   run() {
//     this.source.classList.add('running');
//   }
//   stop() {
//     this.source.classList.remove('running');
//   }

//   hasTasksWaiting() {
//     if (this.thread) {
//       return !!this.thread.children.length;
//     }
//   }
// }
//  </script>
