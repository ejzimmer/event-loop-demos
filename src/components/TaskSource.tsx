import styled, { keyframes } from "styled-components"
import "./task-source.css"

const Container = styled.div`
  --width: 8em;
  --thickness: 12px;
  cursor: pointer;
`

const Thread = styled.div`
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
  addTask: (type: string) => void
}

export function TaskSource({ type, addTask }: Props) {
  return (
    <Container onClick={() => addTask(type)}>
      <div className={type} style={{ margin: "auto" }} />
      {/* <Thread /> */}
      {/* {type === "drive" && <Arm />} */}
    </Container>
  )
}

{
  /* <template id="task-source"> */
}
{
  /* <style>
    .thread-item {
      --size: calc(var(--width) / 2 + var(--thickness));
      width: var(--size);
      height: var(--size);
    }
    .shrinker {
      transform: scale(.4);
      transform-origin: 20% top;
    }


    .browser {
      background-image: url('css/mouse-pointer.svg');
      background-size: contain;
      background-repeat: no-repeat;
      height: calc(var(--width) / 1.16);
      width: calc(var(--width) / 2);
    }

    .timer {
      --colour: white;
      border: var(--thickness) solid var(--colour);
      border-radius: 50%;
      width: var(--width);
      height: var(--width);
      position: relative;
      flex-shrink: 0;
      transition: transform steps(12, end);
    }
    .timer::after {
      content: '';
      border: calc(var(--thickness) / 2) solid var(--colour);
      background-color: var(--colour);
      height: calc((var(--width) - var(--thickness)) / 2);
      position: absolute;
      left: calc(50% - var(--thickness) / 2);
    }
    .timer.go {
      transform: rotate(1turn);
    }

    .network {
      width: var(--width);
      height: var(--width);
      margin: auto;
      background: repeating-radial-gradient(circle at bottom left, white, white 9%, transparent 9%, transparent 18%);
      border-top-right-radius: 100%;
      transform-origin: bottom left;
      transform:  translateX(50%) rotate(-.125turn);
      position: relative;
    }
    .network::after {
      content: '';
      display: block;
      width: 18%;
      height: 18%;
      border-radius: 50%;
      background-color: white;
      position: absolute;
      left: -4.5%;
      bottom: -4.5%;
    }
    .thread .network {
      animation: wifi 3s infinite steps(3);
    }
    @keyframes wifi {
      from {
        background: none;
      }
      33% { 
        background: radial-gradient(circle at bottom left, transparent, transparent 18%, white 18%, white 27%, transparent 27%);
      }
      66% {
        background: radial-gradient(circle at bottom left, transparent, transparent 36%, white 36%, white 45%, transparent 45%);
      }
      to {
        background: radial-gradient(circle at bottom left, transparent, transparent 54%, white 54%, white 63%, transparent 63%);
      }
    }
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

    .immediate::after {
      content: '!';
      font-weight: bold;
      color: white;
      font-size: 4em;
      padding: 0 10px;
      font-family: serif;
    }

    .next-tick {
      width: var(--width);
      height: var(--width);
      display: flex;
      border-radius: 50%;
    }

    .next-tick::after {
      content: '';
      display: block;
      border: 10px solid green;
      width: calc(var(--width) * .6);
      height: calc(var(--width) * .3);
      border-top-style: none;
      border-right-style: none;
      transform: rotate(-.125turn);
      margin: auto;
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
//   const task = document.createElement('div');
//   task.classList.add('thread-item');
//   this.thread.appendChild(task);

//   const shrinker = document.createElement('div');
//   shrinker.classList.add('shrinker');
//   task.appendChild(shrinker);

//   const asyncTask = document.createElement('div');
//   asyncTask.classList.add(this.type);
//   shrinker.appendChild(asyncTask);

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
