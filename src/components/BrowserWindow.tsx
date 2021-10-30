import styled from "styled-components"

const Container = styled.div`
  display: flex;
  --control-colour: #aaa;
  --control-highlight: #ccc;
  --control-shadow: #888;
  height: 100%;
`

const Chrome = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid var(--control-colour);
  border-left: 4px ridge var(--control-colour);
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;

  &::before {
    content: "";
    width: calc(100% + 3px);
    height: calc(100% + 3px);
    border: 2px solid;
    left: -4px;
    top: -4px;
    border-color: var(--control-highlight);
    border-right-color: var(--control-shadow);
    position: absolute;
    z-index: -1;
  }
`

const TitleBar = styled.div`
  height: 20px;
  margin: -3px -2px -2px -2px;
  border-bottom: 4px ridge #aaa;
  background-color: #aaa;
  position: relative;
  display: flex;
  flex: 0 0 auto;
`

const WindowControl = styled.div`
  --box-shadow-1: 0 -1px 0 1px;
  --box-shadow-2: 0 2px 2px;
  --box-shadow-3: 0 2px rgba(255, 255, 255, 0.25) inset;
  cursor: pointer;
  background: #e53030;
  box-shadow: var(--box-shadow-1) #c91919 inset,
    var(--box-shadow-2) rgba(65, 8, 8, 0.17), var(--box-shadow-3);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 5px 2px;
  border: 1px solid #666;
  flex-shrink: 0;

  &:nth-child(2) {
    background: #ffc334;
    box-shadow: var(--box-shadow-1) #ffb401 inset,
      var(--box-shadow-2) rgba(103, 73, 0, 0.17), var(--box-shadow-3);
  }
  &:last-child {
    background: #0ec518;
    box-shadow: var(--box-shadow-1) #0b9512 inset,
      var(--box-shadow-2) rgba(0, 7, 1, 0.17), var(--box-shadow-3);
  }
`

const Page = styled.div`
  flex-grow: 1;
  padding: 5px;
  display: flex;
`

const Button = styled.button`
  cursor: pointer;
  background: hsl(215, 100%, 50%);
  color: white;
  border: 1px solid #666;
  border-radius: 2px;
  box-shadow: 2px 2px 4px #ccc, 0 -2px 2px hsl(215, 80%, 38%) inset,
    0 2px 2px hsl(215, 80%, 80%) inset;
  width: 80%;
  margin: auto;
  padding: 5px;

  &:active {
    outline: none;
    box-shadow: 0 -2px 2px hsl(215, 80%, 80%) inset,
      0 2px 2px hsl(215, 80%, 38%) inset;
  }
  &:focus {
    outline: none;
  }
`

export function BrowserWindow() {
  return (
    <Container>
      <Chrome>
        <TitleBar>
          <WindowControl />
          <WindowControl />
          <WindowControl />
        </TitleBar>
        <Page>
          <Button>Click me</Button>
        </Page>
      </Chrome>
    </Container>
  )
}
