
function nextQuestion(){
    currentQuestion++;
    currentQuestion = Math.min(questions.length-1, currentQuestion);
    renderQuestion();
}

function previousQuestion(){
    currentQuestion--;
    currentQuestion = Math.max(0, currentQuestion);
    renderQuestion();
}


//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
            // MARK FUNCTION //

let markStatus = questions.map(()=>false);

function markQuestion(){
    markStatus[currentQuestion] = !markStatus[currentQuestion];
        
    markQuestionStatus();

}

function markQuestionStatus() {

    const mark = document.querySelector('#mark');

    if(markStatus[currentQuestion]){
        mark.innerHTML = "Marked";
        mark.classList.add("mark-active");
        }
        else{
        mark.innerHTML = "Mark";
        mark.classList.remove("mark-active");
        }
}

///////////////////////////////////////////////
        // REVIEW NAVIGATION BAR //



/////////////////////////////////////////////////////
           // REVIEW WINDOW //



function reviewTable() {
    const tableBody = document.querySelector('#review-table-body');
    const modal = document.querySelector('#modal');
    const mainPrompt = document.querySelector('#main-prompt');

    const navBar = document.querySelector('#nav');
    const reviewNav = document.querySelector('#review-nav');

    const questionNum = document.querySelector('#question-number');
    questionNum.classList.add("hidden");


    tableBody.innerHTML = "";
    modal.classList.remove("hidden");
    mainPrompt.classList.add("hidden");

    navBar.classList.add("hidden");
    reviewNav.classList.remove("hidden");

    questions.forEach((question, index)=>{

    // CREATE ROW

        const row = document.createElement("tr");

    // CREATE CELLS

        const questionCell = document.createElement("td");
        const statusCell = document.createElement("td");
        const markCell = document.createElement("td");

    // PUT DATA INSIDE THE CELLS

        questionCell.textContent = index + 1;

    // ANSWER CELL LOGIC
    

        if(question.type === "sentence-equivalence"){
            if (answers[index].length >= 2) {
                statusCell.textContent = "Answered";
            }
            else{
                statusCell.textContent = "Not Answered";
            }
        }
        else{

            if(answers[index].length > 0){
                statusCell.textContent = "Answered";
            }
            else{
                statusCell.textContent = "Not Answered";
            }
        }

    // MARK CELL LOGIC

        if(markStatus[index]){
            markCell.textContent = "✓";
        }
        else{
            markCell.textContent = "";
        }

    // PUT CELLS INSIDE THE ROW

        row.append(questionCell);
        row.append(statusCell);
        row.append(markCell);

    // Make entire row clickable
        row.addEventListener("click",()=>{
            currentQuestion = index;
            renderQuestion();

            modal.classList.add("hidden");
            mainPrompt.classList.remove("hidden");

            navBar.classList.remove("hidden");
            reviewNav.classList.add("hidden");

            const questionNum = document.querySelector('#question-number');
            questionNum.classList.remove("hidden");
        });

    // PUT ROW INSIDE THE TABLE

        tableBody.append(row);
    });
}

/////////////////////////////////////////////////////
//////////////////////////////////////////////////////

function closeReview(){
    const mainPrompt = document.querySelector('#main-prompt');
    const modal = document.querySelector('#modal');
    const navBar = document.querySelector('#nav');
    const reviewNav = document.querySelector('#review-nav');

    modal.classList.add("hidden");
    mainPrompt.classList.remove("hidden");

    navBar.classList.remove("hidden");
    reviewNav.classList.add("hidden");

    const questionNum = document.querySelector('#question-number');
    questionNum.classList.remove("hidden");
}



//showing options for each question



//////////////////////////////////////////////////////
//  START OF TIME UPDATATION   //
//////////////////////////////////////////////////////

let timeRemaining = 20*60;
let timerVisible = true; 

function timerUpdate() {
    const minutes = Math.floor(timeRemaining/60);
    const seconds = timeRemaining % 60;

    document.querySelector("#timer").textContent = 
    `${String(minutes).padStart(2, "0")}:` + `${String(seconds).padStart(2, "0")}`;

    if (timeRemaining> 0 ){
        timeRemaining--;
    }
}


////////////////////////////////////////////////////////////
//  HIDE OR SHOW REMAINING TIME  //
/////////////////////////////////////////////////////////////

let timerStatus = false;

function toggleTime() {
    timerStatus = !timerStatus;
    let timer = document.querySelector("#timer");
    if(timerStatus){
        timer.classList.add("time-hide");
        document.querySelector('#hide').innerHTML ="Show";
    }
    else{
        timer.classList.remove("time-hide");
        document.querySelector('#hide').innerHTML ="Hide";
    }

}

// END OF TIME UPDATATION   //
//////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////
     //     START OF QUESTION RENDERING     //

function renderQuestion() {

    document.querySelector('#question-number').innerHTML=`Question ${currentQuestion + 1} of  ${questions.length}`;
    document.querySelector('#question').innerHTML= questions[currentQuestion].question;
    document.querySelector('#instruction').innerHTML= questions[currentQuestion].instruction;
    renderChoices();
    markQuestionStatus();




    document.querySelector('#next').onclick = nextQuestion;
    document.querySelector('#previous').onclick = previousQuestion;
    document.querySelector('#hide').onclick = toggleTime;
    document.querySelector('#mark').onclick = markQuestion;
    document.querySelector('#review').onclick = reviewTable;
    document.querySelector('#close-Review').onclick = closeReview;
    document.querySelector('#go-question').onclick = closeReview;
}


    // END OF QUESTION RENDERING //
///////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
    // BEGINING OF CONTENT LOADING //

document.addEventListener("DOMContentLoaded", ()=>{
    renderQuestion();
    timerUpdate();

    setInterval(timerUpdate, 1000);

});
        
