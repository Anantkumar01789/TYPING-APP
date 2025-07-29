const paragraphs =[
    "THIS APP IS MADE BY ANANT KUMAR.",
    "A paragraph is a group of sentences, usually related to a single topic, that is used to organize and structure written work. It typically begins with a new line, often indented, and helps to break down larger pieces of text into manageable chunks. Paragraphs can vary in length and structure, but they generally serve to develop a main idea and guide the reader through the text. ",
    "Wildlife refers to undomesticated animals and uncultivated plant species which can exist in their natural habitat, but has come to include all organisms that grow or live wild in an area without being introduced by humans. Wildlife was also synonymous to game: those birds and mammals that were hunted for sport",
    "Wildlife is crucial for maintaining ecological balance, providing essential ecosystem services, and contributing to human well-being. It plays a vital role in pollination, nutrient cycling, pest control, and disease regulation, all of which are vital for healthy ecosystems and human societies. Furthermore, wildlife has economic and scientific value, offering resources like timber and medicines, and serving as subjects for research. ",
    "Wildlife refers to undomesticated animals and uncultivated plant species which can exist in their natural habitat, but has come to include all organisms that grow or live wild in an area without being introduced by humans. Wildlife was also synonymous to game: those birds and mammals that were hunted for sport.",
    "Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.",
    "India is famous for its rich cultural heritage, historical monuments like the Taj Mahal, diverse cuisine, vibrant festivals, and spiritual destinations. The country's natural landscapes, from the Himalayas to Kerala's backwaters, and bustling cities like Delhi and Mumbai also attract numerous tourists.",
    "Bihar, located in eastern India, is a state rich in history and culture. It is the third most populous state in India and is known for its ancient historical sites like Nalanda University and Bodh Gaya, where Buddha is said to have attained enlightenment. Bihar is also famous for the Sonepur Cattle Fair, one of the largest of its kind in Asia. The state's cuisine features unique dishes like Litti Chokha and Chana Ghugni, and its traditional dances are a vibrant part of its cultural heritage. ",
    "Patna, the capital of Bihar, is one of the oldest continuously inhabited places in the world, with a history stretching back over 2,500 years. Once known as Pataliputra, it served as the capital of the Magadha Empire under various dynasties, including the Mauryas and Guptas, and was a center of learning and culture. Today, Patna is a vibrant city where ancient heritage meets modern life, nestled on the southern bank of the Ganges River. It's a city of historical significance, religious importance for Sikhs and Buddhists, and a hub of trade and agriculture. ",
    "Bihta is a town and block within the Danapur Tehsil of Patna district in Bihar, India. It's located about 30 km (19 mi) west of Patna and is recognized as an upcoming satellite town of the city. Bihta is gaining prominence due to the presence of the Indian Institute of Technology Patna (IIT Patna), which is situated approximately 3.5 km (2.2 mi) from the Bihta railway station. The town is also developing as an industrial area and is becoming increasingly associated with progress and opportunity in Bihar.",
    "Bihta's strategic location near Patna, coupled with the establishment of IIT Patna, has spurred significant development in education and related sectors. The town is witnessing a mix of urban development, industrial zones, and traditional agricultural land. Bihta railway station serves as a major transportation hub, connecting the town to Arrah, Chapra, and Begusarai, among other locations. The upcoming Bihta airport, along with the existing railway station, further enhances Bihta's connectivity"
];

 const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        console.log(char);
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0: wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);