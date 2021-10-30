import { Switch, Route, Link } from "react-router-dom"
import { RenderingPipeline } from "./pages/RenderingPipeline"
import { ParserOnly } from "./pages/ParserOnly"
import { Simple } from "./pages/Simple"
import { MultipleQueues } from "./pages/MultipleQueues"

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="parser-only">Parser only</Link>
          <Link to="simple">Simple</Link>
          <Link to="rendering-pipeline">Rendering Pipeline</Link>
          <Link to="multiple-queues">Multiple Queues</Link>
        </li>
      </ul>
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
      </Switch>
    </>
  )
}

export default App
