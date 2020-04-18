console.log("EXTENSION LOADED");

var typedShortcut;
var suggestions = {};

const emojis = {
    hola: "👋",
    rocket: "🚀",
    house: "🏠",
};

function removeSuggestions() {
    if (document.getElementById("emojiSuggestionsDialog"))
        document.getElementById("emojiSuggestionsDialog").remove();
    suggestions = {};
}

function searchEmoji(event) {
    // exit if not in Instagram Direct url
    if (!window.location.pathname.includes("direct")) return;
    var textarea = document.getElementsByTagName("textarea")[0];
    // exit if there's no textarea
    if (!textarea) return;
    const lastWordInString = textarea.value.split(" ").slice(-1)[0];

    // exit if last word in string is shorter than 2 characters to avoid triggering on ":" string
    if (lastWordInString.length < 2) {
        removeSuggestions();
        return;
    }
    var shouldShowEmojis = lastWordInString.charAt(0) == ":";

    // exit if last word doesn't start with colon
    if (!shouldShowEmojis) {
        removeSuggestions();
        return;
    }

    // exit if other keys were pressed but the string remains the same. For example when pressing Tab
    if (typedShortcut && typedShortcut === lastWordInString.substr(1)) return;
    typedShortcut = lastWordInString.substr(1);

    var newSuggestions = {};

    // search if in array
    Object.keys(emojis).forEach((propertyName) => {
        if (
            propertyName.indexOf(lastWordInString.substr(1)) === 0 &&
            typeof suggestions[propertyName] == "undefined"
        ) {
            suggestions[propertyName] = emojis[propertyName];
            newSuggestions[propertyName] = emojis[propertyName];
        }
    });

    console.log(suggestions);
    console.log(newSuggestions);

    // to-do: remove suggestions when they are no longer valid

    // get emoji from hashmap
    if (Object.keys(newSuggestions).length) {
        var dialogElement;
        if (document.getElementById("emojiSuggestionsDialog")) {
            dialogElement = document.getElementById("emojiSuggestionsDialog");
        } else {
            dialogElement = document.createElement("div");
            dialogElement.id = "emojiSuggestionsDialog";
            dialogElement.style.background = "#f0f0f0";
            dialogElement.style.display = "flex";
            dialogElement.style["flex-direction"] = "row";
        }

        Object.values(newSuggestions).forEach((emoji) => {
            var button = document.createElement("button");
            button.innerHTML = emoji;
            button.onclick = function() {
                textarea.value = textarea.value.replace(
                    textarea.value.split(" ").slice(-1)[0],
                    emoji + " "
                );
                removeSuggestions();
                textarea.focus();
            };
            dialogElement.appendChild(button);
        });
        textarea.parentElement.appendChild(dialogElement);
    } else {
        var shouldRemoveDialog = true;
        Object.keys(suggestions).forEach((propertyName) => {
            if (propertyName.indexOf(lastWordInString.substr(1)) === 0) {
                shouldRemoveDialog = false;
            }
        });
        if (shouldRemoveDialog) {
            console.log("REMOVE DIALOG");
            removeSuggestions();
        }
    }
}

document.addEventListener("keyup", searchEmoji, false);
