import { useNavigate } from "react-router-dom"
import styled from "@emotion/styled"
import { CaretRightFilled } from "@ant-design/icons"
import { Button, Drawer } from "antd"
import { useState } from "react"
import { QuickJump } from "../QuickJump"
import useKeyDown from "../../hooks/useKeyDown"

const NavWrapper = styled.div`
  min-width: 40px;
  word-break: break-all;
`

const Nav = () => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const handleJumpConfig = () => {
    navigate("/setting")
    setOpen(false)
  }

  useKeyDown("e", () => setOpen(!open))

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
        <QuickJump setOpen={setOpen}></QuickJump>
        <Button
          type="primary"
          shape="round"
          className="absolute bottom-9 left-5 "
          onClick={handleJumpConfig}
        >
          配置
        </Button>
      </Drawer>
    </NavWrapper>
  )
}

export default Nav
