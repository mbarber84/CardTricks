// DOM event listener
document.addEventListener("DOMContentLoaded", eventListeners);
// event listeners
function eventListeners() {
  const showBtn = document.getElementById("show-btn");
  const questionCard = document.querySelector(".question-card");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("question-form");
  const feedback = document.querySelector(".feedback");
  const questionInput = document.getElementById("question-input");
  const answerInput = document.getElementById("answer-input");
  const questionList = document.getElementById("questions-list");
  let data = [];
  let id = 1;
  // new UI instance
  const ui = new UI();
  // show question card
  showBtn.addEventListener("click", function () {
    ui.showQuestion(questionCard);
  });
  // hide question card
  closeBtn.addEventListener("click", function () {
    ui.hideQuestion(questionCard);
  });
  // add question
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const questionValue = questionInput.value;
    const answerValue = answerInput.value;
    //
    if (questionValue === "" || answerValue === "") {
      feedback.classList.add("showItem", "alert-danger");
      setTimeout(function () {
        feedback.classList.remove("showItem", "alert-danger");
      }, 2000);
    } else {
      const question = new Question(id, questionValue, answerValue);
      data.push(question);
      id++;
      ui.clearFields(questionInput, answerInput);
      ui.addQuestion(questionList, question);
    }
  });
  // work with questions
  questionList.addEventListener("click", function (e) {
    e.preventDefault();
    const clicked = e.target.id;
    if (clicked === "delete-flashcard") {
      console.log(data);
      let id = e.target.dataset.id;
      e.target.parentElement.parentElement.parentElement.remove();
      let tempData = data.filter(function (item) {
        return item.id !== parseInt(id);
      });
      data = tempData;
    }
    if (clicked === "edit-flashcard") {
      let id = e.target.dataset.id;
      // remove from DOM
      e.target.parentElement.parentElement.parentElement.remove();
      // show question card
      ui.showQuestion(questionCard);
      // question that has the id
      const tempQuestion = data.filter(function (item) {
        return item.id === parseInt(id);
      });
      // rest of the data array
      let tempData = data.filter(function (item) {
        return item.id !== parseInt(id);
      });
      data = tempData;
      // console.dir(tempQuestion);
      questionInput.value = tempQuestion[0].question;
      answerInput.value = tempQuestion[0].answer;
    }
    if (clicked === "show-answer") {
      e.target.nextElementSibling.classList.toggle("showItem");
    }
  });
}
// UI constructor function
function UI() {}
// UI prototypes
// show question card
UI.prototype.showQuestion = function (el) {
  el.classList.add("showItem");
};
// hide question card
UI.prototype.hideQuestion = function (el) {
  el.classList.remove("showItem");
};
// clear fields
UI.prototype.clearFields = function (question, answer) {
  question.value = "";
  answer.value = "";
};
// add question to DOM
UI.prototype.addQuestion = function (el, question) {
  const divEl = document.createElement("div");
  divEl.classList.add("col-md-4");
  divEl.innerHTML = `
  <div class="card card-body flashcard my-3">
    <h4 class="text-capitalize text-dark"> ${question.question} </h4>
    <a href="#" id="show-answer" class="text-capitalize my-3 show-answer"
      >show/hide answer</a
    >
    <h5 class="answer text-dark mb-3"> ${question.answer} </h5>
    <div class="flashcard-btn d-flex justify-content-between">
      <a
        href="#"
        id="edit-flashcard"
        class="btn my-1 edit-flashcard text-uppercase"
        data-id="${question.id}"
        >edit</a
      >
      <a
        href="#"
        id="delete-flashcard"
        data-id="${question.id}"
        class="btn my-1 delete-flashcard text-uppercase"
        >delete</a
      >
    </div>
  </div>        
  `;
  el.appendChild(divEl);
};

// question constructor function
function Question(id, question, answer) {
  this.id = id;
  this.question = question;
  this.answer = answer;
}
