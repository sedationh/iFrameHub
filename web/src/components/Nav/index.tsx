import { useNavigate } from "react-router-dom"
import styled from "@emotion/styled"
import { CaretRightFilled } from "@ant-design/icons"
import { Button, Drawer } from "antd"
import { useState } from "react"
import { useGlobalConfig } from "../../context/globalConfig"

const NavWrapper = styled.div`
  min-width: 40px;
  word-break: break-all;
`

const Nav = () => {
  const navigate = useNavigate()

  const handleJump = (item) => {
    navigate(`/p/${item.title}`)
  }

  const [open, setOpen] = useState(false)

  const { config } = useGlobalConfig()

  const handleJumpConfig = () => {
    navigate("/setting")
    setOpen(false)
  }

  return (
    <NavWrapper className="mr-2">
      <div
        className="flex justify-center items-center cursor-pointer w-full h-full bg-secondary hover:bg-secondary-focus transition-all rounded"
        onClick={() => setOpen(true)}
      >
        <CaretRightFilled />
      </div>
      <Drawer
        placement="left"
        onClose={() => {
          setOpen(false)
        }}
        open={open}
        maskClosable
        mask
        closable={false}
      >
        <ul>
          {config.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                handleJump(item)
                setOpen(false)
              }}
            >
              <Button type="link">{item.title}</Button>
            </li>
          ))}
        </ul>
        <Button
          type="primary"
          shape="round"
          className="absolute bottom-9 left-5 bg-blue-500"
          onClick={handleJumpConfig}
        >
          配置
        </Button>
      </Drawer>
    </NavWrapper>
  )
}

export default Nav
