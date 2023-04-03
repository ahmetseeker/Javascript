function UI() {
    this.btnStart = document.querySelector(".btn-start");
    this.btnNext = document.querySelector(".btn-next");
    this.quizBox = document.querySelector(".quiz-box");
    this.btnReplay = document.querySelector(".btn-replay");
    this.btnQuit = document.querySelector(".btn-quit");
    this.scoreBox = document.querySelector(".score-box");
    this.questionText = document.querySelector(".question-text");
    this.option_list = document.querySelector(".option-list");
    this.correctIcon = `<div class="icon"><i class="fas fa-check"></i></div>`;
    this.inCorrectIcon = `<div class="icon"><i class="fas fa-times"></i></div>`;
    this.timeText = document.querySelector(".timer-text");
    this.timeSecond = document.querySelector(".timer-second");
    this.timerLine = document.querySelector(".time-line"); 
}

UI.prototype.soruGoster = function(soru) {
    let question = `<span>${soru.soruMetni}</span>`;
    let options = ``;

    for(let cevap in soru.cevapSecenekleri) {
        options += `
            <div class="option">
                <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
            </div>
        `;
    }

    ui.questionText.innerHTML = question;
    ui.option_list.innerHTML = options;

    const option = document.querySelectorAll(".option");

    for(let opt of option) {
        opt.setAttribute("onClick", "optionSelected(this)");
    }
}

UI.prototype.soruSayisiniGoster = function(soruSirasi, toplamSoru) {
    let tag= `<span class="badge bg-warning">${soruSirasi} / ${toplamSoru}</span>`;
    document.querySelector(".quiz-box .question-index").innerHTML = tag;
}

UI.prototype.skoruGoster = function(toplamSoru, dogruCevapSayisi) {
    let tag = `${toplamSoru} sorudan ${dogruCevapSayisi} tane dogru cevap verdiniz!`;
    document.querySelector(".score-box .score-text").innerHTML = tag;
}