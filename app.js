let quarter = 1;
let gameLog = [];
let firstTeamScore = 0;
let secondTeamScore = 0;
let fouls = [
    [0, 0, 0],
    [0, 0, 0]
];

// function atnaujintiTaskus() {
//     document.getElementById('taskai-komanda1').innerText = `Taškai: ${komanda1Taskai}`;
//     document.getElementById('taskai-komanda2').innerText = `Taškai: ${komanda2Taskai}`;
// }

// document.querySelectorAll('.komanda1-taskai').forEach((button, index) => {
//     button.addEventListener('click', () => {
//         let taskai = index + 1;
//         komanda1Taskai += taskai;
//         atnaujintiTaskus(); // Atlikite atnaujinimą
//         alert(`Pridėti ${taskai} taškai! Bendras taškų skaičius: ${komanda1Taskai}`);
//     });
// });

// document.querySelectorAll('.komanda2-taskai').forEach((button, index) => {
//     button.addEventListener('click', () => {
//         let taskai = index + 1;
//         komanda2Taskai += taskai;
//         atnaujintiTaskus(); // Atlikite atnaujinimą
//         alert(`Pridėti ${taskai} taškai! Bendras taškų skaičius: ${komanda2Taskai}`);
//     });
// });

function addPoints(points, team) {
    const time = new Date().toLocaleTimeString();
    team ===1 ? firstTeamScore += points : secondTeamScore += points;
    const entry = `Komanda ${team} pelnė ${points} taškus (${time}) viso taškų ${team === 1 ? firstTeamScore : secondTeamScore}`;
    gameLog.push(entry);
    updateLog();
}

function updateLog() {
    const log = document.getElementById('log');
    log.innerHTML = gameLog.join('<br>');
}

function addFoul(player, team) {
    fouls[team - 1][player - 1]++;
    const time = new Date().toLocaleDateString();
    const entry = `Komandos ${team} žaidėjas ${player} gavo pražangą (${time})`;
    gameLog.push(entry);
    updateLog();
    updateFoulDisplay(player, team);
}

function updateFoulDisplay(player, team) {
    const foulElement = document.getElementById(`fouls-team${team}-player${player}`);
    foulElement.textContent = `Pražangos: ${fouls[team -1][player - 1]}`;
}

function endQuarter() {
    if (quarter < 4) {
        gameLog.push(`Kėlinys ${quarter} baigtas.`);
        quarter++;
        document.getElementById('end-quarter').textContent = quarter === 4 ? 'Baigti varžybas' : 'Baigti kėlinį';
        updateLog();
    } else {
        gameLog.push(`Varžybos baigtos.`);
        updateLog();
        alert('Varžybos baigtos');
        document.getElementById('end-quarter').classList.add('display-none');
    }
}

function reset() {
    quarter = 1;
    gameLog = [];
    firstTeamScore = 0;
    secondTeamScore = 0;
    fouls = [
        [0, 0, 0],
        [0, 0, 0]
];
document.getElementById('log').innerHTML = '';
const spans = document.getElementsByTagName('span');
for (let i = 0; i < spans.length; i++) {
    spans[i].innerHTML = 'Pražangos: 0';
}
document.getElementById('end-quarter').classList.remove('display-none');
}

document.querySelectorAll('.add-points').forEach(button => {
    button.addEventListener('click', () => {
        const points = parseInt(button.dataset.points, 10);
        const team = parseInt(button.dataset.team, 10);
        addPoints(points, team);
    });
});

document.querySelectorAll('.add-foul').forEach(button => {
    button.addEventListener('click', () => {
        const player = parseInt(button.dataset.player, 10);
        const team = parseInt(button.dataset.team, 10);
        addFoul(player, team);
    });
});

document.getElementById('end-quarter').addEventListener('click', endQuarter);
document.getElementById('restart'). addEventListener('click', reset);