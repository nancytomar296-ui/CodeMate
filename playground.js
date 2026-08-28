/* =====================================================
   CODEMATE - CODE PLAYGROUND JAVASCRIPT
   ===================================================== */


/* ================= ELEMENTS ================= */

const htmlCode = document.getElementById("htmlCode");
const cssCode = document.getElementById("cssCode");
const jsCode = document.getElementById("jsCode");
const outputFrame = document.getElementById("outputFrame");


/* =====================================================
   RUN CODE
   ===================================================== */

function runCode() {

    if (!htmlCode || !cssCode || !jsCode || !outputFrame) {
        return;
    }

    const html = htmlCode.value;
    const css = cssCode.value;
    const javascript = jsCode.value;


    /* Check whether all editors are empty */

    if (
        html.trim() === "" &&
        css.trim() === "" &&
        javascript.trim() === ""
    ) {

        outputFrame.srcdoc = `
            <div style="
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
                color: #666;
            ">
                <h2>👋 Start Coding</h2>
                <p>Write some HTML, CSS or JavaScript and click Run Code.</p>
            </div>
        `;

        return;
    }


    /* Create complete webpage */

    const completeCode = `
<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <style>

        ${css}

    </style>

</head>


<body>

    ${html}


    <script>

        try {

            ${javascript}

        } catch (error) {

            document.body.insertAdjacentHTML(
                "beforeend",
                '<div style="margin:20px;padding:15px;background:#ffe5e5;color:#b00020;border-radius:8px;font-family:Arial;">' +
                '<strong>JavaScript Error:</strong> ' +
                error.message +
                '</div>'
            );

            console.error(error);

        }

    <\/script>

</body>

</html>
`;


    outputFrame.srcdoc = completeCode;

}


/* =====================================================
   CLEAR CODE
   ===================================================== */

function clearCode() {

    if (!htmlCode || !cssCode || !jsCode || !outputFrame) {
        return;
    }


    const confirmClear = confirm(
        "Are you sure you want to clear all code?"
    );


    if (!confirmClear) {
        return;
    }


    htmlCode.value = "";
    cssCode.value = "";
    jsCode.value = "";


    outputFrame.srcdoc = `
        <div style="
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            color: #777;
        ">
            <h2>🧹 Playground Cleared</h2>
            <p>Write your code and click Run Code to begin.</p>
        </div>
    `;

}


/* =====================================================
   LOAD EXAMPLE
   ===================================================== */

function loadExample() {

    if (!htmlCode || !cssCode || !jsCode) {
        return;
    }


    htmlCode.value = `<div class="card">

    <h1>Welcome to CodeMate 🚀</h1>

    <p>
        This is my first interactive webpage.
    </p>

    <button onclick="changeText()">
        Try Me
    </button>

    <p id="message"></p>

</div>`;


    cssCode.value = `body {

    font-family: Arial, sans-serif;

    background: #f5f5ff;

    display: flex;

    justify-content: center;

    align-items: center;

    min-height: 300px;

    margin: 0;

}


.card {

    background: white;

    padding: 30px;

    border-radius: 15px;

    text-align: center;

    box-shadow:
        0 10px 30px
        rgba(0, 0, 0, 0.1);

}


h1 {

    color: #6c63ff;

}


button {

    background: #6c63ff;

    color: white;

    border: none;

    padding: 12px 22px;

    border-radius: 8px;

    cursor: pointer;

    font-weight: 600;

}


button:hover {

    opacity: 0.85;

}


#message {

    color: #555;

    font-weight: 600;

    margin-top: 18px;

}`;


    jsCode.value = `function changeText() {

    const message =
        document.getElementById("message");

    message.textContent =
        "Great! Your JavaScript is working 🎉";

}`;


    runCode();

}


/* =====================================================
   COPY CODE
   ===================================================== */

function copyCode(id) {

    const element = document.getElementById(id);


    if (!element) {
        return;
    }


    const code = element.value;


    if (code.trim() === "") {

        alert("There is no code to copy.");

        return;

    }


    /* Modern clipboard */

    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {

        navigator.clipboard
            .writeText(code)
            .then(function () {

                alert("✅ Code copied successfully!");

            })
            .catch(function () {

                fallbackCopy(code);

            });

    } else {

        fallbackCopy(code);

    }

}


/* =====================================================
   COPY FALLBACK
   ===================================================== */

function fallbackCopy(text) {

    const textarea =
        document.createElement("textarea");


    textarea.value = text;

    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";


    document.body.appendChild(textarea);


    textarea.focus();

    textarea.select();


    try {

        document.execCommand("copy");

        alert("✅ Code copied successfully!");

    } catch (error) {

        alert("❌ Unable to copy code.");

    }


    document.body.removeChild(textarea);

}


/* =====================================================
   KEYBOARD SHORTCUT
   ===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        /* Ctrl + Enter / Android external keyboard */

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            runCode();

        }

    }
);


/* =====================================================
   INITIAL OUTPUT
   ===================================================== */

window.addEventListener(
    "load",
    function () {

        if (
            htmlCode &&
            cssCode &&
            jsCode &&
            outputFrame
        ) {

            runCode();

        }
    }};

    }
);
