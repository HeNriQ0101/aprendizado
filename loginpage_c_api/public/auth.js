const form = document.querySelector('#formcadastro')
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const nome = document.getElementById('usuario').value
    const pass = document.getElementById('password').value

    fetch('/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, pass })
    })

        .then(res => res.json())
        .then(data => {
            console.log(data.mensagem)
        })

})
