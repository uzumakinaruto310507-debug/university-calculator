
let display = document.getElementById("display");

// Add numbers and operators
function appendValue(value) {
    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Scientific functions
function calculate(type) {
    let value = parseFloat(display.value);

    if (isNaN(value)) {
        display.value = "Error";
        return;
    }

    if (type === "sqrt") {
        display.value = Math.sqrt(value);
    }

    else if (type === "square") {
        display.value = value ** 2;
    }

    else if (type === "sin") {
        display.value = Math.sin(value * Math.PI / 180);
    }

    else if (type === "cos") {
        display.value = Math.cos(value * Math.PI / 180);
    }

    else if (type === "tan") {
        display.value = Math.tan(value * Math.PI / 180);
    }

    else if (type === "log") {
        display.value = Math.log10(value);
    }
}

// Basic calculation
function calculateResult() {
    try {
        let expression = display.value;

        if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
            display.value = "Error";
            return;
        }

        display.value = Function(
            '"use strict"; return (' + expression + ')'
        )();
    }

    catch {
        display.value = "Error";
    }
}

// Add subject
function addSubject() {
    let subjects = document.getElementById("subjects");

    let div = document.createElement("div");
    div.className = "subject";

    div.innerHTML = `
        <input type="number" placeholder="Credit" class="credit" min="0">
        <input type="number" placeholder="Grade Point" class="grade" min="0">
    `;

    subjects.appendChild(div);
}

// Calculate CGPA
function calculateCGPA() {
    let credits = document.querySelectorAll(".credit");
    let grades = document.querySelectorAll(".grade");

    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < credits.length; i++) {
        let credit = parseFloat(credits[i].value);
        let grade = parseFloat(grades[i].value);

        if (isNaN(credit) || isNaN(grade) ||
            credit <= 0 || grade < 0) {
            alert("Please enter valid credits and grade points.");
            return;
        }

        totalCredits += credit;
        totalPoints += credit * grade;
    }

    if (totalCredits === 0) {
        alert("Please add subjects.");
        return;
    }

    let cgpa = totalPoints / totalCredits;

    document.getElementById("cgpaResult").innerText =
        "CGPA: " + cgpa.toFixed(2);

    document.getElementById("percentageResult").innerText =
        "Percentage: " + (cgpa * 10).toFixed(2) + "%";
}