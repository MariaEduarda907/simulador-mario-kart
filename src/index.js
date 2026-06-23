const player1 = {
    nome: 'Mario',
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
}

const player2 = {
    nome: 'Peach',
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
    pontos: 0,
}

const player3 = {
    nome: 'Yoshi',
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
    pontos: 0,
}

const player4 = {
    nome: 'Bowser',
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0,
}

const player5 = {
    nome: 'Luigi',
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
}

const player6 = {
    nome: 'Donkey Kong',
    velocidade: 2,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0,
}

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1 //arrendonda para baixo e multiplica por 6, gerando um número aleatório entre 0 e 5
}

async function getRandomBlock(){
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = 'reta';
            break;
        case random < 0.66:
            result = 'curva';
            break;
        case random < 0.33:
            result = 'reta';
            break;
    
        default:
            result = 'confronto'
            break;
    }
    return result
}

async function logRollResult(character, block, diceResult, attribute){
    console.log(`${character} rolou o dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}🎲`)
}

async function playRaceEngine(character1, character2){
    for (let round = 1; round <= 5; round++){
        console.log(`Rodada: ${round} 🏁`);
    
        //draw a random block
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`);
    

    //roll the dice
    let diceResult1 = await rollDice()
    let diceResult2 = await rollDice()

    //skill test
    let totalSkillTest1 = 0
    let totalSkillTest2 = 0

    if(block === 'reta'){
        totalSkillTest1 = diceResult1 + character1.velocidade
        totalSkillTest2 = diceResult2 + character2.velocidade
        
        await logRollResult(character1.nome, 'velocidade', diceResult1, character1.velocidade)
        
        await logRollResult(character2.nome, 'velocidade', diceResult2, character2.velocidade)
    }
    if (block === 'curva') {
        totalSkillTest1 = diceResult1 + character1.manobrabilidade
        totalSkillTest2 = diceResult2 + character2.manobrabilidade

        await logRollResult(character1.nome, 'manobrabilidade', diceResult1, character1.manobrabilidade)
        await logRollResult(character2.nome, 'manobrabilidade', diceResult2, character2.manobrabilidade)
    }

    if (block === 'confronto') {
        let totalPower1 = diceResult1 + character1.poder
        let totalPower2 = diceResult2 + character2.poder

        console.log(`O bloco é um confronto! ${character1.nome} e ${character2.nome} vão se enfrentar!⚔️`)
        
        await logRollResult(character1.nome, 'poder', diceResult1, character1.poder)
        await logRollResult(character2.nome, 'poder', diceResult2, character2.poder)

        if(totalPower1 > totalPower2 && character2.pontos > 0){
            character2.pontos--
            console.log(`${character1.nome} venceu o confronto e ${character2.nome} perdeu um ponto!`)
        }
        if(totalPower2 > totalPower1 && character1.pontos > 0){
            character1.pontos--
            console.log(`${character2.nome} venceu o confronto e ${character1.nome} perdeu um ponto!`)
        }
        console.log(totalPower2 === totalPower1 ? 'Empate no confronto! Ninguém perde pontos!🤝' : '')
    }

    //determine the winner of the round
    if (totalSkillTest1 > totalSkillTest2) {
        console.log(`${character1.nome} venceu a rodada e marcou um ponto!🏆`)
        character1.pontos++
    }else if (totalSkillTest2 > totalSkillTest1) {
        console.log(`${character2.nome} venceu a rodada e marcou um ponto!🏆`)
        character2.pontos++
    }

    console.log('-------------------------------')
}
}

async function declareWinner(character1, character2){
    console.log(`Resultado final: ${character1.nome} - ${character1.pontos} x ${character2.pontos} - ${character2.nome}`)
    
    if (character1.pontos > character2.pontos)
        console.log(`\n${character1.nome} venceu a corrida!🏆`)
    else if (character2.pontos > character1.pontos)
        console.log(`\n${character2.nome} venceu a corrida!🏆`)
    else 
        console.log(`\nA corrida terminou empatada!🤝`)
}

(async function main(){
    console.log(`Corrida entre os jogadores ${player1.nome} e ${player2.nome} está prestes a começar!🏎🏁\n`);

    await playRaceEngine(player1, player2)
    await declareWinner(player1, player2)
})() //função auto-invocada, que é executada assim que é definida.

