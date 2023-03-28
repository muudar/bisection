const x1Input = document.getElementById("x1");
const x2Input = document.getElementById("x2");
const errorMessage = document.getElementsByClassName("error-message")[0];
const errorMessageText = document.getElementById("error-message-text");
const immediateSuccessMessage = document.getElementsByClassName("immediate-success-message")[0];
const successMessageText = document.getElementById("success-message-text");
const maxError = parseFloat(document.getElementById("error").value);
const table = document.getElementById("myTable");


const correctFormula = (val) =>{
    var input = document.getElementById("function").value;
    if(!(input.includes("x"))){
        alert("this");
        return false;
    }
    try{
        var f = math.parse(input).compile();
        var result = f.evaluate({x: val});
        }catch(e){
            console.log(e);
            return false;
        }
        return true;
}

function evaluateFunction(val) {
    // Get the value of the input field
    var input = document.getElementById("function").value;
  
    try{


    // Evaluate the function using math.js
    var f = math.parse(input).compile();
    var result = f.evaluate({x: val}); // Evaluate f(x) at x = 2

    }catch(e){
        alert("error");
        document.getElementById("function").value = "";
        clearBody();
    }
    
    // Do something with the result
    return parseFloat(result).toFixed(4);
  }



function addRow(iteration, x1, x3, x2, fx1, fx3, fx2, error) {
// Get the table body element
  var tableBody = document.querySelector("#myTable tbody");

  // Create a new row element
  var row = document.createElement("tr");

  // Create and append the cells for each column
  var iterationCell = document.createElement("td");
  iterationCell.textContent = iteration;
  row.appendChild(iterationCell);

  var x1Cell = document.createElement("td");
  x1Cell.textContent = x1;
  row.appendChild(x1Cell);

  var x3Cell = document.createElement("td");
  x3Cell.textContent = x3;
  row.appendChild(x3Cell);

  var x2Cell = document.createElement("td");
  x2Cell.textContent = x2;
  row.appendChild(x2Cell);

  var fx1Cell = document.createElement("td");
  fx1Cell.textContent = fx1;
  row.appendChild(fx1Cell);

  var fx3Cell = document.createElement("td");
  fx3Cell.textContent = fx3;
  row.appendChild(fx3Cell);

  var fx2Cell = document.createElement("td");
  fx2Cell.textContent = fx2;
  row.appendChild(fx2Cell);

  var errorCell = document.createElement("td");
  errorCell.textContent = error;
  row.appendChild(errorCell);

  // Append the row to the table body
  tableBody.appendChild(row);
}

const clearBody = () => {
    table.style.display = "none";
    immediateSuccessMessage.style.display = "none";
    errorMessage.style.display = "none";
}

const submitFunc = (event) => { 
    event.preventDefault();
    var x1 = parseFloat(x1Input.value);
    var x2 = parseFloat(x2Input.value);
    clearBody();
    if(!correctFormula(x1)){  
        errorMessage.style.display = "block";
        errorMessageText.innerHTML = "<p>Please Enter a valid function</p>";
        return;
    }
    table.innerHTML = "<thead><tr><th>Iteration</th><th>x1</th><th>x3</th><th>x2</th><th>f(x1)</th><th>f(x3)</th><th>f(x2)</th><th>Error</th></tr></thead><tbody></tbody>"
    if(x1 >= x2){
        errorMessage.style.display = "block";
        errorMessageText.innerHTML = "";
        errorMessageText.innerHTML += "<p>" + " Please use x1 as the lower bound and x2 as the higher bound" + "</p>";
    }
    else if((evaluateFunction(x1) > 0 && evaluateFunction(x2) > 0) || evaluateFunction(x1) < 0 && evaluateFunction(x2) < 0){
        errorMessage.style.display = "block";
        errorMessageText.innerHTML = "";
        var f1 = evaluateFunction(x1);
        var f2 = evaluateFunction(x2);
        errorMessageText.innerHTML += "<p>" + "f(x1) = " + f1 + "</p>";
        errorMessageText.innerHTML += "<p>" + "f(x2) = " + f2 + "</p>";
        errorMessageText.innerHTML += "<p>" + "There is no solution in the provided interval as they both have the same sign" + "</p>";
    }
    else if(evaluateFunction(x1) == 0){
        immediateSuccessMessage.style.display = "block";
        successMessageText.innerHTML = "<p>" + "f(x1) = 0" + "</p>" + "</p>" + "Root is x1 = " + x1 + "</p>"; 
    }
    else if(evaluateFunction(x2) == 0){
        immediateSuccessMessage.style.display = "block";
        successMessageText.innerHTML = "<p>" + "f(x2) = 0" + "</p>" + "</p>" + "Root is x1 = " + x2 + "</p>"; 
    }
    else{
        var it = 1;
        table.style.display = "table";
        x1 = parseFloat(x1);
        x2 = parseFloat(x2);
       do{
            var error = (x2 - x1) / 2.0;
            var x3 = (x2 + x1) / 2.0;
            var f1 = evaluateFunction(x1);
            var f2 = evaluateFunction(x2);
            var f3 = evaluateFunction(x3);
            addRow(it,x1,x3,x2,f1,f3,f2,error);
            if(f3 > 0){
                x2 = x3;
            } 
            else{
                x1 = x3;
            }
            it++;
        } while(error > maxError);
        immediateSuccessMessage.style.display = "block";
        successMessageText.innerHTML = "<p>" + "The root is between " + x1 + " and " + x2 + "</p>"; 
    }
}