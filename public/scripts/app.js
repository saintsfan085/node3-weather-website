console.log('client side file has loaded');




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'LOADING...'
    messageTwo.textContent = ''
    fetch('http://127.0.0.1:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
    search.value = ''
    console.log(location)
})