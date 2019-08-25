; (function () {
    const text = `Рыба ТЕКСТ поможет
дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев
более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.
По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.`

    const inputElement = document.querySelector('#input')
    const textExampleElement = document.querySelector('#textExample')

    const lines = getLines(text)

    let letterId = 1 // актуальный символ

    let startMoment = null
    let started = false

    let letterCounter = 0
    let letterCounter_error = 0

    init()

    /*     Задачка посложенее чем фокус для vk!))
        Получилось с дубляжом: второе нажатие
        обработает символ! + сделал залипание CapsLock */

    focusPocus();

    function focusPocus() {
        const bodyElement = document.querySelector('body')
        bodyElement.tabIndex
        bodyElement.addEventListener('keyup', function (event) {
            inputElement.focus();
        })
    }

    function init() {
        update()

        inputElement.focus()


        inputElement.addEventListener('keydown', function (event) {
            // console.log(event);

            const currentLineNumber = getCurrentLineNumber()
            const element = document.querySelector(`[data-key="${event.key.toLowerCase()}"]`)
            const elementCode = document.querySelector(`[data-code="${event.code}"]`)

            if (event.key !== 'Shift' && event.key !== 'CapsLock') {
                letterCounter = letterCounter + 1
            }

            if (!started) {
                started = true
                startMoment = Date.now()
            }

            const currentLetter = getCurrentLetter()

            if (event.key.startsWith('F') && event.key.length > 1) {
                return
            }

            // отдельно обрабатываем CapsLock
            if (element && !element.classList.contains("hint")) {
                element.classList.add('hint')
            } else {
                if (element) {
                    element.classList.remove('hint')
                }
            }

            if (elementCode) {
                elementCode.classList.add('hint')
            }

            const isKey = event.key === currentLetter.original
            const isEnter = event.key === 'Enter' && currentLetter.original === '\n'

            if (isKey || isEnter) {
                letterId = letterId + 1
                update()
            }
            else {
                event.preventDefault() // отменить стандартную обработку события

                if (event.key !== 'Shift' && event.key !== 'CapsLock') {
                    letterCounter_error = letterCounter_error + 1

                    for (const line of lines) {
                        for (const letter of line) {
                            if (letter.original === currentLetter.original) {
                                letter.success = false
                            }
                        }
                    }
                }

                update()
            }

            if (currentLineNumber !== getCurrentLineNumber()) {
                inputElement.value = ''
                event.preventDefault()

                const time = Date.now() - startMoment

                document.querySelector('#wordsSpeed').textContent = Math.round(60000 * letterCounter / time)
                document.querySelector('#errorProcent').textContent = Math.floor(10000 * letterCounter_error / letterCounter) / 100 + '%'

                started = false
                letterCounter = 0
                letterCounter_error = 0
            }
        })

        inputElement.addEventListener('keyup', function (event) {
            const element = document.querySelector(`[data-key="${event.key.toLowerCase()}"]`)
            const elementCode = document.querySelector(`[data-code="${event.code}"]`)

            // отдельно обрабатываем CapsLock
            if (event.key.toLowerCase() !== 'capslock') {
                if (element) {
                    element.classList.remove('hint')
                }
                if (elementCode) {
                    elementCode.classList.remove('hint')
                }
            }
        })

    }




    // Принимает длинную строку, возвращает массив строк со служебной информацией
    function getLines(text) {
        const lines = [];

        let line = []
        let idCounter = 0
        for (const originalLetter of text) {
            idCounter = idCounter + 1

            let letter = originalLetter

            if (letter === ' ') {
                letter = 'º'
            }

            if (letter === '\n') {
                letter = '¶\n'
            }

            line.push({
                id: idCounter,
                label: letter,
                original: originalLetter,
                success: true
            })

            if (line.length >= 70 || letter === '¶\n') {
                lines.push(line)
                line = []
            }

        }

        if (line.length > 0) {
            lines.push(line)
        }

        return lines
    }

    function lineToHtml(line) {
        const divElement = document.createElement('div')
        divElement.classList.add('line')

        for (const letter of line) {
            const spanElement = document.createElement('span')
            spanElement.textContent = letter.label

            divElement.append(spanElement)

            if (letterId > letter.id) {
                spanElement.classList.add('done')
            }

            else if (!letter.success) {
                spanElement.classList.add('hint')
            }
        }

        return divElement

    }

    function getCurrentLineNumber() {
        for (let i = 0; i < lines.length; i++) {
            for (const letter of lines[i]) {
                if (letter.id === letterId) {
                    return i
                }
            }
        }
    }

    // Функция обновления 3-х отображаемых актуальных строк #textExample
    function update() {
        const currentLineNumber = getCurrentLineNumber()

        textExampleElement.innerHTML = ''

        for (let i = 0; i < lines.length; i++) {
            const html = lineToHtml(lines[i])
            textExampleElement.append(html)

            if (i < currentLineNumber || i > currentLineNumber + 2) {
                html.classList.add('hidden')
            }
        }
    }

    // Возвращает объект символа ожидаемый программой
    function getCurrentLetter() {
        for (const line of lines) {
            for (const letter of line) {
                if (letterId === letter.id) {
                    return letter
                }
            }
        }
    }
})();
