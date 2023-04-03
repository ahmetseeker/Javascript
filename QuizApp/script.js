const quiz = new Quiz(sorular);
const ui = new UI();

ui.btnStart.addEventListener("click", () => {
    ui.quizBox.classList.add("active");
    startTimer(10);
    startTimerLine();
    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
});

ui.btnNext.addEventListener("click", () => {
    if(quiz.sorular.length != quiz.soruIndex +1) {
        quiz.soruIndex++;
        clearInterval(counter);
        startTimer(10);
        startTimerLine();
        ui.soruGoster(quiz.soruGetir());
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
        ui.btnNext.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        ui.quizBox.classList.remove("active");
        ui.scoreBox.classList.add("active");
        ui.skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
    }
});

ui.btnReplay.addEventListener("click", () => {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.btnStart.click();
    ui.scoreBox.classList.remove("active");
})

ui.btnQuit.addEventListener("click", () => {
    window.location.reload();
})

function optionSelected(option) {
    clearInterval(counter);
    clearInterval(counterLine);
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    if(soru.cevabıKontrolEt(cevap)) {
        quiz.dogruCevapSayisi += 1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", ui.inCorrectIcon);
    }

    for(let i=0 ; i < ui.option_list.children.length; i++) {
        ui.option_list.children[i].classList.add("disabled");
    }

    document.querySelector(".btn-next").classList.add("show");
}

let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        ui.timeSecond.textContent = time;
        time--;

        if(time < 0) {
            clearInterval(counter);
            ui.timeText.textContent = "Süre Bitti";
            let cevap = quiz.soruGetir().dogruCevap;

            for(let option of ui.option_list.children) {
                if(option.querySelector("span b").textContent == cevap) {
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", ui.correctIcon);
                }
                option.classList.add("disabled");
            }

            ui.btnNext.classList.add("show");
        }
    }
}

let counterLine;

function startTimerLine() {
    let lineWidth = 0;

    counterLine = setInterval(timer, 20);

    function timer() {
        lineWidth += 1;

        ui.timerLine.style.width = lineWidth + "px";
        if(lineWidth > 547) {
            clearInterval(counterLine);
        }
    }
}