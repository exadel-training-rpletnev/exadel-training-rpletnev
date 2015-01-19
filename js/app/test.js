var request = new XMLHttpRequest();
request.open("GET", "quizz-data.json", false);
request.send(null);
tests = JSON.parse(request.responseText);
currentTest = 0;
currentQuestion = 0;

function displayTest(testID)
{
    switchMode("test");

    currentTest = testID;
    var test = tests[currentTest];
    var title = document.getElementById("chapterTitle");
    title.innerHTML = test.title;

    var description = document.getElementById("chapterDesсription");
    description.innerHTML = "(" + test.description + ")";

    var buttons = document.getElementById("questionButtons");
    while (buttons.firstChild) {
        buttons.removeChild(buttons.firstChild);
    }
    for (var i=0; i<test.questions.length; i++) {
        var button = document.createElement("a");
        button.href = "?test=" + (currentTest + 1) + "&question=" + (i + 1);
        button.className = "questionButton";
        button.innerHTML = i + 1;
        button.id = i;
        buttons.appendChild(button);
    }
}

function displayQuestion(questionID)
{
    document.getElementById(currentQuestion).classList.remove("questionButtonSelected");
    currentQuestion = questionID;
    document.getElementById(questionID).classList.add("questionButtonSelected");
    var question = tests[currentTest].questions[currentQuestion];
    var testQuestion = document.getElementById("testQuestion");
    testQuestion.innerHTML = question.question + "   (right: " + question.right + ")";

    var img = document.getElementById("testImg");
    img.src = question.questionImg;
    if (question.questionImg != null)
        img.className = "image";
    else
        img.className = "noImage";

    var answers = document.getElementById("testAnswers");
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild);
    }
    for (var i=0; i<question.answers.length; i++) {
        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "group1";
        radio.value = i;
        radio.id = "r" + i;
        var label = document.createElement("label");
        label.htmlFor = radio.id;
        label.className = "radio";
        label.innerHTML = question.answers[i];
        answers.appendChild(radio);
        answers.appendChild(label);
        answers.appendChild(document.createElement("br"));
    }

    var qButton = document.getElementById("b" + questionID);
}

function switchMode(mode)
{
    if (mode == "selection")
    {
        document.getElementById("questionDiv").className = "hiddenDiv";
        document.getElementById("testDiv").className = "pageDiv";
    }
    else if (mode == "tests")
    {
        document.getElementById("questionDiv").className = "pageDiv";
        document.getElementById("testDiv").className = "hiddenDiv";
    }
}

function displayTestsList()
{
    var testDiv = document.getElementById("testDiv");
    while (testDiv.firstChild) {
        testDiv.removeChild(testDiv.firstChild);
    }

    for (var i=0; i<tests.length; i++) {
        var link = document.createElement("a");
        link.href = "?test=" + (i + 1) + "&question=1";
        link.className = "testButton";
        link.innerHTML = "<p>" + tests[i].title + "</p>";
        testDiv.appendChild(link);
    }
}

function displayDefaultPage()
{
    //displayTest(0);
    //displayQuestion(0);
    switchMode("selection");
    displayTestsList();
}

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return null;
}

function router()
{
    var testID = getQueryVariable("test");
    if ((testID == null) || (testID == 0))
        displayDefaultPage();
    else
    {
        displayTest(testID - 1);
        var questionID = getQueryVariable("question");
        if (questionID != null)
            displayQuestion(questionID - 1);
        else
            displayQuestion(1);
    }
}

window.onhashchange = router();
