; (function () {
    const text = `Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.
    По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.`

    const inputElement = document.querySelector('#input')
    const textExampleElement = document.querySelector('#textExample')

    const lines = getLines(text)

    let letterId = 1 // актуальный символ

    update()

    inputElement.addEventListener('keydown', function (event) {
        const currentLetter = getCurrentLetter()

        if (event.key === currentLetter.label) {
            letterId = letterId + 1
            update()
        }
    })

    // Принимает длинную строку, возвращает массив строк со служебной информацией
    function getLines(text) {
        const lines = [];

        let line = []
        let idCounter = 0
        for (const letter of text) {

            idCounter = idCounter + 1

            line.push({
                id: idCounter,
                label: letter,
                success: true
            })

            if (line.length >= 70 || letter === '\n') {
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
