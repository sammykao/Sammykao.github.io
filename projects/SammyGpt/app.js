const API_KEY = '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'
const submitButton = document.querySelector('#submit')
const outPut = document.querySelector('#output')
const inPut = document.querySelector('input')
const history = document.querySelector('.history')
const button = document.querySelector('button')


function changeInput(value) {
    const inPut = document.querySelector('input')
    inPut.value = value
}

async function getMessage() {
    console.log('Clicked');
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inPut.value}],
            max_tokens: 100
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        outPut.textContent = data.choices[0].message.content
        clearInput()
        if (data.choices[0].message.content) {
            const pElement = document.createElement('p')
            pElement.textContent = outPut.textContent
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            history.append(pElement)
        }
    }
    catch (error){
        console.error(error)

    }
}

inPut.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      getMessage()
    }
});

submitButton.addEventListener('click', getMessage)

function clearhistory() {
    history.innerHTML = "";
}
function clearInput() {
    inPut.value = ''
}

button.addEventListener('click', clearhistory)
