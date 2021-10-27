import styled from "styled-components"
import { BrowserWindow } from "./BrowserWindow"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
`

const BrowserWindowContainer = styled.div`
  height: 30vh;
  width: 95%;
  margin: auto;
  z-index: -1;
`

const Pipe = styled.div`
  --lightgreen: #16cc16;
  --midgreen: #28a828;
  width: 16vh;
  max-width: 100%;
  height: 33vh;
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

const Timer = styled.div`
  font-size: 3em;
  position: absolute;
  bottom: 0;
  right: 0;
`

interface Props {
  addTask: (task: string) => void
}

export function RenderingPipeline({ addTask }: Props) {
  return (
    <Container>
      <BrowserWindowContainer>
        <BrowserWindow addTask={addTask} />
      </BrowserWindowContainer>
      <Pipe />
      <Timer />
    </Container>
  )
}

{
  /* <template id="pipeline">
  <style>
    
    browser-window.go {
      transition: transform 2s .5s linear;
      transform: translateY(103%);
    }

    .overtime {
      color: red;
    }
  </style>
  <browser-window class="go">
    <button>CLICK ME</button>
  </browser-window>
  <div class="timer" id="seconds-since-repaint"></div>
</template> */
}
{
  /* <script>
  class RenderingPipeline extends HTMLElement {
    constructor() {
      this.secondsSinceRepaint = 0;

      this.browser.addEventListener('transitionend', (event) => {
        this.resolveTask();
        this.startTimer();
      });

    }

    startTimer() {
      this.interval = setInterval(() => {
        this.timer.innerHTML = ++this.secondsSinceRepaint;
        if (this.secondsSinceRepaint > 16) {
          this.timer.classList.add('overtime');
        } else {
          this.timer.classList.remove('overtime');
        }
      }, 500);
    };

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
