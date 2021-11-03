let setIndex = 0;  
let curr_Index = 0; //current Index for question
let score = 0;
let set1 = new Set();
let option_container;  
let correct_ans;
let answered = 0;
let count = 0;    // to avoid multiple answers for a question by users
let counter = 1;  // to keep record of question solved by user,regardless of they chose any or not

const next_btn = document.querySelector(".next_btn"); //next button
const que = document.getElementById("question");  // space to append a question
const option_con = document.querySelector(".options_list"); //space to append a option


//function to arrange questions randomly recursively
function arrange_rand(){
    setIndex = Math.floor(Math.random()*10); 
    set1.add(setIndex); // using set to avoid repeating question
    if(set1.size< 10){
        arrange_rand();  //calling function until it does not fill all 10 questions randomly in a set
    }
}
arrange_rand(); // calling it first time

//for chosing next question in terms of index
function next(){
    counter++;
    count = 0;
    option_con.innerHTML = "";  // to delete previous questions appended options
    curr_Index++;
    
    //displaying score secured by user after all questions done
    if(counter >= 11){
        console.log("score",score);
        if(score>=8){
            alert("Excellent,Your Score = "+score);
        }
        else if(score<5){
           alert("You need to work Hard, Score = "+score);
        }
        else{
            alert("Well done,score = "+score);
        }
    }
    if(curr_Index >9){
       
    }
    else{
        addQuestin(curr_Index); // displaying/appending question 
    }
}

//checking answer of user and recording score
function checkAnswer(e){
    //if user answered once
    if(count == 0){
        answered++;  
        console.log("answered",answered); //number of question user answered
        let selected_container = e.target; // div container clicked by user to answer
        let selected_ans = e.target.innerHTML; // extracting answer given by user
      
       //checking, Is answer correct and giving score accordingly
       if(selected_ans == correct_ans){
        selected_container.classList.add("right_ans"); // giving green color for Correct answer
        score++;  //increasing score as correct answer
       }
       else{
        selected_container.classList.add("wrong_ans"); // giving red color for Incorrect answer
       }
       count++;
    }
    //if user try to select multiple options
    else{
        alert("You can only answer once,try next question.Best of Luck")
    }
   
}

function addQuestin(index){
    //getting all questions data using API

    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy")
    .then(response => response.json())
    .then(data => {
       if(curr_Index<=9){
        que.innerHTML = (index+1)+". "+data.results[index].question; //appending question
        let options_display = data.results[index].incorrect_answers;
        correct_ans = data.results[index].correct_answer;
        options_display.push(correct_ans);
        //appending all options of a question asked
        options_display.forEach((option)=>{
            option_container = document.createElement("div");
            option_container.setAttribute("onclick","checkAnswer(event)");
            option_container.classList.add("options");
            option_container.innerHTML = option;
            option_con.appendChild(option_container);
        })
       }
       }
    );
    
}

addQuestin(curr_Index);  //calling it first time