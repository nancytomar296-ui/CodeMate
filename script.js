/* =====================================================
   CODEMATE JAVASCRIPT
   ===================================================== */


/* ================= ELEMENTS ================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

const themeBtn = document.getElementById("themeBtn");

const codeInput = document.getElementById("codeInput");
const errorInput = document.getElementById("errorInput");

const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");

const resultArea = document.getElementById("resultArea");

const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const loadExampleBtn =
    document.getElementById("loadExampleBtn");

const errorExampleBtn =
    document.getElementById("errorExampleBtn");


/* =====================================================
   MOBILE MENU
   ===================================================== */

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", function () {

        const isOpen =
            navbar.classList.toggle("active");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuBtn.textContent =
            isOpen ? "✕" : "☰";

    });

}


/* Close mobile menu after navigation */

document.querySelectorAll(".navbar > a").forEach(function (link) {

    link.addEventListener("click", function () {

        if (navbar) {
            navbar.classList.remove("active");
        }

        if (menuBtn) {

            menuBtn.textContent = "☰";

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});


/* =====================================================
   DARK / LIGHT MODE
   ===================================================== */

function updateThemeButton() {

    if (!themeBtn) return;


    const isDark =
        document.body.classList.contains("dark");


    if (isDark) {

        themeBtn.textContent = "☀️";

        themeBtn.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeBtn.title =
            "Switch to light mode";

    } else {

        themeBtn.textContent = "🌙";

        themeBtn.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeBtn.title =
            "Switch to dark mode";

    }

}


/* Load saved theme */

const savedTheme =
    localStorage.getItem("codemateTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

} else {

    document.body.classList.remove("dark");

}


/* Update button */

updateThemeButton();


/* Theme button */

if (themeBtn) {

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark");


        const isDark =
            document.body.classList.contains("dark");


        localStorage.setItem(
            "codemateTheme",
            isDark ? "dark" : "light"
        );


        updateThemeButton();

    });

}


/* =====================================================
   ANALYZER
   ===================================================== */

if (analyzeBtn) {

    analyzeBtn.addEventListener(
        "click",
        analyzeCode
    );

}


function analyzeCode() {

    if (!codeInput || !errorInput || !resultArea) {
        return;
    }


    const code =
        codeInput.value.trim();

    const error =
        errorInput.value.trim();


    if (code === "" && error === "") {

        showMessage(
            "Please paste your code or error message first."
        );

        return;

    }


    const text =
        (code + " " + error).toLowerCase();


    let result;


    /* ================= REFERENCE ERROR ================= */

    if (
        text.includes("referenceerror") ||
        text.includes("is not defined")
    ) {

        result = {

            title: "ReferenceError",

            subtitle:
                "JavaScript cannot find a variable or function.",

            meaning:
                "Your code is trying to use a name that JavaScript does not know about.",

            reasons: [

                "The variable was never declared.",

                "The variable name is misspelled.",

                "The variable is outside its scope.",

                "The JavaScript file may not have loaded."

            ],

            solution:
                "Check the spelling and make sure the variable or function is declared before it is used.",

            example:
`const username = "Nancy";

console.log(username);`

        };

    }


    /* ================= SYNTAX ERROR ================= */

    else if (
        text.includes("syntaxerror") ||
        text.includes("unexpected token") ||
        text.includes("unexpected end")
    ) {

        result = {

            title: "SyntaxError",

            subtitle:
                "JavaScript cannot understand the structure of your code.",

            meaning:
                "There is a mistake in the syntax of your JavaScript code.",

            reasons: [

                "A bracket or parenthesis is missing.",

                "A quote is not closed.",

                "There may be an unexpected character.",

                "A statement may be written incorrectly."

            ],

            solution:
                "Check brackets, parentheses, quotes and the spelling of JavaScript keywords.",

            example:
`function hello() {

    console.log("Hello");

}`

        };

    }


    /* ================= TYPE ERROR ================= */

    else if (
        text.includes("typeerror") ||
        text.includes("cannot read properties") ||
        text.includes("is not a function")
    ) {

        result = {

            title: "TypeError",

            subtitle:
                "JavaScript is using a value in an incorrect way.",

            meaning:
                "The value exists, but JavaScript cannot perform the requested operation on it.",

            reasons: [

                "A value may be null or undefined.",

                "You may be calling a function that does not exist.",

                "You may be using the wrong data type.",

                "An object property may not exist."

            ],

            solution:
                "Check the value before using it and make sure the method or property exists.",

            example:
`const user = {
    name: "Nancy"
};

console.log(user.name);`

        };

    }


    /* ================= 404 ================= */

    else if (
        text.includes("404") ||
        text.includes("not found")
    ) {

        result = {

            title: "404 Not Found",

            subtitle:
                "The requested page or file could not be found.",

            meaning:
                "The browser or server could not find the URL or file you requested.",

            reasons: [

                "The file name may be incorrect.",

                "The path may be wrong.",

                "The file may not have been uploaded.",

                "The URL may be incorrect."

            ],

            solution:
                "Check the file name, folder path and URL carefully.",

            example:
`href="github-guide.html"`

        };

    }


    /* ================= CORS ================= */

    else if (
        text.includes("cors") ||
        text.includes("cross-origin")
    ) {

        result = {

            title: "CORS Error",

            subtitle:
                "The browser blocked a cross-origin request.",

            meaning:
                "Your frontend is trying to communicate with another origin that has not allowed the request.",

            reasons: [

                "The server does not allow your frontend origin.",

                "The API may require CORS configuration.",

                "The request may be going to the wrong URL."

            ],

            solution:
                "Configure CORS on your backend or use a backend endpoint that allows the request.",

            example:
`fetch("/api/data")
    .then(response => response.json())
    .then(data => console.log(data));`

        };

    }


    /* ================= FETCH ================= */

    else if (
        text.includes("failed to fetch") ||
        text.includes("networkerror") ||
        text.includes("fetch(")
    ) {

        result = {

            title: "Fetch / Network Error",

            subtitle:
                "The browser could not complete the network request.",

            meaning:
                "Your JavaScript tried to request data from a server but the request failed.",

            reasons: [

                "The API URL may be incorrect.",

                "The server may be offline.",

                "There may be a CORS problem.",

                "The internet connection may be unavailable."

            ],

            solution:
                "Check the API URL, server status, browser console and CORS settings.",

            example:
`fetch("/api/weather")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));`

        };

    }


    /* ================= HTML ================= */

    else if (
        text.includes("<html") ||
        text.includes("<div") ||
        text.includes("<button") ||
        text.includes("<h1") ||
        text.includes("html")
    ) {

        result = {

            title: "HTML Check",

            subtitle:
                "Let's check your HTML structure.",

            meaning:
                "HTML errors are usually caused by incorrect tags, missing closing tags or incorrect attributes.",

            reasons: [

                "A tag may not be closed.",

                "The attribute name may be incorrect.",

                "Elements may be nested incorrectly.",

                "The file structure may be incomplete."

            ],

            solution:
                "Check opening and closing tags and make sure your HTML structure is properly nested.",

            example:
`<!DOCTYPE html>

<html>

<head>

    <title>My Page</title>

</head>

<body>

    <h1>Hello CodeMate!</h1>

</body>

</html>`

        };

    }


    /* ================= CSS ================= */

    else if (
        text.includes("{") &&
        text.includes(":") &&
        text.includes(";")
    ) {

        result = {

            title: "CSS Check",

            subtitle:
                "Let's check your CSS.",

            meaning:
                "CSS problems are often caused by incorrect selectors, properties or missing brackets.",

            reasons: [

                "The selector may be incorrect.",

                "The property name may be wrong.",

                "A semicolon may be missing.",

                "A closing bracket may be missing."

            ],

            solution:
                "Check your selectors, CSS property names, values and curly brackets.",

            example:
`body {

    background: white;

    color: black;

    font-family: Arial;

}`

        };

    }


    /* ================= GENERAL ================= */

    else {

        result = {

            title: "CodeMate Check",

            subtitle:
                "We could not identify a specific error.",

            meaning:
                "The provided code or error message does not match our common beginner error patterns.",

            reasons: [

                "The error message may be incomplete.",

                "The problem may be specific to your project.",

                "More context may be required."

            ],

            solution:
                "Check the browser console and read the complete error message carefully.",

            example:
`console.log("Start debugging");`

        };

    }


    displayResult(result);


    saveHistory(
        result.title,
        error || "Code analysis"
    );

}


/* =====================================================
   DISPLAY RESULT
   ===================================================== */

function displayResult(result) {

    if (!resultArea) return;


    let reasonsHTML = "";


    result.reasons.forEach(function (reason) {

        reasonsHTML += `
            <li>${escapeHTML(reason)}</li>
        `;

    });


    resultArea.innerHTML = `

        <div class="result-card">

            <div class="result-icon">
                💡
            </div>

            <p class="result-label">
                ANALYSIS RESULT
            </p>

            <h3>
                ${escapeHTML(result.title)}
            </h3>

            <p class="result-subtitle">
                ${escapeHTML(result.subtitle)}
            </p>


            <div class="result-block">

                <h4>
                    What does it mean?
                </h4>

                <p>
                    ${escapeHTML(result.meaning)}
                </p>

            </div>


            <div class="result-block">

                <h4>
                    Common reasons
                </h4>

                <ul>
                    ${reasonsHTML}
                </ul>

            </div>


            <div class="result-block solution">

                <h4>
                    How to fix it
                </h4>

                <p>
                    ${escapeHTML(result.solution)}
                </p>

            </div>


            <div class="result-block">

                <h4>
                    Example
                </h4>

                <pre><code>${escapeHTML(result.example)}</code></pre>

            </div>

        </div>

    `;

}


/* =====================================================
   SHOW MESSAGE
   ===================================================== */

function showMessage(message) {

    if (!resultArea) return;


    resultArea.innerHTML = `

        <div class="empty-result">

            <div class="empty-icon">
                ⚠️
            </div>

            <h3>
                ${escapeHTML(message)}
            </h3>

        </div>

    `;

}


/* =====================================================
   ESCAPE HTML
   ===================================================== */

function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   CLEAR ANALYZER
   ===================================================== */

if (clearBtn) {

    clearBtn.addEventListener("click", function () {

        if (codeInput) {
            codeInput.value = "";
        }

        if (errorInput) {
            errorInput.value = "";
        }


        if (resultArea) {

            resultArea.innerHTML = `

                <div class="empty-result">

                    <div class="empty-icon">
                        🔎
                    </div>

                    <h3>
                        Analysis appears here
                    </h3>

                    <p>
                        Enter your code and error,
                        then click Analyze.
                    </p>

                </div>

            `;

        }

    });

}


/* =====================================================
   LOAD EXAMPLE
   ===================================================== */

function loadExample() {

    if (!codeInput) return;


    codeInput.value =
`const username = "Nancy";

console.log(usernme);`;


    if (errorInput) {

        errorInput.value =
            "ReferenceError: usernme is not defined";

    }

}


/* =====================================================
   LOAD ERROR EXAMPLE
   ===================================================== */

function loadErrorExample() {

    if (!errorInput) return;


    errorInput.value =
        "ReferenceError: usernme is not defined";


    if (codeInput && codeInput.value.trim() === "") {

        codeInput.value =
`const username = "Nancy";

console.log(usernme);`;

    }

}


/* Example buttons */

if (loadExampleBtn) {

    loadExampleBtn.addEventListener(
        "click",
        loadExample
    );

}


if (errorExampleBtn) {

    errorExampleBtn.addEventListener(
        "click",
        loadErrorExample
    );

}


/* =====================================================
   QUICK ERRORS
   ===================================================== */

function quickError(type) {

    if (!errorInput) return;


    const errors = {

        reference:
            "ReferenceError: username is not defined",

        syntax:
            "SyntaxError: Unexpected token",

        type:
            "TypeError: Cannot read properties of undefined",

        "404":
            "404 Not Found",

        cors:
            "CORS policy blocked the request",

        fetch:
            "TypeError: Failed to fetch"

    };


    errorInput.value =
        errors[type] || "";


    if (codeInput && codeInput.value.trim() === "") {

        codeInput.value =
`console.log(username);`;

    }


    const analyzer =
        document.getElementById("analyzer");


    if (analyzer) {

        analyzer.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* Quick error buttons */

document.querySelectorAll(
    ".chips button[data-error]"
).forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            quickError(
                button.dataset.error
            );

        }
    );

});


