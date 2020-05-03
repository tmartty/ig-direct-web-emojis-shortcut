console.log("EXTENSION LOADED");

var typedShortcut;
var suggestions = new Set();

const emojis = new Map();
emojis.set("👋", "bye hola");
emojis.set("🚀", "rocket");
emojis.set("🏠", "house casa");

function removeSuggestions() {
    if (document.getElementById("emojiSuggestionsDialog"))
        document.getElementById("emojiSuggestionsDialog").remove();
    suggestions = new Set();
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

    // search if in array
    emojis.forEach((possibleValues, emoji) => {
        if (possibleValues.indexOf(lastWordInString.substr(1)) !== -1) {
            if (!suggestions.has(emoji)) suggestions.add(emoji);
        } else {
            suggestions.delete(emoji);
        }
    });

    console.log("Suggestions :", suggestions);

    // get emoji from hashmap
    if (suggestions.size) {
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
        textarea.parentElement.appendChild(dialogElement);
        // remove old existing suggestion btns if they are no longer valid
        var existingEmojiButtons = document.querySelectorAll('*[id^="emoji-"]');
        existingEmojiButtons.forEach((existingEmojiButton) => {
            if (!suggestions.has(existingEmojiButton.innerHTML))
                existingEmojiButton.remove();
        });
        // iterate over suggestions and create the suggestion btn if it doesnt already existe
        suggestions.forEach((emoji) => {
            if (document.getElementById(`emoji-${emoji}`)) {
                return;
            } else {
                var button = document.createElement("button");
                button.id = `emoji-${emoji}`;
                button.innerHTML = emoji;
                button.style.border = "none";
                button.style.height = "35px";
                button.style.width = "35px";
                button.style.padding = "0px";
                button.onclick = function() {
                    textarea.value = textarea.value.replace(
                        textarea.value.split(" ").slice(-1)[0],
                        emoji + " "
                    );
                    removeSuggestions();
                    textarea.focus();
                };
                dialogElement.appendChild(button);
            }
        });
    } else {
        removeSuggestions();
    }
}

document.addEventListener("keyup", searchEmoji, false);
