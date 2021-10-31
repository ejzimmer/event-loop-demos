import { useEffect, useState } from "react"
import styled from "styled-components"

interface ItemProps {
  duration: number
  height: string
}

const Item = styled.div`
  width: calc(var(--queue-width) * 0.8);
  height: ${({ height }: ItemProps) => height};
  background-color: white;
  border: 4px solid black;
  flex-shrink: 0;
  display: flex;
  transition: left 0.5s linear, bottom 0.5s linear, height 3s linear;
  transition-duration: ${({ duration }: ItemProps) => `.5s, .5s, ${duration}s`};
  position: absolute;
  right: 0;
  bottom: 0;
  overflow: hidden;
  color: black;

  &::before {
    margin: auto;
    content: "{}";
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
    overflow: hidden;
    font-size: 3em;
  }
`

interface Props {
  running: boolean
  onFinished: () => void
  type: string
}

export function Task({ running, onFinished, type }: Props) {
  const [duration] = useState(Math.random() * 4 + 2)
  const [height, setHeight] = useState("var(--queue-width)")

  useEffect(() => {
    if (running) {
      requestAnimationFrame(() => requestAnimationFrame(() => setHeight("0")))
    }
  }, [running])

  return (
    <Item
      duration={duration}
      height={height}
      onTransitionEnd={onFinished}
      className={`task ${type}`}
    />
  )
}
