import { Switch, Route, Link } from "react-router-dom"
import { RenderingPipeline } from "./pages/RenderingPipeline"
import { ParserOnly } from "./pages/ParserOnly"
import { Simple } from "./pages/Simple"
import { MultipleQueues } from "./pages/MultipleQueues"
import { Microtasks } from "./pages/Microtasks"
import { RequestAnimationFrame } from "./pages/RequestAnimationFrame"
import { TimeoutAnimation } from "./pages/TimeoutAnimation"

import "./App.css"

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="parser-only">Parser only</Link>
          </li>
          <li>
            <Link to="simple">Simple</Link>
          </li>
          <li>
            <Link to="rendering-pipeline">Rendering Pipeline</Link>
          </li>
          <li>
            <Link to="multiple-queues">Multiple Queues</Link>
          </li>
          <li>
            <Link to="microtasks">Microtasks</Link>
          </li>
          <li>
            <Link to="timeout-animation">Timeout animation</Link>
          </li>
          <li>
            <Link to="animation">requestAnimationFrame</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/parser-only">
          <ParserOnly />
        </Route>
        <Route path="/simple">
          <Simple />
        </Route>
        <Route path="/rendering-pipeline">
          <RenderingPipeline />
        </Route>
        <Route path="/multiple-queues">
          <MultipleQueues />
        </Route>
        <Route path="/microtasks">
          <Microtasks />
        </Route>
        <Route path="/timeout-animation">
          <TimeoutAnimation />
        </Route>
        <Route path="/animation">
          <RequestAnimationFrame />
        </Route>
      </Switch>
    </>
  )
}

export default App
