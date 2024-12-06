document.addEventListener("DOMContentLoaded", () => {
    const emojiListInput = document.getElementById("emoji-list-input");
    const saveButton = document.getElementById("save-settings");
    const resetButton = document.getElementById("reset-to-default");

    // 現在の絵文字リストをテキストエリアに表示
    getEmojiList((emojiList) => {
        emojiListInput.value = emojiList.join(", ");
    });

    // 絵文字リストを保存
    saveButton.addEventListener("click", () => {
        const newList = emojiListInput.value
            .split(",")
            .map((emoji) => emoji.trim())
            .filter((emoji) => emoji); // 空白を除去
        saveEmojiList(newList.slice(0, 20)); // 最大20個に制限
        alert("Emoji list saved!");
    });
    // デフォルトリストにリセット
    resetButton.addEventListener("click", () => {
        saveEmojiList(defaultEmojiList); // デフォルトリストを保存
        emojiListInput.value = defaultEmojiList.join(", "); // テキストエリアも更新
    });
});
