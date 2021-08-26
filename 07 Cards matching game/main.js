////// ------------ State of Game ----------- //////
const GameState = {
  awaitFirstCard: 'awaitFirstCard',
  awaitSecondCard: 'awaitSecondCard',
  pairingSuccess: 'pairingSuccess',
  pairingFailed: 'pairingFailed',
  gameFinished: 'gameFinished'
}

////// ------------ Utilities ----------- //////
const utility = {
  // four suits of cards
  Symbols : {
    spade: 'https://image.flaticon.com/icons/svg/105/105223.svg', // 黑桃
    heart: 'https://image.flaticon.com/icons/svg/105/105220.svg', // 愛心
    diamond: 'https://image.flaticon.com/icons/svg/105/105212.svg', // 方塊
    club: 'https://image.flaticon.com/icons/svg/105/105219.svg' // 梅花
  },
  // Fisher-Yates Shuffle
  getRandomNumberArray (count) {
    const number = Array.from(Array(count).keys())
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1))
        ;[number[index], number[randomIndex]] = [number[randomIndex], number[index]]
    }
    return number
  },
  // Number to Poker Point converter 
  convertNumIntoPokerPoint (num) {
    switch (num) {
      case 1:
        return 'A'
      case 11:
        return 'J'
      case 12:
        return 'Q'
      case 13:
        return 'K'
      default:
        return num
    }
  }
}

////// ------------ MVC - View ----------- //////
const view = {
  //--- Functions related to dealing cards ---//
  getCardElement (index) {
    return `
      <div class="card back" data-index=${index}>
      </div> 
    `
  },
  getCardContent (index) {
    const point = utility.convertNumIntoPokerPoint(index % 13 + 1)
    const symbol = Math.floor(index % 3)
    return `
      <p>${point}</p>
      <img src="${Object.values(utility.Symbols)[symbol]}" alt="suit icons">
      <p>${point}</p>
    `
  },
  renderCards () {
    const cardsPanel = document.querySelector('#cards-panel')
    cardsPanel.innerHTML = model.cards.map(card => this.getCardElement(card)).join('')
  },
  //----- Function of Flipping Cards ------ //
  flipCard (...cards) {
    cards.map(card => {
      if (card.classList.contains('back')) {
        card.classList.remove('back')
        card.innerHTML = this.getCardContent(card.dataset.index)
      } else {
        card.classList.add('back')
        card.innerHTML = null // 欄位根本不存在，所以是null
      }
    })
  },
  //----- Functions related to poker matching -------//
  appendWrongAnimation(...cards) {
    cards.map(card => {
      card.classList.add('wrong')
      card.addEventListener('animationend', event => {card.classList.remove('wrong')}, {once: true}) // 重要！！！！ 
    })
  },
  showPaired (...cards) {
    cards.map(card => {
      card.classList.add('paired')
    })
  },
  //----- Functions of game records ------ //
  renderScore () {
    const scoreInfo = document.querySelector('#score')
    scoreInfo.innerHTML = `Score: ${model.score}`
  },
  renderMatchCount () {
    const countInfo = document.querySelector('#count')
    countInfo.innerHTML = `You've tried: ${model.matchCount} times`
  },
  //----- Function to announce game finished ------ //
  showCompletionAnnouncement () {
    const newDiv = document.createElement('div')  // 新用法！！！
    newDiv.classList.add('announcement-box')
    newDiv.innerHTML = `
      <h2>Complete!</h1>
      <h5>Score: 260</h5>
      <h5>You've tried: ${model.matchCount} times</h5>
    `
    const cardsPanel = document.querySelector('#cards-panel') // 新用法！！！
    cardsPanel.after(newDiv)
  }
}

////// ------------ MVC - Models ----------- //////
// 模型（Model）- 用於封裝與應用程式的業務邏輯相關的資料以及對資料的處理方法。
const model = {
  cards: [],
  selectedCards: [],
  currentState: GameState.awaitFirstCard,
  score: 0,
  matchCount: 0,
  isSelectedCardsMatched () {
    return this.selectedCards[0].dataset.index % 13 === this.selectedCards[1].dataset.index % 13
  }
}

///// ------------ MVC - Controls ----------- /////
const control = {
  //--- Functions related to dealing cards ---//
  getShuffledCards () {
    model.cards = utility.getRandomNumberArray(52)
    view.renderCards()
  },
  //----- Functions related to event dispatching and poker matching -------//
  dispatchEventActions (card) {
    if (!card.classList.contains('back')) {
      return
    } 
    switch (model.currentState) {
      case GameState.awaitFirstCard:
        view.flipCard(card)
        model.selectedCards.push(card)
        model.currentState = GameState.awaitSecondCard
        return
      case GameState.awaitSecondCard:
        view.flipCard(card)
        model.selectedCards.push(card)
        model.matchCount++
        view.renderMatchCount()
        if (!model.isSelectedCardsMatched()) {
          // Actions taken when match failed
          model.currentState = GameState.pairingFailed
          view.appendWrongAnimation(...model.selectedCards)
          setTimeout(this.resetCards, 500)
        } else {
          // Actions taken when match success
            model.GameState = GameState.pairingSuccess
            view.showPaired(...model.selectedCards)
            model.score += 10
            view.renderScore()
            // if game completed, show announcement
            if (model.score >= 260) {
              model.currentState =GameState.gameFinished
              view.showCompletionAnnouncement()
              return
            }
            model.selectedCards = []
            model.currentState = GameState.awaitFirstCard
            return
        }
    }
  },
  resetCards () {
    view.flipCard(...model.selectedCards)
    model.selectedCards = []
    model.currentState = GameState.awaitFirstCard
  }
}

////// ------ Game Start ------- //////
control.getShuffledCards()
////// ------ Listen to all cards ------- //////
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', event => {
    control.dispatchEventActions(card)
    // console.log(card)
  })
})

// 使用覆值解構優化相關程式碼