// const emojis = ["hand", "finger", "middle finger", "hands"];

function searchEmoji(event) {
    // if (event.key !== ":") return;
    var textarea = document.getElementsByTagName("textarea")[0];
    if (!textarea) return;
    console.log(textarea.value);
    const regex = "/:/(.*)/)[1]";
    textarea.value = textarea.value.replace(":hola", "👋🏼");

    // alert(textarea);
}

document.addEventListener("keyup", searchEmoji, false);
