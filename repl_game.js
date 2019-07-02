const readlineSync = require('readline-sync')
let questionDataBase = require('./question_database.json')      // importing question database from json file
let heroHealth = 5
let villainHealth = 3
let currentQuestion         // declaring the current question
let option                  // declaring the user option
let currentRound
const villain = ["Evil Izzy 🦹🏻‍♂️", "Evil Don 🧟‍♂️", "Evil Bria 🧟‍♀️", "Evil Andy 🧛🏻‍♂️"]
const userAttacks = ["throat punch 👊🏽", "round house 🦶🏽", "hadouken 🐉", "uppercut ✊🏽", "pile driver 💪🏽", "people's elbow 💪🏽", "stone cold stunner 💥", "foot stomp 🦶🏽", "spinning bird kick 🤸🏽‍♀️", "sonic boom ⚡️", "dragon punch 🐲🤜🏽"]
let currentVillain
let displayHealth = (num) => "❤️  ".repeat(num)  // print hearts to display health
let questionQuery = () =>  currentQuestion = questionDataBase.questions[currentRound-1][Math.floor(Math.random() * questionDataBase.questions[currentRound-1].length)] 
let questionFormat = (currentQuestion) => {
    return `${currentQuestion[0]}\n----------------------------------------------------------------------------------------\n(1) ${currentQuestion[1]}\n(2) ${currentQuestion[2]}\n(3) ${currentQuestion[3]}\n(4) ${currentQuestion[4]}\nAnswer: `
}
let userGuess = (option, currentQuestion) => {
    if (currentQuestion[option] === currentQuestion[5]) {
        // calls random attack to the current villain
        console.log(`\n${userName} dodged ${currentVillain}'s attack and landed a sweet ${userAttacks[Math.floor(Math.random() * userAttacks.length)]}!`)
        villainHealth--
        // removes the current question from the database
        questionDataBase.questions[currentRound-1].splice(questionDataBase.questions[currentRound-1].indexOf(currentQuestion), 1) 
        // prints hero and villain health status
        console.log(`\n${currentVillain}'s health: ${displayHealth(villainHealth)}\n${userName}'s health: ${displayHealth(heroHealth)}`)
        return true
    } else {
        heroHealth--
        // if user health reaches 0, game over. If not keep playing.
        if (heroHealth === 0) {
            console.log(`\n${currentVillain} defeated you!`)
            console.log("\t   ________                         ________                     \n"+
                        "\t  /  _____/_____    _____   ____    \\_____  \\___  __ ___________ \n"+
                        "\t /   \\  ___\\__  \\  /     \\_/ __ \\    /   |   \\  \\/ // __ \\_  __ \\\n"+
                        "\t \\    \\_\\  \\/ __ \\|  Y Y  \\  ___/   /    |    \\   /\\  ___/|  | \\/\n"+
                        "\t  \\______  (____  /__|_|  /\\___  >  \_______  /\\_/  \\___  >__|   \n"+
                        "\t         \\/     \\/      \\/     \\/          \\/          \\/       ")
            process.exit()
        } else {
            console.log(`\nOh no! ${currentVillain} attacked ${userName} successfully. Try again.`)
             // prints hero and villain health status
            console.log(`\n${currentVillain}'s health: ${displayHealth(villainHealth)}\n${userName}'s health: ${displayHealth(heroHealth)}`)
            return false
        }
    }
}    
function roundCycle() {
    if (heroHealth > 0) {
        // while villain has health keep playing
        while (villainHealth > 0) {
            console.log(`\n${currentVillain}`)
            questionQuery()
            option = Number(readlineSync.question(questionFormat(currentQuestion)));
            // if user guess is wrong guess again
            while (!userGuess(option, currentQuestion)) {
                option = Number(readlineSync.question(questionFormat(currentQuestion)));   
            }
        } 
    } 
}

const userName = readlineSync.question(`Ahhhh, hello brave soul! What's your name? `)
console.log(`\nWelcome ${userName} to.........\n`)
console.log("  ___________.___  ________  ___ ______________  _________  ________  ________  ___________ \n"+
            "  \\_   _____/|   |/  _____/ /   |   \\__    ___/  \\_   ___ \\ \\_____  \\ \\______ \\ \\_   _____/\n"+
            "   |    __)  |   /   \\  ___/    ~    \\|    |     /    \\  \\/  /   |   \\ |    |  \\ |    __)_ \n"+
            "   |     \\   |   \\    \\_\\  \\    Y    /|    |     \\     \\____/    |    \\|    `   \\|        \\\n"+
            "   \\___  /   |___|\\______  /\\___|_  / |____|      \\______  /\\_______  /_______  /_______  /\n"+
            "       \\/                \\/       \\/                     \\/         \\/        \\/        \\/ ")



