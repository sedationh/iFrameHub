import { useNavigate } from "react-router-dom"
import { config } from "../../config"
import usePage from "../../hooks/usePage"
import styled from "@emotion/styled"

const NavTitle = styled.h1`
  font-size: 36px;
  margin-top: 4px;
  text-align: center;
`

const NavWrapper = styled.div`
  max-width: 40px;
  word-break: break-all;
`

const Nav = () => {
  const page = usePage()
  const navigate = useNavigate()

  return (
    <NavWrapper className="pr-2">
      <details className="dropdown">
        <summary className="btn btn-sm btn-neutral">X</summary>
        <ul className="shadow menu dropdown-content z-[1] rounded-box w-40 bg-white">
          {config.map((item) => (
            <li
              onClick={() => {
                navigate(`/p/${item.title}`)
              }}
              key={item.title}
            >
              <a>{item.title}</a>
            </li>
          ))}
        </ul>
      </details>
      <NavTitle>{page.title}</NavTitle>
    </NavWrapper>
  )
}

export default Nav
