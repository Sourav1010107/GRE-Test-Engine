
//.....VARIABLES INITIALIZATION.....

let currentQuestion = 0;
const answers= questions.map(()=>[]);

//.......NEXT QUESTION..........

function nextQuestion(){
    currentQuestion++;
    currentQuestion = Math.min(questions.length-1, currentQuestion);
    renderQuestion();
}

//.......PREVIOUS QUESTION.......... 

function previousQuestion(){
    currentQuestion--;
    currentQuestion = Math.max(0, currentQuestion);
    renderQuestion();
}


//........CHOICE RENDERING.........


function renderChoices(){

    if (questions[currentQuestion].type === "sentence-equivalence") {
        renderSentenceEquivalence();
    }
    else if(questions[currentQuestion].type === "text-completion"){
        renderTextCompletion();
    }

    else{
        renderSentenceEquivalence();
    }

}


//...........SENTENCE EQUIVALENCE RENDERING..................


function renderSentenceEquivalence(){

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


//..........RENDERING TEXT-COMPLETION....................


function renderTextCompletion(){

    let container = document.querySelector('#choices');
    container.innerHTML= "";

    questions[currentQuestion].blanks.forEach((blank, index)=>{

        const table = document.createElement('table');
        const  th =  document.createElement('th');
        const hrow = document.createElement('tr');

        th.textContent = `Blank ${index +1}`;
        hrow.append(th);
        table.append(hrow);

        blank.choices.forEach((choice)=>{
            const row = document.createElement('tr');
            const td = document.createElement('td');
            const label = document.createElement('label');
            const radio = document.createElement('input');

            radio.type = "radio";
            radio.name = `Blank ${index +1}`;
            radio.value = choice;

            label.append(radio);
            label.append(' '+ choice)

            td.append(label);
            row.append(td);
            table.append(row);

            // reload answer

            if (answers[currentQuestion][index]=== choice) {
                radio.checked = true;
            }

            // make entire row clickable and save answer

            row.addEventListener("click", ()=>{
                radio.checked = true;
                answers[currentQuestion][index] = choice; // save answer
            });
            

        });

        table.classList.add("tc-table");
        container.append(table);
    });
}

    