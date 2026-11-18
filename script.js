
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
    const mode = document.getElementById("mode").value;

    const resultDisplay = document.getElementById("result");

    let num1, num2, result;

    // Convert signed 8-bit binary to decimal
    function binaryToSigned(binary) {

        let value = parseInt(binary, 2);

        if (binary[0] === "1") {
            value -= 256;
        }

        return value;
    }

    // Convert decimal to 8-bit two's complement
    function signedToBinary(number) {

        if (number < -128 || number > 127) {
            throw new Error("Result exceeds 8-bit signed range (-128 to 127).");
        }

        return (number & 255).toString(2).padStart(8, "0");
    }

    // Convert unsigned decimal to 8-bit binary
    function unsignedToBinary(number) {

        if (number < 0 || number > 255) {
            throw new Error("Result exceeds 8-bit unsigned range (0 to 255).");
        }

        return number.toString(2).padStart(8, "0");
    }

    try {
       
if (mode === "unsigned" || mode === "signed") {

    // Validate binary inputs (1 to 8 bits)
    if (!/^[01]{1,8}$/.test(input1) ||
        !/^[01]{1,8}$/.test(input2)) {

        throw new Error(
            "Enter between 1 and 8 binary digits (0 and 1 only)."
        );
    }

    let binary1, binary2;

    if (mode === "signed") {

        // Sign extension: repeat the leftmost bit
        binary1 = input1.padStart(8, input1[0]);
        binary2 = input2.padStart(8, input2[0]);

        num1 = binaryToSigned(binary1);
        num2 = binaryToSigned(binary2);

    } else {

        // Unsigned extension: always add zeros
        binary1 = input1.padStart(8, "0");
        binary2 = input2.padStart(8, "0");

        num1 = parseInt(binary1, 2);
        num2 = parseInt(binary2, 2);
    }

} else {

    if (input1 === "" || input2 === "" ||
        !Number.isFinite(Number(input1)) ||
        !Number.isFinite(Number(input2))) {

        throw new Error("Please enter valid decimal numbers.");
    }

    num1 = Number(input1);
    num2 = Number(input2);
}

        // Perform calculation
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

                if (num2 === 0) {
                    throw new Error("Cannot divide by zero.");
                }

                result = mode === "decimal"
                    ? num1 / num2
                    : Math.trunc(num1 / num2);

                break;

            default:
                throw new Error("Invalid operation.");
        }

        // Display results
        if (mode === "signed") {

            const binaryResult = signedToBinary(result);

            resultDisplay.innerHTML =
                "Signed Decimal Result: <strong>" + result +
                "</strong><br><br>" +
                "8-bit Two's Complement: <strong>" +
                binaryResult + "</strong>";

        } else if (mode === "unsigned") {

            const binaryResult = unsignedToBinary(result);

            resultDisplay.innerHTML =
                "Decimal Result: <strong>" + result +
                "</strong><br><br>" +
                "8-bit Binary Result: <strong>" +
                binaryResult + "</strong>";

        } else {

            const binaryResult =
                Number.isInteger(result) && result >= 0
                    ? result.toString(2)
                    : "Not available for this decimal result";

            resultDisplay.innerHTML =
                "Decimal Result: <strong>" + result +
                "</strong><br><br>" +
                "Binary Result: <strong>" +
                binaryResult + "</strong>";
        }

    } catch (error) {

        resultDisplay.textContent = "Error: " + error.message;
    }
}

// Clear calculator
document.getElementById("clearButton")
    .addEventListener("click", clearCalculator);
function clearCalculator() {

    document.getElementById("number1").value = "";
    document.getElementById("number2").value = "";
    document.getElementById("result").textContent = "";
}

/* ==========================================
   INTRODUCTION DROPDOWN
   ========================================== */

const introToggle = document.getElementById("introToggle");
const introContent = document.getElementById("introContent");

introToggle.addEventListener("click", function () {

    const isOpen = introToggle.getAttribute("aria-expanded") === "true";

    introToggle.setAttribute("aria-expanded", !isOpen);

    introContent.hidden = isOpen;

    introToggle.classList.toggle("open", !isOpen);

});

