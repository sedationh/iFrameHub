import { useNavigate } from "react-router-dom"
import styled from "@emotion/styled"
import { CaretRightFilled } from "@ant-design/icons"
import { Button, Drawer } from "antd"
import { useState } from "react"
import { config } from "../../config"

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
      </Drawer>
    </NavWrapper>
  )
}

export default Nav
