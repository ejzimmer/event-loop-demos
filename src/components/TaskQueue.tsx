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
            type={task.type}
            task={task}
          />
        </div>
      ))}
    </Container>
  )
}
