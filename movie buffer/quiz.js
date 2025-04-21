document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const resultText = document.getElementById('result-text');
    const nextButton = document.querySelector('.next-btn');
    const nextQuizButton = document.querySelector('.next-quiz-btn');

    // quizz display
    setTimeout(function() {
        const quizz = document.querySelector('.container');
        quizz.style.opacity=('1'); // Add the class to make them visible
    }, 5000);
    

    // Quiz Data for Each Movie
    const quizData = {
        'Avengers': [
            { question: "Who is the leader of the Avengers?", options: ["Iron Man", "Thor", "Captain America", "Hulk"], answer: "Captain America" },
            { question: "Who lifted Thor's hammer?", options: ["Hawkeye", "Hulk", "Vision", "Spider-Man"], answer: "Vision" }
        ],
        'The Dark Knight': [
            { question: "Who played the Joker?", options: ["Heath Ledger", "Christian Bale", "Tom Hardy", "Aaron Eckhart"], answer: "Heath Ledger" },
            
        ],
        'Dune': [
            { question: "What is the name of the desert planet?", options: ["Arrakis", "Caladan", "Giedi Prime", "Kaitain"], answer: "Arrakis" },
           
        ],
        'Spiderman': [
            { question: "In which comic did Spider-Man make his first appearance?", options: ["Peter", "leo", "punisher", "Amazing Fantasy"], answer: "Amazing Fantasy" },
        ],
        'Avatar': [
            { question: "Waterbenders rise from the moon...fire benders rise from the...", options: ["Pluto", "mars", "moon", "Sun"], answer: "Sun" },
            
        ],
        'John Wick':[
            { question: "Who is the actor who plays John Wick?", options: ["Paul Atreides", "Keanu Reeves", "Baron Harkonnen", "Gurney Halleck"], answer: "Keanu Reeves" }
        ]
        // More quiz questions can be added here
    };

    let currentMovie = '';
    let currentQuestionIndex = 0;

    // Load Quiz for Selected Movie
    function loadQuiz(movieName) {
        currentMovie = movieName;
        currentQuestionIndex = 0;
        displayQuestion();
        nextQuizButton.style.display = 'none'; // Hide Next Quiz button when starting new quiz
    }

    // Display the Current Question
    function displayQuestion() {
        const questionData = quizData[currentMovie][currentQuestionIndex];
        questionText.textContent = questionData.question;
        optionsContainer.innerHTML = '';

        questionData.options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.textContent = option;
            button.onclick = () => checkAnswer(option, button);
            optionsContainer.appendChild(button);
        });
        resultText.textContent = ""; // Clear result text when displaying a new question
        nextButton.style.display = 'none'; // Hide the "Next Question" button initially
        nextQuizButton.style.display = 'none'; // Hide Next Quiz button initially
    }

    // Check if the Answer is Correct
    function checkAnswer(selectedOption, button) {
        const correctAnswer = quizData[currentMovie][currentQuestionIndex].answer;
        if (selectedOption === correctAnswer) {
            resultText.textContent = "Correct! Well done.";
            button.style.backgroundColor = "green";
        } else {
            resultText.textContent = `Wrong! Correct answer: ${correctAnswer}`;
            button.style.backgroundColor = "red";
        }

        // Show Next Question button after answering
        nextButton.style.display = 'block';

        // Check if current question is the last one
        if (currentQuestionIndex === quizData[currentMovie].length - 1) {
            nextButton.style.display = 'none'; // Hide Next Question button if last question answered
            nextQuizButton.style.display = 'block'; // Show Next Quiz button
        }
    }

    // Go to the Next Question
    window.nextQuestion = function () {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData[currentMovie].length) {
            displayQuestion(); // Display the next question
        } else {
            resultText.textContent = "Quiz completed! Well done!";
            nextButton.style.display = 'none'; // Hide the next button after finishing the quiz
        }
    }

    // Go to the Next Quiz for the Same Movie
    window.nextQuiz = function () {
        currentQuestionIndex = 0; // Reset question index for a new quiz
        displayQuestion(); // Load the first question of the new quiz
    }

    // Add Event Listeners to Movie Cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const movieName = card.querySelector('h4').textContent.trim();
            loadQuiz(movieName);
            header.style.backgroundImage = `url(${card.querySelector('.poster').src})`;
        });
    });
});