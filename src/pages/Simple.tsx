import { EventLoop } from "../components/EventLoop"

const sources = ["html", "browser", "timer", "network"]

export function Simple() {
  return <EventLoop sources={sources} rendering={false} />
}
