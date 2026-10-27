let guesses_display_guess_the_number = document.getElementById('guesses_display_guess_the_number')
let guesses_left_guess_the_number_display_guess_the_number = document.getElementById('guesses_left_display_guess_the_number')
let won_games_display_guess_the_number = document.getElementById('won_games_display_guess_the_number')
let lost_games_display_guess_the_number = document.getElementById('lost_games_display_guess_the_number')
let higher_or_lower_than_display_guess_the_number = document.getElementById('higher_or_lower_than_display_guess_the_number')
let input_guess_the_number = document.getElementById('input_display')
let submit_guess_guess_the_number = document.getElementById("submit_guess_guess_the_number")
let settings_guess_the_number = document.getElementById("settings_guess_the_number")

let settings_area_guess_the_number = document.getElementById('settings_area_guess_the_number')
let close_settings_guess_the_number = document.getElementById('close_settings_guess_the_number')
let erase_button_guess_the_number = settings_area_guess_the_number.querySelector('button:not([id])')

let guesses_taken_guess_the_number = 0
let guesses_left_guess_the_number = 25
let is_game_over_guess_the_number = false

let games_won_guess_the_number = Number(localStorage.getItem("games_won_guess_the_number")) || 0
let games_lost_guess_the_number = Number(localStorage.getItem("games_lost_guess_the_number")) || 0

won_games_display_guess_the_number.textContent = games_won_guess_the_number
lost_games_display_guess_the_number.textContent = games_lost_guess_the_number
guesses_left_guess_the_number_display_guess_the_number.textContent = guesses_left_guess_the_number

function getRandomInt_guess_the_number(min_guess_the_number, max_guess_the_number) {
    return Math.floor(Math.random() * (max_guess_the_number - min_guess_the_number + 1)) + min_guess_the_number
}

let random_number_guess_the_number = getRandomInt_guess_the_number(1, 100)

function handle_guess_guess_the_number() {
    if (is_game_over_guess_the_number) {
        return
    }

    let user_guess_the_number = parseInt(input_guess_the_number.value, 10)

    if (isNaN(user_guess_the_number) || user_guess_the_number < 1 || user_guess_the_number > 100) {
        higher_or_lower_than_display_guess_the_number.textContent = "Please enter a valid whole number between 1 and 100!"
        input_guess_the_number.value = ""
        return
    }

    const text_strings_guess_the_number = {
        "higher_than": "Lower! The secret number is smaller than " + user_guess_the_number,
        "lower_than": "Higher! The secret number is larger than " + user_guess_the_number,
        "win": "The Number Was " + random_number_guess_the_number,
        "lose": "The Number Was " + random_number_guess_the_number
    }

    guesses_taken_guess_the_number++
    guesses_left_guess_the_number--

    guesses_display_guess_the_number.textContent = guesses_taken_guess_the_number
    guesses_left_guess_the_number_display_guess_the_number.textContent = guesses_left_guess_the_number

    if (user_guess_the_number > random_number_guess_the_number) {
        higher_or_lower_than_display_guess_the_number.textContent = text_strings_guess_the_number.higher_than 
    } else if (user_guess_the_number < random_number_guess_the_number) {
        higher_or_lower_than_display_guess_the_number.textContent = text_strings_guess_the_number.lower_than 
    } else if (user_guess_the_number === random_number_guess_the_number) {
        higher_or_lower_than_display_guess_the_number.textContent = text_strings_guess_the_number.win
        games_won_guess_the_number++
        won_games_display_guess_the_number.textContent = games_won_guess_the_number
        save_game_guess_the_number()
        end_game_guess_the_number()
    }

    if (guesses_left_guess_the_number === 0 && user_guess_the_number !== random_number_guess_the_number) {
        higher_or_lower_than_display_guess_the_number.textContent = text_strings_guess_the_number.lose
        games_lost_guess_the_number++
        lost_games_display_guess_the_number.textContent = games_lost_guess_the_number
        save_game_guess_the_number()
        end_game_guess_the_number()
    }

    input_guess_the_number.value = ""
}

submit_guess_guess_the_number.addEventListener("click", handle_guess_guess_the_number)

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handle_guess_guess_the_number()
    }
})

function end_game_guess_the_number() {
    is_game_over_guess_the_number = true
    input_guess_the_number.disabled = true
    submit_guess_guess_the_number.disabled = true
    setTimeout(reset_game_board_guess_the_number, 3000)
}

function reset_game_board_guess_the_number() {
    guesses_taken_guess_the_number = 0
    guesses_left_guess_the_number = 25
    is_game_over_guess_the_number = false
    random_number_guess_the_number = getRandomInt_guess_the_number(1, 100)
    
    guesses_display_guess_the_number.textContent = guesses_taken_guess_the_number
    guesses_left_guess_the_number_display_guess_the_number.textContent = guesses_left_guess_the_number
    higher_or_lower_than_display_guess_the_number.textContent = "Enter A Guess!"
    
    input_guess_the_number.disabled = false
    submit_guess_guess_the_number.disabled = false
    input_guess_the_number.value = ""
}

function save_game_guess_the_number() {
    localStorage.setItem("games_won_guess_the_number", games_won_guess_the_number)
    localStorage.setItem("games_lost_guess_the_number", games_lost_guess_the_number)
}

function autosave_guess_the_number() {
    save_game_guess_the_number()
}

setInterval(autosave_guess_the_number, 5000)

settings_guess_the_number.addEventListener("click", function() {
    settings_area_guess_the_number.removeAttribute('hidden')
})

close_settings_guess_the_number.addEventListener("click", function() {
    settings_area_guess_the_number.setAttribute('hidden', '')
})

erase_button_guess_the_number.addEventListener("click", function() {
    let confirm_erase = confirm("Are you sure you want to erase all game data? This will reset your wins and losses.")
    if (confirm_erase) {
        games_won_guess_the_number = 0
        games_lost_guess_the_number = 0
        
        localStorage.setItem("games_won_guess_the_number", games_won_guess_the_number)
        localStorage.setItem("games_lost_guess_the_number", games_lost_guess_the_number)
        
        won_games_display_guess_the_number.textContent = games_won_guess_the_number
        lost_games_display_guess_the_number.textContent = games_lost_guess_the_number
        
        settings_area_guess_the_number.setAttribute('hidden', '')
        reset_game_board_guess_the_number()
    }
})