/* =====================================================
   HISTORY
   ===================================================== */

function getHistory() {

    try {

        return JSON.parse(
            localStorage.getItem("codemateHistory")
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveHistory(title, message) {

    const history = getHistory();


    history.unshift({

        title: title,

        message: message,

        time: new Date().toLocaleString()

    });


    const limitedHistory =
        history.slice(0, 10);


    try {

        localStorage.setItem(
            "codemateHistory",
            JSON.stringify(limitedHistory)
        );

    } catch (error) {

        console.log(
            "Unable to save history."
        );

    }


    renderHistory();

}


function renderHistory() {

    if (!historyList) return;


    const history = getHistory();


    if (history.length === 0) {

        historyList.innerHTML = `

            <div class="empty-history">

                <p>
                    No recent analyses yet.
                </p>

            </div>

        `;

        return;

    }


    historyList.innerHTML =
        history.map(function (item) {

            return `

                <div class="history-item">

                    <div>

                        <strong>
                            ${escapeHTML(item.title)}
                        </strong>

                        <p>
                            ${escapeHTML(item.message)}
                        </p>

                    </div>

                    <small>
                        ${escapeHTML(item.time)}
                    </small>

                </div>

            `;

        }).join("");

}


if (clearHistory) {

    clearHistory.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "codemateHistory"
            );

            renderHistory();

        }
    );

}


