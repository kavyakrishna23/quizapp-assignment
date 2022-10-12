
let questions = [];
let userAnswers = [-1, -1, -1, -1, -1];

function onInputClickHandler(e) {
  const inputArr = e.target.id.split("_");

  const questionId = inputArr[0];
  const optionIndex = inputArr[1];

  const questionIndex = questionId - 1;

  userAnswers[questionIndex] = optionIndex;
}

function renderQuestions(questions) {
  const form = document.getElementById("quizForm");

  for (let counter = 0; counter < questions.length; counter++) {
    const currentQuestion = questions[counter];
    const wrapperDiv = document.createElement(`div`);

    const question = document.createElement("h3");
    question.innerText = "Q" + (counter + 1) + "." + currentQuestion.question;
    const lastLine = document.createElement("hr");

    wrapperDiv.append(question);

    for (let i = 0; i < currentQuestion.options.length; i++) {
      const currentOption = currentQuestion.options[i];


      const options = document.createElement("input");
      options.name = `q_${counter + 1}`;
      options.id = currentQuestion.id + "_" + i;
      options.type = "radio";
      options.value = currentOption;
      options.required = true;
      options.addEventListener("click", onInputClickHandler);

      const label = document.createElement("label");
      const nextLine = document.createElement("br");
      label.htmlFor = currentQuestion.id + "_" + i;
      label.innerText = currentOption;

      wrapperDiv.append(options, label, nextLine,);
    }

    form.append(wrapperDiv, lastLine);
  }

  const submitBtn = document.createElement("button");
  submitBtn.innerText = "submit";
  submitBtn.type = "input";
  submitBtn.value = "Submit";

  form.append(submitBtn);
}

function onDocumentReadyHandler() {
  function onAjaxSuccessHander(data) {
    console.log(data);
    questions = data;
    renderQuestions(data);
  }

  function onAjaxErrorHandler(e) {
    console.log(e);
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    let score = 0;

    for (let counter = 0; counter < userAnswers.length; counter++) {
      const currentUserAnswer = userAnswers[counter];
      console.log(currentUserAnswer, questions[counter].answer);
      if (currentUserAnswer == questions[counter].answer - 1) {
        score++;
      }
    }

    const scoreSpan = document.getElementById("score");
    scoreSpan.innerText = score;
  }

  $.ajax({
    method: "GET",
    url: "https://5d76bf96515d1a0014085cf9.mockapi.io/quiz",
    success: onAjaxSuccessHander,
    error: onAjaxErrorHandler,
  });
  const form = document.getElementById("quizForm");
  form.addEventListener("submit", onFormSubmitHandler);
}

$(document).ready(onDocumentReadyHandler); 