console.log( "------------------------------------------------------------------------------------------------" );
console.log("Synopsis: \tWyncode has been taken over by an evil virus!")
console.log("\t\tFight your way through three rounds of infected coders to reach freedom.")
console.log("\nRules: \t\tPick the correct answer to to defend yourself. \n\t\tYou have 5 lives, make them count!")
console.log( "------------------------------------------------------------------------------------------------\n" );
currentRound = 1
currentVillain = villain[0]



console.log( "\t\t__________                         .___  ____\n"+ 
              "\t\t\\______   \\ ____  __ __  ____    __| _/ /_   |\n"+
               "\t\t |       _//  _ \\|  |  \\/    \\  / __ |   |   |\n"+
               "\t\t |    |   (  <_> )  |  /   |  \\/ /_/ |   |   |\n"+
               "\t\t |____|_  /\\____/|____/|___|  /\\____ |   |___|\n"+
                "\t\t        \\/                  \\/      \\/        ");
console.log( "----------------------------------------------------------------------------------------" );
roundCycle()
console.log(`\n${userName} defeated ${currentVillain}! Congrats, but a new enemy awaits.....`)
villain.shift()         // removes the defeated villain from list
currentVillain = villain[0]
villainHealth = 3       // assigns new villain full health

currentRound++
console.log("\t\t __________                         .___ ________  \n"+
            "\t\t \\______   \\ ____  __ __  ____    __| _/ \\_____  \\ \n"+
            "\t\t  |       _//  _ \\|  |  \\/    \\  / __ |   /  ____/ \n"+
            "\t\t  |    |   (  <_> )  |  /   |  \\/ /_/ |  /       \\ \n"+
            "\t\t  |____|_  /\\____/|____/|___|  /\\____ |  \\_______ \\ \n"+
            "\t\t         \\/                  \\/      \\/          \\/  ")
console.log( "----------------------------------------------------------------------------------------" );
roundCycle()
console.log(`\n${userName} survived ${currentVillain}! Good job, but a more challenging opponent awaits.....`)
villain.shift()         // removes the defeated villain from list
currentVillain = villain[0]
villainHealth = 3       // assigns new villain full health

currentRound++
console.log("\t\t __________                         .___ ________  \n"+
            "\t\t \\______   \\ ____  __ __  ____    __| _/ \\_____  \\ \n"+
            "\t\t  |       _//  _ \\|  |  \\/    \\  / __ |    _(__  < \n"+
            "\t\t  |    |   (  <_> )  |  /   |  \\/ /_/ |   /       \\ \n"+
            "\t\t  |____|_  /\\____/|____/|___|  /\\____ |  /______  / \n"+
            "\t\t         \\/                  \\/      \\/         \\/ ")
console.log( "----------------------------------------------------------------------------------------" );
roundCycle()
console.log(`\n${userName} swept the floor with ${currentVillain}! Looks like the coast is clear......`)
villain.shift()         // removes the defeated villain from list
currentVillain = villain[0]
villainHealth = 3       // assigns new villain full health

// CREATE FINAL ROUND
console.log(`As ${userName} almost reaches the exit ${currentVillain} appears out of the deep dark web and attacks!`)
console.log("\t___________.__              .__    __________                         .___ ._.\n"+
            "\t\\_   _____/|__| ____ _____  |  |   \\______   \\ ____  __ __  ____    __| _/ | |\n"+
            "\t |    __)  |  |/    \\\\__  \\ |  |    |       _//  _ \\|  |  \\/    \\  / __ |  | |\n"+
            "\t |     \\   |  |   |  \\/ __ \\|  |__  |    |   (  <_> )  |  /   |  \\/ /_/ |   \\|\n"+
            "\t \\___  /   |__|___|  (____  /____/  |____|_  /\\____/|____/|___|  /\\____ |   __\n"+
            "\t     \\/            \\/     \\/               \\/                  \\/      \\/   \\/")
console.log( "----------------------------------------------------------------------------------------" );
currentRound++
// console.log(currentQuestion)
roundCycle()
console.log(`Congrats ${userName}! You defeated all the infected coders, saved Wyncode, & the world! `)
console.log("\t ___________.__              ___________           .___ \n"+
            "\t \\__    ___/|  |__   ____    \\_   _____/ ____    __| _/ \n"+
            "\t   |    |   |  |  \\_/ __ \\    |    __)_ /    \\  / __ |  \n"+
            "\t   |    |   |   Y  \\  ___/    |        \\   |  \\/ /_/ |  \n"+
            "\t   |____|   |___|  /\\___  >  /_______  /___|  /\\____ |  \n"+
            "\t                 \\/     \\/           \\/     \\/      \\/")
