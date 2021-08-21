const DATA = [
    {
        question:'Какое устройство у вас?',
        answers:[
            {
                id:'1',
                value:'Ноутбук',
                correct:true,
            },
            {
                id:'2',
                value:'ПК',
                correct:false,
            },
            {
                id:'3',
                value:'Моноблок',
                correct:false,
            },
        
        ]
    },
    {
        question:'Какого вида поломка?',
        answers:[
            {
                id:'4',
                value:'Техническая',
                correct:true,
            },
            {
                id:'5',
                value:'Программная',
                correct:false,
            },
          
        
        ]
    },

    
    {
        question:'Что именно не так?',
        answers:[
            {
                id:'6',
                value:'Тормозит',
                correct:true,
            },
            {
                id:'7',
                value:'Вирусы',
                correct:false,
            },
            {
                id:'8',
                value:'Вирусы Перезагружается',
                correct:false,
            },
            {
                id:'9',
                value:'Другое',
                correct:false,
            },
          
        
        ]
    },

    
    {
        question:'Сколько лет вашему устройству?',
        answers:[
            {
                id:'10',
                value:'Менее 1 года',
                correct:true,
            },
            {
                id:'11',
                value:'от 1 - до 3 лет',
                correct:false,
            },
            {
                id:'12',
                value:'от 3 - до 5 лет',
                correct:false,
            },
            {
                id:'13',
                value:'Более 5 лет',
                correct:false,
            },
          
        
        ]
    },

    
    {
        question:'Какого вида поломка?',
        answers:[
            {
                id:'14',
                value:'Да',
                correct:true,
            },
            {
                id:'15',
                value:'Нет',
                correct:false,
            },
          
        
        ]
    },
];

let localResults={};

const quiz = document.getElementById("quiz")
const questions = document.getElementById("questions")
const indicator = document.getElementById("indicator")
const result = document.getElementById("result")
const btnNext = document.getElementById("btn-next")
const btnPre = document.getElementById("btn-pre")
const btnRestart = document.getElementById("btn-restart")

const renderQuestions = (index) => {
    renderIndicator(index+1);

    questions.dataset.currentStep = index;

    const renderAnswers = () => DATA[index].answers
    .map((answer) => `
            <li>
                <label>
                    <input class="answer-input" type="radio" name=${index} value=${answer.id}>
                        ${answer.value}
                </label>
            </li>            
        ` )
    .join('');

    questions.innerHTML = `
    <div class="quiz-questions-item">
        <div class="quiz-questions-item_question">${DATA[index].question}</div>
            <ul class="quiz-questions-item_answers">${renderAnswers()}</ul>
        </div>
        `;
};

const renderResults = () => {
    let content = '';

    const getAnswers = (questionIndex)=> DATA[questionIndex].answers
    .map((answer)=> `<li>${answer.value}</li>`)
    .join('');
    
    DATA.forEach((question,index) => {
        content += `
            <div class="quiz-results-item">
                <div class="quiz-results-item_question">${question.question} </div>
                <ul class="quiz-results-item_answers">${getAnswers(index)}</ul>
            </div>
        `;
    });

    results.innerHTML=content;
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML=`${currentStep}/${DATA.length}`;
};


quiz.addEventListener('change',(event)=>{
    if(event.target.classList.contains('answer-input')){
        localResults[event.target.name]=event.target.value;
        btnNext.disabled=false;
    }
});

quiz.addEventListener('click',(event)=>{
    if(event.target.classList.contains('btn-next')){
     const nextQuestionIndex= Number(questions.dataset.currentStep)+1;
     const preQuestionIndex= Number(questions.dataset.currentStep)-1;

        if(DATA.length === nextQuestionIndex){
            questions.classList.add('questions--hidden');
            indicator.classList.add('indicator--hidden');
            results.classList.add('indicator--visible');
            btnNext.classList.add('btn-next--hidden');
            btnPre.classList.add('btn-pre--hidden');
            btnRestart.classList.add('btn-restart--visible');
           
            renderResults();

            
        } else {
            renderQuestions(nextQuestionIndex);

        }
     
        btnNext.disabled=true;
        
        
        
    }

    

});

quiz.addEventListener('click',(event)=>{
    if(event.target.classList.contains('btn-pre')){
     
     const preQuestionIndex= Number(questions.dataset.currentStep);
        
        renderQuestions(preQuestionIndex);

     if(preQuestionIndex !== 0 ){
        renderQuestions(preQuestionIndex-1);
     }
  
     
    

    
 
    
    
    
}

     
        

    

});




renderQuestions(0);