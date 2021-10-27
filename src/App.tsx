import { Switch, Route, Link } from "react-router-dom"
import { ParserOnly } from "./pages/ParserOnly"
import { Simple } from "./pages/Simple"

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="parser-only">Parser only</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/parser-only">
          <ParserOnly />
        </Route>
        <Route path="/simple">
          <Simple />
        </Route>
      </Switch>
    </>
  )
}

export default App
