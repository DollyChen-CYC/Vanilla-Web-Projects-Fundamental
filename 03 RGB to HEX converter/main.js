// function - RGB to HEX
function convertRGB (r, g, b) {
  let hexR = r.toString(16).padStart(2, '0')
  let hexG = g.toString(16).padStart(2, '0')
  let hexB = b.toString(16).padStart(2, '0')
	// 組合成六碼字串
  return '#'.concat(hexR, hexG, hexB)
}

// 選取元素
const converter = document.querySelector('.converter')
const hexValue = document.querySelector('#hex-value')
const sliderR = document.querySelector('#slider-R')
const sliderG = document.querySelector('#slider-G')
const sliderB = document.querySelector('#slider-B')

//在父層監聽拖曳 slider，改變對應文字與底色
converter.addEventListener('click', (event) => {
	const targetItem = event.target
	// 條件式 確認點擊目標為 slider
	if (targetItem.classList.contains('sliders')) {
		// 算出目前的 HEX code
		let currentHEX = convertRGB(Number(sliderR.value), Number(sliderG.value), Number(sliderB.value))
		// 改變 RGB 顯示數字
		targetItem.nextElementSibling.value = targetItem.value
		// 改變 HEX 顯示數字
		hexValue.innerText = currentHEX
		// 改變容器底色
		converter.style.backgroundColor = currentHEX
	}	
})

//在父層監聽文字輸入，改變對應 slider, HEX code, 與底色
converter.addEventListener('input', (event) => {
	const targetItem = event.target
	
	// 條件式 確保使用者輸入值為 0~255 的數字
	if (targetItem.value.includes(' ') || isNaN(Number(targetItem.value)) || Number(targetItem.value) > 255) {
		window.alert('輸入值有誤，請重新確認輸入值為數字，且其值小於 256')
	} else {
		// 使 slider 表現對應位置
		targetItem.previousElementSibling.value = targetItem.value
		// 算出目前的 HEX code
		let currentHEX = convertRGB(Number(sliderR.value), Number(sliderG.value), Number(sliderB.value))
		// 改變 HEX 顯示數字
		hexValue.innerText = currentHEX
		// 改變容器底色
		converter.style.backgroundColor = currentHEX
	}
})


