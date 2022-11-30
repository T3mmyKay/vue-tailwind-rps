<script setup>
import {ref, onMounted, computed} from "vue";

const wins = ref(0)
const loss = ref(0)
const draws = ref(0)

const choice = ref(null)
const computerChoice = ref(null)
const verdict = ref(null)


const winPercentage = computed(() => {
    const total = wins.value + wins.value + loss.value;
    return total ? (wins.value / total) * 100 : 0;
})
const outcomes = {
    rock: {
        rock: 'draw',
        paper: 'loss',
        scissors: 'win'
    },
    paper: {
        rock: 'win',
        paper: 'draw',
        scissors: 'loss'
    },
    scissors: {
        rock: 'loss',
        paper: 'win',
        scissors: 'draw'
    }
}

const SaveGame = () => {
    localStorage.setItem('wins', wins.value);
    localStorage.setItem('draws', draws.value);
    localStorage.setItem('losses', loss.value);
};

const LoadGame = () => {
    wins.value = parseInt(localStorage.getItem('wins')) || 0;
    draws.value = parseInt(localStorage.getItem('draws')) || 0;
    loss.value = parseInt(localStorage.getItem('loss')) || 0;
}
const play = (c) => {
    choice.value = c

    const choices = ['rock', 'paper', 'scissors']
    const random = Math.floor(Math.random() * choices.length)
    computerChoice.value = choices[random];

    const outcome = outcomes[c][computerChoice.value]

    if (outcome === 'win') {
        wins.value++
        verdict.value = "You win!"
    } else if (outcome === 'loss') {
        loss.value++
        verdict.value = "You lose!"
    } else {
        draws.value++
        verdict.value = "You draw!"
    }
    SaveGame();
}

const ResetRound = () => {
    choice.value = null;
    computerChoice.value = null;
    verdict.value = null;
}

onMounted(() => {
    LoadGame();
    window.addEventListener('keypress', (ev) => {
        if (ev.key === 'r') {
            ResetRound();
        }
    })
})

</script>

<template>
    <div class="bg-gray-700 text-white mx-auto text-center h-screen max-w-screen-2xl grid grid-cols-12">
        <header class="p-6 col-span-12">
            <h1 class="text-4xl font-bold">Rock,Paper,Scissors</h1>
        </header>
        <main class="p-6 w-full col-span-12">
            <div v-if="choice === null" class="grid grid-cols-12 mx-auto text-center place-items-center">
                <button @click="play('rock')"
                        class="col-span-4 bg-white rounded-full shadow-lg xl:w-64 lg:w-48 w-40 p-12 transition-colors duration-300 m-6 hover:bg-pink-500">
                    <img src="./assets/rock.svg" alt="rock" class="w-full h-full">
                </button>
                <button @click="play('paper')"
                        class="col-span-4 bg-white rounded-full shadow-lg xl:w-64 lg:w-48 w-40 p-12 transition-colors duration-300 m-6 hover:bg-green-500">
                    <img src="./assets/paper.svg" alt="paper" class="w-full h-full">
                </button>
                <button @click="play('scissors')"
                        class="col-span-4 bg-white rounded-full shadow-lg xl:w-64 lg:w-48 w-40 p-12 transition-colors duration-300 m-6 hover:bg-yellow-500">
                    <img src="./assets/scissors.svg" alt="scissors" class="w-full h-full">
                </button>
            </div>
            <div v-else>
                <div class="text-3xl mb-4">
                    You Picked <span class="text-pink-500">{{ choice }}</span>
                </div>
                <div class="text-3xl mb-4">
                    The Computer Picked <span class="text-green-500">{{ computerChoice }}</span>
                </div>
                <div class="6xl mb-12">{{ verdict }}</div>

                <button @click="ResetRound" class="bg-pink-500 text-lg py-2 px-4">Reset</button>
            </div>

            <div class="mt-12 text-3xl mb-4">
                {{ wins }} : {{ draws }} : {{ loss }}
            </div>
            <div class="text-lg">
                Win rate: {{ Math.round(winPercentage) }}%
            </div>
        </main>
    </div>
</template>
