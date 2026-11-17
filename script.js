
// Navigation Menu

const menuButton = document.getElementById("menuButton");
const dropdownMenu = document.getElementById("dropdownMenu");

menuButton.addEventListener("click", function(event) {
    event.stopPropagation();
    dropdownMenu.classList.toggle("show");
});

// Close menu when clicking outside

document.addEventListener("click", function(event) {
    if (!event.target.closest(".navigation")) {
        dropdownMenu.classList.remove("show");
    }
});

// Page Navigation

const navigationLinks = document.querySelectorAll(".dropdown a");
const pages = document.querySelectorAll(".page");

navigationLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        const selectedPage = link.dataset.page;

        pages.forEach(function(page) {
            page.classList.remove("active");
        });

        document.getElementById(selectedPage).classList.add("active");

        dropdownMenu.classList.remove("show");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

// Binary Calculator

document.getElementById("calculateButton")
    .addEventListener("click", calculateBinary);

function calculateBinary() {

    const input1 = document.getElementById("number1").value.trim();
    const input2 = document.getElementById("number2").value.trim();

    const operation = document.getElementById("operation").value;
    const resultDisplay = document.getElementById("result");

    // Validate binary inputs

    if (!/^[01]+$/.test(input1) || !/^[01]+$/.test(input2)) {
        resultDisplay.textContent =
            "Error: Please enter valid binary numbers (0 and 1 only).";
        return;
    }

    const num1 = BigInt("0b" + input1);
    const num2 = BigInt("0b" + input2);

    let result;

    switch (operation) {

        case "add":
            result = num1 + num2;
            break;

        case "subtract":
            result = num1 - num2;
            break;

        case "multiply":
            result = num1 * num2;
            break;

        case "divide":
            if (num2 === 0n) {
                resultDisplay.textContent =
                    "Error: Cannot divide by zero.";
                return;
            }

            result = num1 / num2;
            break;

        default:
            resultDisplay.textContent = "Invalid operation.";
            return;
    }

    resultDisplay.innerHTML =
        "Binary Result: <strong>" + result.toString(2) +
        "</strong><br><br>Decimal Result: <strong>" +
        result.toString() + "</strong>";
}
