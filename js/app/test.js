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
    document.getElementById(currentQuestion).className = "questionButton";
    currentQuestion = questionID;
    document.getElementById(questionID).className = "questionButton questionButtonSelected";
    var question = tests[currentTest].questions[currentQuestion];
    var testQuestion = document.getElementById("testQuestion");
    testQuestion.innerHTML = question.question;

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
        radio.id = i;
        var label = document.createElement("label");
        label.htmlFor = radio.id;
        label.className = "radio";
        label.innerHTML = question.answers[i];
        answers.appendChild(radio);
        answers.appendChild(label);
        answers.appendChild(document.createElement("br"));
    }
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

function displayDefaultPage()
{
    displayTest(0);
    displayQuestion(0);
    //switchMode("selection");
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
