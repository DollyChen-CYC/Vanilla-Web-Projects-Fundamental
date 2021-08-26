// Step 1: 透過 querySelector 選到三個元素
const countAddIcon = document.querySelector(".chevron-up")
const countDeductIcon = document.querySelector(".chevron-down")
const numberElement = document.querySelector(".number")

// Step 2: 監聽 click 事件，並執行對應行為
countAddIcon.addEventListener("click", e => {
	//step3 將數字加在現在顯示的數字上
	const currentNumber = Number(numberElement.textContent)
	numberElement.textContent = currentNumber + 1
})

countDeductIcon.addEventListener("click", e => {
	//step3 將數字加在現在顯示的數字上
	const currentNumber = Number(numberElement.textContent)
	numberElement.textContent = currentNumber - 1
})
