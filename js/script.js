$(document).ready(function () {

    readCsv();
});


function readCsv(){
    jQuery.ajax({
        url: "https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/cases_state.csv",
        type: 'get',
        dataType: 'text',
        success: function(data) {
            let lines = data.split('\n');
            let fields = lines[0].split(',');
            
            let output = [];
            
            for(let i = 1; i < lines.length; i++){
               let current = lines[i].split(',');
               let doc = {};
               for(let j = 0; j < fields.length; j++){
                   doc[fields[j]] = current[j];
               }
               output.push(doc);
            }       
            console.log(output);
            let filteredData = [];
            output.filter((item)=>{
               if(item.date ===getYesterdayDate().toString()){
                    return filteredData.push(item);
                }
            });
            filteredData.map((item)=>{
                let b;
                if(item.state.includes('W.P.')){
                   b= item.state.replace(/\.\s|\.|\s+/g, "-").toLowerCase();
                    item.state =b
            } else{
                 b= item.state.replace(' ','-').toLowerCase();  
                 item.state =b
            }
               return filteredData;
            })
            // console.log('mapped',a);
            // return data
            populate(filteredData)
        },
        error: function(jqXHR, textStatus, errorThrow){
            console.log(textStatus);
        }
    });
}

function populate(data){
    let totalCases = 0;
    let totalRecoveredCases =0;
    $.each(data, function(index, item){
        totalCases = Number(totalCases) + Number(item.cases_new);
        totalRecoveredCases= Number(totalRecoveredCases)+Number(item.cases_recovered);
        let name = item.state, 
        container = `.ct-${name}`;
        $(`${container} .new-cases .value`).html(item.cases_new);
        $(`${container} .recovered-cases .value`).html(item.cases_recovered);
    })
    let headerNewCases =`.ct-new-cases`;
    let headerRecoveredCases = '.ct-recovered-cases'
    $(`${headerNewCases} .value h1`).html(totalCases);
    $(`${headerRecoveredCases} .value h1`).html(totalRecoveredCases);
    let date =getYesterdayDate();
    $(`.ct-today-date`).html(date);
}



// https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/deaths_malaysia.csv

// function readDeath(){
//     jQuery.ajax({
//         url: "https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/deaths_malaysia.csv",
//         type: 'get',
//         dataType: 'text',
//         success: function(data) {
//             let lines = data.split('\n');
//             let fields = lines[0].split(',');
            
//             let output = [];
            
//             for(let i = 1; i < lines.length; i++){
//                let current = lines[i].split(',');
//                let doc = {};
//                for(let j = 0; j < fields.length; j++){
//                    doc[fields[j]] = current[j];
//                }
//                output.push(doc);
//             }       
//             console.log(output);
//             let a = [];
//             output.filter((item)=>{
//                 if(item.date ===getTodayDate().toString() ){
//                    return a.push(item);
//                 }
//                 else if(item.date ===getYesterdayDate().toString()){
//                     return a.push(item);
//                 }
//                 else{
//                     return a;
//                 }
//             });
//             console.log(a)
//             // return a
//         },
//         error: function(jqXHR, textStatus, errorThrow){
//             console.log(textStatus);
//         }
//     });
// }

function getYesterdayDate() {
    return new Date(new Date().getTime() - 24*60*60*1000).toISOString().slice(0,10);
  }

  function getTodayDate() {
    return new Date().toISOString().slice(0, 10);
  }

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "user" && password === "web_dev") {       
        console.log('hello');
window.location.href="home.html";
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})