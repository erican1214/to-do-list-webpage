const taskList = document.getElementsByClassName("task");
const completedTaskList = document.getElementsByClassName("completedTask");

const section = document.getElementsByClassName("section");
const removeButton = document.getElementsByClassName("removeButton");
const addTaskButton = document.getElementById("addTaskButton");

let image = document.getElementById("image");
let error = document.getElementById("error");

const xavierImages = {
    "default": "assets/images/xavier_default.webp",
    "happy": "assets/images/xavier_happy.webp",
    "sad": "assets/images/xavier_sad.webp",
    "sleepy": "assets/images/xavier_sleepy.webp"
};

let musicIcon = document.getElementById("musicIcon");
let audioIcon = document.getElementById("audioIcon");
const musicButton = document.getElementById("musicButton");
const audioButton = document.getElementById("audioButton");
const backgroundMusic = document.getElementById("backgroundMusic");

const musicImages = {
    "muted": "assets/images/muted_music_icon.png",
    "unmuted": "assets/images/music_icon.png"
};

const audioImages = {
    "muted": "assets/images/muted_audio_icon.png",
    "unmuted": "assets/images/audio_icon.png"
};

const clearCurrentButton = document.getElementById("clearCurrentButton");
const clearCompletedButton = document.getElementById("clearCompletedButton");

/*
    Adds task to list.
    Since task is only added if there is no error,
    the error message is cleared if there was one
    previously
*/
function addTask(taskMsg) {
    error.innerHTML = "";
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].innerHTML === "") {
            taskList[i].innerHTML = taskMsg;
            section[i % (section.length/2)].style.display = "flex";
            break;
        }
    }
    addCurrentToLocal();
}

/* 
    Makes sure there are no dupicate tasks,
    even if they are in different casing
*/
function compareTask(taskMsg) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].innerHTML.toLowerCase() === taskMsg.toLowerCase()) {
            return true;
        }
    }
    return false;
}

/* 
    Removes the task the user clicked.
    Calls function reOrganize() to reogranize current task list.
    Calls function moveToComplete() to move finished/removed task
    to the completed task list.
    Calls changeImage("happy") to change the character image to
    "happy" to indicate the user did a good job
*/
function removeTask(taskNum) {
    const finishedTask = taskList[taskNum].innerHTML;
    taskList[taskNum].innerHTML = "";
    section[taskNum % (section.length / 2)].style.display = "none";
    reOrganize(taskNum);
    moveToComplete(finishedTask, 0);
    changeImage("happy");
}

/*
    Shifts the bottom tasks up if a task in the middle of the list
    was removed
*/
function reOrganize(taskNum) {
    for (let i = taskNum; i < taskList.length-1; i++) {
        if (taskList[i].innerHTML === "" && taskList[i+1].innerHTML === "") {
            break;
        }
        else {
            taskList[i].innerHTML = taskList[i+1].innerHTML;
            section[i % (section.length/2)].style.display = "flex";
            taskList[i+1].innerHTML = "";
            section[(i+1) % (section.length/2)].style.display = "none";
        }
    }
    addCurrentToLocal();
}

/*
    Moves the finished/removed task to the top of completed section.
    Shifts the older completed tasks down recursively
*/
function moveToComplete(finishedTask, num) {
    let currTask = completedTaskList[num].innerHTML;
    if (num == completedTaskList.length) {
        addCompletedToLocal();
        return;
    }
    else if (currTask === "") {
        completedTaskList[num].innerHTML = finishedTask;
        section[num + (section.length/2)].style.display = "flex";
        addCompletedToLocal();
        return;
    }
    else {
        completedTaskList[num].innerHTML = finishedTask;
        section[num + (section.length/2)].style.display = "flex";
        moveToComplete(currTask, num+1);
    }
}

/*
    Changes expression of the character image depending on parameter
    "expression," waits 3 seconds, then changes back to default image
*/
function changeImage(expression) {
    image.src = xavierImages[expression];
    setTimeout(event => {
        image.src = xavierImages["default"];
    }, 3000);
}

/*
    Checks for bonus words and changes character image based on bonus word
*/
function checkBonusWords(taskMsg) {
    lowercaseMsg = taskMsg.toLowerCase();
    if (lowercaseMsg.includes("sleep")) {
        changeImage("sleepy");
    }
}

