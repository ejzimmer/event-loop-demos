import { EventLoop } from "../components/EventLoop"

export function ParserOnly() {
  return <EventLoop sources={["html"]} rendering={false} />
}
