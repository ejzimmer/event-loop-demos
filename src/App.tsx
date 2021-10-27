import { Switch, Route } from "react-router-dom"
import { ParserOnly } from "./pages/ParserOnly"
import { Simple } from "./pages/Simple"

function App() {
  return (
    <Switch>
      <Route path="/parser-only">
        <ParserOnly />
      </Route>
      <Route path="/simple">
        <Simple />
      </Route>
    </Switch>
  )
}

export default App
