const form = document.querySelector('#formcadastro')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const nome = document.getElementById('usuario').value
    const pass = document.getElementById('password').value

    alert(`Cadastrado ${nome}`)
})