const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Who is the best artist of the year?',
    answers: [
        { text: '21 Savage', correct: true },
        { text: 'Travis Scott', correct: true },
        { text: 'Matro Boomin', correct: true },
        { text: 'Killer Mike', correct: false }
    ]
  },
  {
    question: 'We dont pray for love...',
    answers: [
      { text: 'we just pray for success', correct: false },
      { text: 'we dont pray for happiness', correct: false },
      { text: 'cause its destructive', correct: false },
      { text: 'we just pray for cars', correct: true }
    ]
  },
  {
    question: 'Which one is not a metalcore group?',
    answers: [
      { text: 'I Prevail', correct: false },
      { text: 'Bring Me The Horizon', correct: false },
      { text: 'Mayhem', correct: true },
      { text: 'Pierce The Veil', correct: false }
    ]
  },
  {
    question: 'Which one is not a NF song?',
    answers: [
        { text: 'Hope', correct: false },
        { text: 'The Search', correct: false },
        { text: 'Why', correct: false },
        { text: 'Scars', correct: true }
    ]
  }
]