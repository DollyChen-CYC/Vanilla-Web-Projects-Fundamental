// 選取元素
const icon = document.querySelector('.icon')
const controllers = document.querySelector('#controller')

// 監聽事件 method 2
controllers.addEventListener('click', event => {
  let targetItem = event.target
  let theme = event.target.id
  
  if (theme.length > 0) {
    icon.classList.remove('dark', 'light')
    icon.classList.add(theme)
  } else if (targetItem.innerText === 'Default') {
    icon.classList.remove('dark', 'light')
  }
})

// // 監聽事件 - method 1
// // 注意：避免 class 一直加上去，一開始都要先清除
// controllers.addEventListener('click', (event) => {
//   let targetItem = event.target
  
//   if (targetItem.id === 'dark') {
//     icon.classList.remove('dark', 'light')
//     icon.classList.add('dark')
//   } else if (targetItem.id === 'light') {
//     icon.classList.remove('dark', 'light')
//     icon.classList.add('light')
//   } else if (targetItem.innerText === 'Default')
//     icon.classList.remove('light', 'dark')
// })