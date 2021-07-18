// Section Navigation
export const body = document.body;
export const settings = document.querySelector(".settings");
export const info = document.querySelector(".info");
export const infoIcon = document.querySelector(".header__info-icon");
export const creditMenu = document.querySelector(".footer__credit");
export const settingIcon = document.querySelector(".header__settings-icon");
export const levelMenu = document.querySelector(".footer__level");
export const popup = document.querySelector(".popup");
export const credits = document.querySelector(".credits");

export function updateLocal(key, val) {
  localStorage.setItem(key, val);
}

export function getLocal(key) {
  return localStorage.getItem(key);
}

function addClass(elements, classValue) {
  elements.forEach((element) => {
    if (element) {
      element.classList.add(classValue);
    }
  });
}

function removeClass(elements, classValue) {
  elements.forEach((element) => {
    if (element) {
      element.classList.remove(classValue);
    }
  });
}

function toggleClass(elements, classValue) {
  elements.forEach((element) => {
    if (element) {
      element.classList.toggle(classValue);
    }
  });
}

export function classWorker(...args) {
  let classValue = args[0];
  let classOperation = args[1];
  let elements = args.slice(2, args.length);
  if (classOperation === "add") {
    addClass(elements, classValue);
  } else if (classOperation === "remove") {
    removeClass(elements, classValue);
  } else {
    toggleClass(elements, classValue);
  }
}

export function containsClass(element, value) {
  if (element) {
    return element.classList.contains(value);
  }
  return false;
}

function nilCheck(element) {
  return element ? containsClass(element, "none") : true;
}

const viewWorkMap = {
  info: [settings, credits],
  settings: [info, credits],
  credits: [info, settings],
};

function viewWorker(view, strView) {
  let checkFlag;
  let otherTwo = viewWorkMap[strView];
  classWorker("none", "add", otherTwo[0], otherTwo[1]);
  if (containsClass(body, "not-home") && nilCheck(popup)) {
    classWorker("blur", "add", body);
    checkFlag = 1;
  } else {
    classWorker("none", "add", popup);
    checkFlag = 2;
  }
  classWorker("none", "toggle", view);
  check(checkFlag);
}

export function settingsView() {
  if (nameEditIcon.src.includes("edit-save")) {
    nameEditIcon.click();
  }
  viewWorker(settings, "settings");
}

export function infoView() {
  viewWorker(info, "info");
}

export function creditsView() {
  viewWorker(credits, "credits");
}

export function check(arg) {
  let menuItemsCheck =
    containsClass(info, "none") &&
    nilCheck(credits) &&
    containsClass(settings, "none");
  if (menuItemsCheck && containsClass(body, "blur") && arg === 1) {
    classWorker("blur", "remove", body);
  } else if (menuItemsCheck && nilCheck(popup) && arg === 2) {
    popup
      ? classWorker("none", "remove", popup)
      : console.log("no-pop-up-buddy");
  }
}

// Settings of UserName
export const nameEditIcon = document.querySelector(".settings__edit--icon");
export const nameInput = document.querySelector(".settings__input");
export const popupUsername = document.querySelector(".popup__username");
export const userChangeButton = document.querySelector(
  ".popup__button--change-user"
);

export function editName(editing) {
  if (editing) {
    classWorker("border-bottom", "add", nameInput);
    nameInput.removeAttribute("readonly");
    nameEditIcon.src = "./assets/images/edit-save.svg";
    positionCursor(nameInput);
  } else {
    classWorker("border-bottom", "remove", nameInput);
    nameInput.setAttribute("readonly", true);
    nameEditIcon.src = "./assets/images/edit.svg";
    if (nameInput.value == "") {
      nameInput.value = "Jaam";
    }
    // setUserName(nameInput.value);
    updateLocal("user", nameInput.value);
    updatePopup(nameInput.value);
    settingsView();
  }
  return !editing;
}

export function positionCursor(end) {
  let len = end.value.length;
  if (end.setSelectionRange) {
    end.focus();
    end.setSelectionRange(len, len);
  } else if (end.createTextRange) {
    let t = end.createTextRange();
    t.collapse(true);
    t.moveEnd("character", len);
    t.moveStart("character", len);
    t.select();
  }
}

export function updatePopup(value) {
  popupUsername ? (popupUsername.textContent = value) : "no-pop-up-buddy";
}

// Timer
const timeHolder = document.querySelector(".header__info--time");
let countdown;
export function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const display = seconds + " s";
  document.title = display;
  timeHolder.textContent = display;
  if (seconds == 0) {
    timeHolder.textContent = "0 s";
  }
}