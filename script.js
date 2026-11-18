
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


/* ==============================
   MEMBERS PAGE FUNCTIONALITY
============================== */

const members = {

    ashton: {
        name: "Ashton Alton Jones",
        role: "Bachelor's in Information Technology",
        image: "images/WhatsApp Image 2026-11-16 at 8.24.51 AM (1).jpeg",

        biography: `My name is Ashton Alton Jones, although I mostly go by the aliases "Ash-t" and "Tubby". Some may perceive me as shy, and contrary to that belief, I am still shy. However, I know when to make my presence known and felt when needed. I am currently enrolled in the Bachelor's in Information Technology program.

Growing up, I have always been fascinated by how mechanisms work, intrigued by how things are made and built. Through this curiosity, I learned that I want to become skilled by gaining knowledge and applying it. However, what good are knowledge and skills without wisdom? Wisdom is knowing how to use the knowledge gained and develop those skills.

My first real exposure to IT came when my family got our first desktop computer. I remember using floppy disks to store files and information. Since we did not have an internet connection, we used a Wi-Fi dongle and received permission to access our neighbour's connection. Later came the installation of games and applications such as Virtual DJ and Mavis Beacon, followed by the transition from floppy disks to CD-ROMs.

My favourite topics are Operating Systems and Networking and the Internet. Before choosing this career path, I often wondered what happened behind the scenes when computers booted up and how multiple devices received network and internet connectivity simultaneously.

I am fascinated by how technology continues to evolve and revolutionize the world. I believe we must continue learning, focus on the fundamentals, use our imagination, and create. Knowledge and skills must be accompanied by wisdom. I strive to take pride in my work, avoid complacency, and contribute to the continued advancement of Information Technology.`
    },

    gabriel: {
        name: "Gabriel Natanael Pivaral",
        role: "Associate's in Information Technology",
        image: "images/Screenshot 2026-11-18 151542.png",

        biography: `My name is Gabriel Natanael Pivaral, the name given to me by my parents. I am known for being quiet because I do not like to speak much. I have always been someone willing to assist others, and I have developed interests in many different things. I am currently studying in the Associate's in Information Technology program.

When I was little, I was always interested in using computers. During the COVID-19 period, my interest grew even more. My curiosity about how electronic software and hardware work inspired me to study this field.

My main interest in IT is programming websites and creating User Interfaces (UI). Although I still have much to learn in these areas, I am putting all my effort into this program so that I can achieve my goals.

My favourite topic is Networking and Internet (N&I). I enjoy this topic because I already have some background knowledge, partly because my father works in this area of IT, especially networking and internet services.

Through my studies, I have gained a better understanding of how data is transferred from point A to point B and the different networking topologies. These are some of the new things I have learned that have strengthened my interest in Networking and Internet.`
    },

    alsthon: {
        name: "Alsthon Segura",
        role: "Information Technology Student - University of Belize",
        image: "images/20230813_124444.jpg",

        biography: `My name is Alsthon Segura, and I am 20 years old. I attended Saint Joseph Primary School and Belize Adventist College High School, where I studied science.

I currently attend the University of Belize (UB), majoring in Information Technology.

I enjoy movies, television shows, books, games, and music. My sincere goal is to pursue a career in Information Technology and secure a job in the IT field.`
    },

    zaheem: {
        name: "Zaheem Humes",
        role: "Information Technology Student",
        image: null,

        biography: `My interest in Information Technology developed through my family's influence and exposure to technology. This sparked my curiosity and encouraged me to explore the world of IT.

Among the topics I have studied, my favourite has been Computer Graphics. I particularly enjoy learning about the visual and creative side of technology and how graphics contribute to the digital world.`
    }

};


/* DISPLAY SELECTED MEMBER */

const memberCards = document.querySelectorAll(".member-card");
const detailName = document.getElementById("detailName");
const detailRole = document.getElementById("detailRole");
const detailBiography = document.getElementById("detailBiography");
const profileImage = document.querySelector(".profile-image");


function showMember(memberId) {

    const member = members[memberId];

    if (!member) return;

    // Update member information
    detailName.textContent = member.name;
    detailRole.textContent = member.role;
    detailBiography.textContent = member.biography;

    // Update profile image
    if (member.image) {

        profileImage.innerHTML = `
            <img src="${member.image}"
                 alt="${member.name}"
                 onerror="this.style.display='none'">
        `;

    } else {

        profileImage.innerHTML = `
            <div class="member-placeholder profile-placeholder">
                ZH
            </div>
        `;

    }

    // Highlight selected member
    memberCards.forEach(card => {

        card.classList.remove("active");

        if (card.dataset.member === memberId) {
            card.classList.add("active");
        }

    });

}


// Add click functionality
memberCards.forEach(card => {

    card.addEventListener("click", () => {

        const memberId = card.dataset.member;

        showMember(memberId);

    });

});


// Display Ashton when the page first loads
showMember("ashton");
