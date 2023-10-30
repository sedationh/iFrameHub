export const isJSON = (data: string) => {
  try {
    JSON.parse(data)
    return true
  } catch (error) {
    return false
  }
}

export const jumpBoard = (index) => {
  const boards = document.querySelectorAll(".board")
  let x = 0
  for (let i = 0; i < index; i++) {
    x += boards[i].clientWidth + 16
  }
  setTimeout(() => {
    const $page = document.querySelector("#page")
    $page.scrollTo({
      left: x,
      behavior: "smooth",
    })
  }, 200)
}
