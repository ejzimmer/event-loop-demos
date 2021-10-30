import { EventLoop } from "../components/EventLoop"

const sources = ["html", "browser", "timer", "network"]

export function MultipleQueues() {
  return (
    <EventLoop sources={sources} rendering={true} additionalQueue="browser" />
  )
}
