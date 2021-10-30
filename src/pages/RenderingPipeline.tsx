import { EventLoop } from "../components/EventLoop"

const sources = ["html", "browser", "timer", "network"]

export function RenderingPipeline() {
  return <EventLoop sources={sources} rendering={true} />
}
