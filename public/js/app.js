const searchForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#output1')
const message2 = document.querySelector('#output2')


searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message1.textContent="Fetching Weather Details..."
    message2.textContent=''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent=data.error
                message2.textContent=''
            } else {
                message1.textContent=data.location
                message2.textContent=data.forecast
            }
        })
    })
})