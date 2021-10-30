import styled, { keyframes } from "styled-components"

interface ContainerProps {
  column: number
}
const Container = styled.div`
  width: var(--queue-width);
  height: var(--queue-width);
  grid-column: ${({ column }: ContainerProps) => column};
  grid-row: 2;
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
  column: number
}

export function QueueSelector({ running, column }: Props) {
  return (
    <Container column={column}>
      <Loop running={running} src="circular-arrow.svg" />
    </Container>
  )
}
