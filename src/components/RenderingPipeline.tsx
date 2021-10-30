import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { BrowserWindow } from "./BrowserWindow"

const Container = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
`

const BrowserWindowContainer = styled.div`
  width: 95%;
  margin: auto;
  z-index: -1;
  height: 10vh;
`

const Pipe = styled.div`
  --lightgreen: #16cc16;
  --midgreen: #28a828;
  width: 16vh;
  max-width: 100%;
  height: 16vh;
  border: 6px solid #006000;
  background: linear-gradient(
    to right,
    green,
    green 12%,
    var(--midgreen) 12%,
    var(--midgreen) 15%,
    green 15%,
    green 17%,
    var(--midgreen) 17%,
    var(--midgreen) 60%,
    var(--lightgreen) 60%,
    var(--lightgreen) 81%,
    var(--midgreen) 81%,
    var(--midgreen) 86%,
    var(--lightgreen) 86%,
    var(--lightgreen) 93%,
    var(--midgreen) 93%
  );
  box-sizing: border-box;
  position: relative;

  &::before {
    content: "";
    display: block;
    height: 25%;
    position: absolute;
    border: inherit;
    left: calc(-2vw - 6px);
    right: calc(-2vw - 6px);
    top: -6px;
    background: inherit;
  }
`
interface TimerProps {
  overtime: boolean
}
const Timer = styled.div`
  font-size: 3em;
  color: ${({ overtime }: TimerProps) => (overtime ? "red" : "white")};
  align-self: end;
  margin-left: 1em;
`

interface Props {
  run: boolean
  readyToRender: () => void
  renderDone: () => void
}

export function RenderingPipeline({ run, readyToRender, renderDone }: Props) {
  const [time, setTime] = useState(0)
  const interval = useRef<any>()

  useEffect(() => {
    interval.current = setInterval(() => setTime((time) => time + 1), 1000)

    return () => clearInterval(interval.current)
  }, [])

  useEffect(() => {
    if (time >= 16) {
      readyToRender()
    }
  }, [time])

  useEffect(() => {
    run && setTime(0)
  }, [run])

  return (
    <Container>
      <div>
        <BrowserWindowContainer>
          <BrowserWindow render={run} renderDone={renderDone} />
        </BrowserWindowContainer>
        <Pipe />
      </div>
      <Timer overtime={time >= 16}>{time}</Timer>
    </Container>
  )
}

{
  /* <template id="pipeline">
  <style>
    

  </style>
}
{
  /* <script>

    runTask() {
      const taskPromise = new Promise(resolve => this.resolveTask = resolve);

      this.secondsSinceRepaint = 0;
      clearInterval(this.interval);

      requestAnimationFrame(() => {
        this.browser.classList.remove('go');

        requestAnimationFrame(() => {
          this.browser.classList.add('go');
        });
      });

      return taskPromise;
    }
  }
</script> */
}
