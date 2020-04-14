console.log("EXTENSION LOADED");

const emojis = {
    hola: "👋",
    bye: "👋",
    hello: "👋",
};

function searchEmoji(event) {
    // exit if not in Instagram Direct url
    if (!window.location.pathname.includes("direct")) return;
    var textarea = document.getElementsByTagName("textarea")[0];

    // exit if there's no textarea
    if (!textarea) return;
    const lastWordInString = textarea.value.split(" ").slice(-1)[0];

    // exit if last word in string is shorter than 2 characters to avoid triggering on ":" string
    if (lastWordInString.length < 2) {
        if (document.getElementById("emojiSuggestionsDialog"))
            document.getElementById("emojiSuggestionsDialog").remove();
        return;
    }
    var shouldShowEmojis = lastWordInString.charAt(0) == ":";

    // exit if last word doesn't start with colon
    if (!shouldShowEmojis) {
        if (document.getElementById("emojiSuggestionsDialog"))
            document.getElementById("emojiSuggestionsDialog").remove();
        return;
    }

    // search if in array
    var suggestions = {};
    var propertyNames = Object.keys(emojis).filter(function(propertyName) {
        if (propertyName.indexOf(lastWordInString.substr(1)) === 0)
            suggestions[propertyName] = emojis[propertyName];
    });
    console.log(suggestions);
    // get emoji from hashmap
    if (Object.keys(suggestions).length) {
        if (document.getElementById("emojiSuggestionsDialog")) {
            var dialogElement = document.getElementById(
                "emojiSuggestionsDialog"
            );
        } else {
            var dialogElement = document.createElement("div");
            dialogElement.id = "emojiSuggestionsDialog";
            dialogElement.style.background = "#f0f0f0";
        }
        dialogElement.innerHTML = Object.values(suggestions);
        textarea.parentElement.appendChild(dialogElement);
        // to-do: make dialog navigatable
        // to-do: replace shortcut with emoji and remove suggestions dialog
        // textarea.value = textarea.value.replace(":hola", "👋🏼");
    } else {
        console.log("REMOVE DIALOG");
        if (document.getElementById("emojiSuggestionsDialog"))
            document.getElementById("emojiSuggestionsDialog").remove();
    }
}

document.addEventListener("keyup", searchEmoji, false);
