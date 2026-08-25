
const answers= questions.map(()=>[]);


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

// SENTENCE EQUIVALENCE RENDERING

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


