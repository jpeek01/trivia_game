var game = {

// ***** Begin question timer

    correctAnswersCount: 0,
    incorrectAnswersCount: 0,
    unansweredCount: 0,
    correctAnswer: false,
    answerTransistor: 0,
    questionTimeOut: 10,
    questionIntervalId: 0,
    questionNumber: 0,
    answerTimeOut: 5,
    answerIntervalId: 0,
    noAnswer: 'x',


    questionStartTimer: function() {
        console.log("questionStartTimer");
        game.questionTimeOut = 10;
        game.questionIntervalId = setInterval(game.questionCountDown, 1000);
    },

    questionCountDown: function() {
        console.log("questionCountDown");
        game.questionTimeOut--;

        $('#timer').text("Question Timer: " + game.questionTimeOut);

        if (game.questionTimeOut === 0) {
            game.stopQuestionCountDown();
            game.answerStartTimer();
            game.answerTransistor = 2;
            game.showAnswer(game.noAnswer);
        }
    },

    stopQuestionCountDown: function() {
        console.log("stopQuestionCountDown");
        clearInterval(game.questionIntervalId);
    },

// ***** End question Timer / Begin answer timer

    answerStartTimer: function() {
        console.log("answerStartTimer");
        game.answerTimeOut = 5;
        game.answerIntervalId = setInterval(game.answerCountDown, 1000);
    },

    answerCountDown: function() {
        console.log("answerCountDown");
        game.answerTimeOut--;
        $('#timer').text("Answer Timer: " + game.answerTimeOut);

        if (game.answerTimeOut == 0) {
            game.stopAnswerCountDown();
            game.nextQuestion();
        }
    },

    stopAnswerCountDown: function() {
        console.log("stopAnswerCountDown");
        clearInterval(game.answerIntervalId);
    },

// ***** End answer timer

    showAnswer: function(answer) {
        console.log("showAnswer: question number: " + game.questionNumber);
        console.log("The user answered: " + answer + " and the answer is " + questions[game.questionNumber].answer);
        if (answer == questions[game.questionNumber].answer) {
            console.log("correct answer");
            game.questionNumber++;
            game.answerTransistor = 0;
            game.incrementScore(game.answerTransistor);
        } else if (answer != questions[game.questionNumber].answer) {
            console.log("incorrect answer");
            game.questionNumber++;
            game.answerTransistor = 1;
            game.incrementScore(game.answerTransistor);
        } else {
            console.log("unanswered");
            game.questionNumber++;
            game.answerTransistor = 2;
            game.incrementScore(answerTransistor);
        }
        // btn-success
        // secondary
    },

    nextQuestion: function() {     
        console.log("nextQuestion " + game.questionNumber + ' ' + questions.length);
        
            game.stopAnswerCountDown();
            game.questionStartTimer();
            if (game.questionNumber == questions.length) {
                game.gameOver();
            } else {
                game.displayQuestion();
            }
    },

    displayQuestion: function() {
        console.log("displayQuestion: number " + game.questionNumber);
        $('#question').text(questions[game.questionNumber].questionText);
        $('#a').text(questions[game.questionNumber].a);
        $('#b').text(questions[game.questionNumber].b);
        $('#c').text(questions[game.questionNumber].c);
        $('#d').text(questions[game.questionNumber].d);
    },

    incrementScore: function(correct) {
        console.log("incrementScore " + correct);
        if (correct == 0) {
            game.correctAnswersCount++;
            console.log("correctAnswersCount " + game.correctAnswersCount);
            $("#score").html("<h4>Correct answer<h4>")
        } else if (correct == 1) {
            game.incorrectAnswersCount++;
            console.log("incorrectAnswersCount " + game.incorrectAnswersCount);
            $("#score").html("<h4>Incorrect answer<h4>")
        } else if (correct == 2) {
            game.unansweredCount++;
            console.log("unansweredCount " + game.unansweredCount);
            $("#score").html("<h4>Question Unaswered<h4>")
        }
    },

    gameOver: function() {
        console.log("gameOver");
        game.stopAnswerCountDown();
        game.stopQuestionCountDown();

        $('#question').html("<h2>Game Over!<h2>");
        $('#a').hide();
        $('#b').hide();
        $('#c').hide();
        $('#d').hide();
        $("#score").html("<h4>Correct answers: " + game.correctAnswersCount + "<h4>")
        $("#score").append("<h4>Incorrect answer: " + game.incorrectAnswersCount + "<h4>")
        $("#score").append("<h4>Unanswered: " + game.unansweredCount + "<h4>")
    }
}

// array of objects with each object the question, choices, and answer
var questions = [

   {
        questionText: "What color is an apple?",
        a: "Red", b: "Purple", c: "Black", d: "Silver",
        answer: "a",
    },
    {
        questionText: "What color is a banana?",
        a: "Red", b: "Purple", c: "Black", d: "Yellow",
        answer: "d",
    },
    {
        questionText: "What color is an eggplant?",
        a: "Blue", b: "Purple", c: "Orange", d: "Green",
        answer: "b",
    },
    {
        questionText: "What color is an orange?",
        a: "Brown", b: "White", c: "Orange", d: "Teal",
        answer: "c",
    },
    {
        questionText: "What color is a lime?",
        a: "black", b: "Purple", c: "Red", d: "Green",
        answer: "d",
    },
    {
        questionText: "What color is a lemon?",
        a: "Yellow", b: "Purple", c: "Black", d: "Silver",
        answer: "a",
    }
]

$(document).ready(function() {
    // var userAnswer;
    game.questionStartTimer();
    game.displayQuestion();
    $('#stop').hide();

    $("button").on("click", function() {
        console.log("user clicked a button");
        game.stopQuestionCountDown();
        if (game.answerIntervalId >= 0) { //this is a bit of hack but necessary to prevent the timer from triggering twice
            game.stopAnswerCountDown();
        }
        game.answerStartTimer();
        game.showAnswer($(this).val())
    });
});