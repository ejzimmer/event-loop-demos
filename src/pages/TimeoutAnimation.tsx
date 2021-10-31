import { EventLoop } from "../components/EventLoop"
import { Queue } from "../components/TaskQueues"

const sources = ["html", "browser", "timer", "network", "promise"]

export function TimeoutAnimation() {
  return (
    <EventLoop
      sources={sources}
      rendering={true}
      additionalQueues={[Queue.browser, Queue.promise]}
      forceTimeoutsToZero={true}
    />
  )
}
