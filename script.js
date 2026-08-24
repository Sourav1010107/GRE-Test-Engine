        let currentQuestion = 0;
        

        function nextQuestion(){
            currentQuestion++;
            currentQuestion = Math.min(1, currentQuestion);
            renderQuestion();
        }

        function previousQuestion(){
            currentQuestion--;
            currentQuestion = Math.max(0, currentQuestion);
            renderQuestion();
        }

///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
            // QUESTION OBJECT //

        questions=[
            {
                type: "SE",
                question: "What is your name?",
                instruction: "Select only one answer.",
                choices:[
                    "Amin", "Sabbir","Abir"
                ]
            },
            {
                type: "multiple",
                question: "What is your age?",
                instruction: "Select all that apply.",
                choices:[
                    "24", "23","32"
                ]
            }
        ];

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
                 // REVIEW WINDOW //


        function reviewTable() {
            const tableBody = document.querySelector('#review-table-body');
            const modal = document.querySelector('#modal');
            const mainPrompt = document.querySelector('#main-prompt');

            tableBody.innerHTML = "";
            modal.classList.remove("hidden");
            mainPrompt.classList.add("hidden");

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
            

                if(question.type === "SE"){
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
            modal.classList.add("hidden");
            mainPrompt.classList.remove("hidden");
        }


////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

        const answers= questions.map(()=>[]);

        //showing options for each question

        function renderChoices(){

            let container = document.querySelector('#choices');
            container.innerHTML= "";

            questions[currentQuestion].choices.forEach((choice)=>{
                const checkbox = document.createElement('input');
                const label = document.createElement('label');
                const linebreak = document.createElement('br');

                checkbox.type= "checkbox";
                checkbox.value= choice;

            // creating the checkbox element prop.

                label.append(checkbox);
                label.append(' '+ choice);

            // loading the saved answers in the question paper

                checkbox.checked = answers[currentQuestion].includes(choice);

            // save the choice in the answer array

                checkbox.addEventListener("change", ()=>{

                    if(answers[currentQuestion].length >= 2){
                        checkbox.checked = false;
                    }
                    if (checkbox.checked) {
                        if (!answers[currentQuestion].includes(choice)) {
                            answers[currentQuestion].push(choice);
                        }
                    }
                    else{
                        answers[currentQuestion] = answers[currentQuestion].filter(
                            savedChoice => savedChoice != choice
                        );
                    }
                      
                });
         

            // add choices in the HTML element

                container.append(label);
                container.append(linebreak);

            });
        }

/////////////////////////////////////////////////////////////////////////////////
        //  START OF TIME UPDATATION   //
/////////////////////////////////////////////////////////////////////////////////

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
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
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
        
