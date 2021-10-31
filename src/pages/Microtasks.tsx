import { EventLoop } from "../components/EventLoop"
import { Queue } from "../components/TaskQueues"

const sources = ["html", "browser", "timer", "network", "promise"]

export function Microtasks() {
  return (
    <EventLoop
      sources={sources}
      rendering={true}
      additionalQueues={[Queue.browser, Queue.promise]}
    />
  )
}
