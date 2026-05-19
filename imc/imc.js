const calcular = document.getElementById('calcular');

function imc() {
    const nome = document.getElementById('nome').value;
    const alt = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const result = document.getElementById('result');

    if(nome !== '' && alt !== '' && peso !== ''){

        const valorIMC = (peso / (alt * alt)).toFixed(1);

        let classificação;

        if (valorIMC < 18.5){
            classificação = 'Abaixo do peso';
        } else if (valorIMC < 25){
            classificação = 'Saudável';
        } else if (valorIMC < 30){
            Classificação = 'sobrepeso';
        } else if (valorIMC < 40){
            classificação = 'Obeso';
        } else if (valorIMC > 40){
            classificação = 'Obesidade Grave';
        }


        result.textContent = `${nome}, seu IMC é: ${valorIMC}, você está: ${classificação}`;  
    }
    else{
        result.textContent ='Preencha todos os campos';
    }
}

calcular.addEventListener('click', imc);