/*
    Plays music if music is muted, and mutes music if music is playing
    Updates music icon and tooltip based on state of music
*/
function playOrMuteMusic() {
    if (backgroundMusic.muted) {
        musicIcon.src = musicImages["unmuted"];
        backgroundMusic.muted = false;
        backgroundMusic.play();
        backgroundMusic.volume = 0.2;
        musicButton.dataset.title = "Mute music?";
    }
    else {
        musicIcon.src = musicImages["muted"];
        backgroundMusic.muted = true;
        backgroundMusic.pause();
        musicButton.dataset.title = "Play music?";
    }
}

/*
    Clears either current or completed task list based on parameter
    "list"
    Hides each task section and clears innerHTML of each task
*/
function clearTasks(list) {
    if (list === "current") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList.innerHTML === "") {
                break;
            }
            taskList[i].innerHTML = "";
            section[i].style.display = "none";
            localStorage.removeItem("current" + i);
        }
    }
    else {
        for (let i = 0; i < completedTaskList.length; i++) {
            if (completedTaskList.innerHTML === "") {
                break;
            }
            completedTaskList[i].innerHTML = "";
            section[i + (section.length/2)].style.display = "none";
            localStorage.removeItem("completed" + i);
        }
    }
}

/*
    Functions to save tasks to locally even when user refreshes/closes tab
    Removes unneccessary local items as task list is reorganized
*/
function addCurrentToLocal() {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].innerHTML != "") {
            localStorage.setItem("current" + i, taskList[i].innerHTML);
        }
        else if (localStorage.getItem("current" + i) != null) {
            localStorage.removeItem("current" + i);
        }
    }
}

function addCompletedToLocal() {
    for (let i = 0; i < completedTaskList.length; i++) {
        if (completedTaskList[i].innerHTML != "") {
            localStorage.setItem("completed" + i, completedTaskList[i].innerHTML);
        }
        else if (localStorage.getItem("completed" + i) != null) {
            localStorage.removeItem("completed" + i);
        }
    }
}

/*
    Function to display saved tasks on the page
*/
function loadLocalTasks() {
    for (let i = 0; i < taskList.length; i++) {
        let tempTask = localStorage.getItem("current" + i);
        if (tempTask != null) {
            taskList[i].innerHTML = tempTask;
            section[i].style.display = "flex";
        }
        else {
            break;
        }
    }

    for (let i = 0; i < completedTaskList.length; i++) {
        let tempTask = localStorage.getItem("completed" + i);
        if (tempTask != null) {
            completedTaskList[i].innerHTML = tempTask;
            section[i + (section.length/2)].style.display = "flex";
        }
        else {
            break;
        }
    }
}

/*
    Below are the added button event listeners and their functions
*/
if (addTaskButton) {
    addTaskButton.addEventListener("click", event => {
        const taskMsg = document.getElementById("taskMsg");
        const newTaskMsg = taskMsg.value.trim();
        if (newTaskMsg === "") {
            error.innerHTML = "Can't submit an empty task!";
            changeImage("sad");
        }
        else if (taskList[taskList.length-1].innerHTML != "") {
            error.innerHTML = "Can't have more than " + taskList.length + " tasks!";
            changeImage("sad");
        }
        else if (compareTask(newTaskMsg)) {
            error.innerHTML = "You already have this task in the list!";
            changeImage("sad");
        }
        else {
            addTask(newTaskMsg);
            checkBonusWords(newTaskMsg);
        }
    })
}

if (removeButton) {
    for (let i = 0; i < removeButton.length; i++) {
        removeButton[i].addEventListener("click", event => {
            removeTask(i)
        });
    }
}

if (musicButton) {
    musicButton.addEventListener("click", event => {
        playOrMuteMusic();
    });
}

if (clearCurrentButton) {
    clearCurrentButton.addEventListener("click", event => {
        clearTasks("current");
    })
}

if (clearCompletedButton) {
    clearCompletedButton.addEventListener("click", event => {
        clearTasks("completed");
    })
}

/* 
    Runs function when window loads
*/
window.onLoad = loadLocalTasks();