renderHistory();


/*=====================================================
   SEARCH
   ===================================================== */

function performSearch() {

    if (!searchInput) return;


    const query =
        searchInput.value.trim().toLowerCase();


    if (query === "") {

        return;

    }


    const sections = {

        home: "home",

        tools: "tools",

        analyzer: "analyzer",

        playground: "playground",

        guides: "guides",

        tips: "tips"

    };


    let found = false;


    /* Search section names */

    for (const keyword in sections) {

        if (query.includes(keyword)) {

            const section =
                document.getElementById(
                    sections[keyword]
                );


            if (section) {

                section.scrollIntoView({
                    behavior: "smooth"
                });

                found = true;

                break;

            }

        }

    }


    /* Search cards */

    if (!found) {

        const cards =
            document.querySelectorAll(
                ".tool-card, .guide-item"
            );


        for (const card of cards) {

            const content =
                card.textContent.toLowerCase();


            if (content.includes(query)) {

                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                card.classList.add(
                    "search-highlight"
                );


                setTimeout(function () {

                    card.classList.remove(
                        "search-highlight"
                    );

                }, 1800);


                found = true;

                break;

            }

        }

    }


    if (!found) {

        showSearchMessage(query);

    }


    if (searchInput) {
        searchInput.blur();
    }

}


function showSearchMessage(query) {

    const oldMessage =
        document.querySelector(
            ".search-message"
        );


    if (oldMessage) {
        oldMessage.remove();
    }


    const message =
        document.createElement("div");


    message.className =
        "search-message";


    message.textContent =
        `No result found for "${query}"`;


    document.body.appendChild(message);


    setTimeout(function () {

        message.remove();

    }, 2200);

}


if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        performSearch
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();

            }

        }
    );

}


/* =====================================================
   KEYBOARD SHORTCUT
   ===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "/" &&
            document.activeElement !== searchInput &&
            document.activeElement !== codeInput &&
            document.activeElement !== errorInput
        ) {

            event.preventDefault();

            if (searchInput) {

                searchInput.focus();

            }

        }

    }
);
