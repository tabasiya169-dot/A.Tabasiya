const correctAnswers = {
    q1: "let",
    q2: "b",
    q3: "b",
    q4: "b",
    q5: "a",
    q6: "a",
    q7: "a",
    q8: "a",
    q9: "4",
    q10: "a"
};

const quizForm = document.getElementById("quizForm");
const result = document.getElementById("result");

quizForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let score = 0;

    for (let question in correctAnswers) {

        const selectedAnswer = document.querySelector(
            `input[name="${question}"]:checked`
        );

        if (
            selectedAnswer &&
            selectedAnswer.value === correctAnswers[question]
        ) {
            score++;
        }
    }

    let message;

    if (score === 10) {
        message = "🏆 Perfect Score! You are an ES6 Master!";
    } else if (score >= 8) {
        message = "🔥 Excellent! Your ES6 skills are strong!";
    } else if (score >= 5) {
        message = "👍 Good job! Keep practicing ES6!";
    } else {
        message = "💪 Keep learning! Practice makes perfect!";
    }

    result.classList.remove("hidden");

    result.innerHTML = `
        <h3>🎉 Your Score: ${score} / 10</h3>
        <p class="text-slate-300 mt-2">${message}</p>
    `;

    result.scrollIntoView({
        behavior: "smooth"
    });
});