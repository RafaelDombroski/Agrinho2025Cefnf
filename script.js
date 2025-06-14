// Quiz Data
const quizData = [
  {
    question: "Qual é a principal contribuição do campo para a cidade?",
    options: [
      "Entretenimento",
      "Produção de alimentos",
      "Tecnologia",
      "Transporte",
    ],
    correct: 1,
    explanation:
      "O campo é responsável pela produção de alimentos que abastecem as cidades.",
  },
  {
    question: "O que a cidade oferece ao campo?",
    options: [
      "Apenas poluição",
      "Mercado consumidor e tecnologia",
      "Problemas sociais",
      "Nada importante",
    ],
    correct: 1,
    explanation:
      "A cidade oferece mercado para os produtos rurais e tecnologias que modernizam a agricultura.",
  },
  {
    question: "A Festa do Lavrador representa:",
    options: [
      "Apenas diversão",
      "Integração campo-cidade",
      "Competição entre regiões",
      "Tradição sem importância",
    ],
    correct: 1,
    explanation:
      "A festa é um exemplo de como campo e cidade se integram, valorizando a cultura rural.",
  },
];

let currentQuestionIndex = 0;
let selectedAnswer = null;
let score = 0;
let showingResult = false;

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const quizContainer = document.getElementById("quizContainer");
const quizResult = document.getElementById("quizResult");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const resultBtn = document.getElementById("resultBtn");
const resetBtn = document.getElementById("resetBtn");

function toggleMobileMenu() {
  const isVisible = mobileMenu.style.display === "block";
  mobileMenu.style.display = isVisible ? "none" : "block";
}

function closeMobileMenu() {
  mobileMenu.style.display = "none";
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function initQuiz() {
  currentQuestionIndex = 0;
  selectedAnswer = null;
  score = 0;
  showingResult = false;

  quizContainer.style.display = "block";
  quizResult.style.display = "none";

  loadQuestion();
}

function loadQuestion() {
  const question = quizData[currentQuestionIndex];

  document.getElementById("currentQuestion").textContent =
    currentQuestionIndex + 1;
  document.getElementById("totalQuestions").textContent = quizData.length;
  document.getElementById("currentScore").textContent = score;
  document.getElementById("totalScore").textContent = quizData.length;

  const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
  document.getElementById("progressFill").style.width = progressPercent + "%";

  document.getElementById("quizQuestion").textContent = question.question;

  const optionsContainer = document.getElementById("quizOptions");
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.innerHTML = `
      <span>${option}</span>
      <span class="option-icon"></span>
    `;
    button.addEventListener("click", () => selectAnswer(index));
    optionsContainer.appendChild(button);
  });

  document.getElementById("quizExplanation").style.display = "none";
  submitBtn.style.display = "inline-flex";
  nextBtn.style.display = "none";
  resultBtn.style.display = "none";
  submitBtn.disabled = true;

  selectedAnswer = null;
  showingResult = false;
}

function selectAnswer(answerIndex) {
  if (showingResult) return;

  selectedAnswer = answerIndex;

  const options = document.querySelectorAll(".quiz-option");
  options.forEach((option, index) => {
    option.classList.remove("selected");
    if (index === answerIndex) {
      option.classList.add("selected");
    }
  });

  submitBtn.disabled = false;
}

function submitAnswer() {
  if (selectedAnswer === null || showingResult) return;

  showingResult = true;
  const question = quizData[currentQuestionIndex];
  const isCorrect = selectedAnswer === question.correct;

  if (isCorrect) {
    score++;
    document.getElementById("currentScore").textContent = score;
  }

  const options = document.querySelectorAll(".quiz-option");
  options.forEach((option, index) => {
    option.disabled = true;
    if (index === question.correct) {
      option.classList.add("correct");
      option.querySelector(".option-icon").innerHTML =
        '<i class="fas fa-check-circle" style="color: #16a34a;"></i>';
    } else if (index === selectedAnswer && !isCorrect) {
      option.classList.add("incorrect");
      option.querySelector(".option-icon").innerHTML =
        '<i class="fas fa-times-circle" style="color: #dc2626;"></i>';
    }
  });

  const explanationDiv = document.getElementById("quizExplanation");
  explanationDiv.innerHTML = `<strong>Explicação:</strong> ${question.explanation}`;
  explanationDiv.style.display = "block";

  submitBtn.style.display = "none";

  if (currentQuestionIndex < quizData.length - 1) {
    nextBtn.style.display = "inline-flex";
  } else {
    resultBtn.style.display = "inline-flex";
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}

function showResult() {
  quizContainer.style.display = "none";
  quizResult.style.display = "block";

  const resultEmoji = document.getElementById("resultEmoji");
  const resultTitle = document.getElementById("resultTitle");
  const resultMessage = document.getElementById("resultMessage");

  let emoji, message;

  if (score === quizData.length) {
    emoji = "🏆";
    message = "Excelente! Você domina o tema da integração campo-cidade!";
  } else if (score >= quizData.length / 2) {
    emoji = "👏";
    message = "Muito bem! Você tem um bom conhecimento sobre o assunto.";
  } else {
    emoji = "📚";
    message = "Continue estudando! A conexão campo-cidade é fascinante.";
  }

  resultEmoji.textContent = emoji;
  resultTitle.textContent = `Sua pontuação: ${score}/${quizData.length}`;
  resultMessage.textContent = message;
}

function resetQuiz() {
  initQuiz();
}

document.addEventListener("DOMContentLoaded", () => {
  initQuiz();

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }

  if (submitBtn) submitBtn.addEventListener("click", submitAnswer);
  if (nextBtn) nextBtn.addEventListener("click", nextQuestion);
  if (resultBtn) resultBtn.addEventListener("click", showResult);
  if (resetBtn) resetBtn.addEventListener("click", resetQuiz);

  const scrollBtns = document.querySelectorAll(".scroll-btn");
  scrollBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.currentTarget.getAttribute("data-target");
      if (target) {
        scrollToSection(target);
      }
    });
  });

  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      scrollToSection(targetId);
      closeMobileMenu();
    });
  });

  document.addEventListener("click", (e) => {
    if (mobileMenu && mobileMenuBtn) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".feature-card, .atracao-card, .impacto-item, .interdependencia-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});
