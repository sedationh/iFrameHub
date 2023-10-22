import Board from "./components/Board"

const config = [
  {
    src: "https://poe.com/ChatGPT",
  },
  {
    src: "https://github.com/",
  },
  {
    src: "https://crdt-collaborative-edit.sedationh.top/",
  },
  {
    src: "https://reading-helper.vercel.app/",
  },
  // {
  //   src: "https://developer.mozilla.org/en-US/",
  // },
  // {
  //   src: "https://meego.feishu.cn/enterprise_application/userGantt/fryhmDmIR",
  // },
]

function App() {
  return (
    <div className="h-screen flex gap-4">
      {config.map((item, index) => (
        <Board key={index} src={item.src} />
      ))}
    </div>
  )
}

export default App
