import { EventLoop } from "../components/EventLoop"
import { Queue } from "../components/TaskQueues"

const sources = ["html", "browser", "timer", "network"]

export function MultipleQueues() {
  return (
    <EventLoop
      sources={sources}
      rendering={true}
      additionalQueues={[Queue.browser]}
    />
  )
}
