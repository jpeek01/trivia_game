var game = {

// ***** Begin question timer

    questionTimeOut: 0,
    questionIntervalId: 0,
    questionNumber: 0,

    questionStartTimer: function() {
        game.questionTimeOut = 10;
        game.questionIntervalId = setInterval(game.questionCountDown, 1000);
    },

    questionCountDown: function() {
        game.questionTimeOut--;

        $('#timer').text(game.questionTimeOut);

        if (game.questionTimeOut === 0) {
            game.stopQuestionCountDown();
            game.showAnswer();
        }
    },

    stopQuestionCountDown: function() {
        clearInterval(game.questionIntervalId);
    },

// ***** Begin answer timer

    answerTimeOut: 0,
    answerIntervalId: 0,

    answerStartTimer: function() {
        game.answerTimeOut = 5;
        game.answerIntervalId = setInterval(game.answerCountDown, 1000);
    },

    answerCountDown: function() {
        game.answerTimeOut--;
        $('#timer').text(game.answerTimeOut);

        if (game.answerTimeOut === 0) {
            game.stopAnswerCountDown();
            game.nextQuestion();
        }
    },

    stopAnswerCountDown: function() {
        clearInterval(game.answerIntervalId);
    },

    showAnswer: function() {
        game.answerStartTimer();
    },

    nextQuestion: function() {
        game.questionStartTimer();
        console.log(game.questionNumber);
        game.questionNumber++;
        if (game.questionNumber >= questions.length-1) {
            game.stopAnswerCountDown();
        }
        game.displayQuestion();
    },

    displayQuestion: function() {
        $('#question').text(questions[game.questionNumber].questionText);
        $('#a').text(questions[game.questionNumber].a);
        $('#b').text(questions[game.questionNumber].b);
        $('#c').text(questions[game.questionNumber].c);
        $('#d').text(questions[game.questionNumber].d);
    }
}

// array of objects with each object the question, choices, and answer
var questions = [

   {
        questionText: "What color is an apple?",
        a: "Red", b: "Purple", c: "Black", d: "Silver",
        answer: this.a,
    },

    {
        questionText: "What color is a banana?",
        a: "Red", b: "Purple", c: "Black", d: "Yellow",
        answer: this.d,
    }
]

$(document).ready(function() {

    game.questionStartTimer();
    game.displayQuestion();

});