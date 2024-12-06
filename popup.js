document.addEventListener("DOMContentLoaded", () => {
  const emojiListContainer = document.getElementById("emoji-list");
  const textArea = document.getElementById("tab-name");
  const renameButton = document.getElementById("rename-tab");

  let selectedEmoji = ""; // 選択された絵文字

  // 絵文字リストを描画
  function renderEmojiList(emojiList) {
    emojiListContainer.innerHTML = ""; // コンテナをクリア
    emojiList.forEach((emoji) => {
      const emojiItem = document.createElement("div");
      emojiItem.textContent = emoji;
      emojiItem.classList.add("emoji-item");
      emojiItem.addEventListener("click", () => {
        document
          .querySelectorAll(".emoji-item")
          .forEach((item) => item.classList.remove("selected"));
        emojiItem.classList.add("selected");
        selectedEmoji = emoji;
      });
      emojiListContainer.appendChild(emojiItem);
    });
  }

  // 初期描画
  getEmojiList((emojiList) => {
    renderEmojiList(emojiList);
  });

  // リネーム処理
  async function renameTab() {
    const newText = textArea.value.trim();
    // if (!newText) {
    //   alert("Please enter a new tab name.");
    //   return;
    // }

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tab && tab.id) {
        const fullTitle = `${selectedEmoji} ${newText}`.trim();
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (title) => {
            document.title = title;
          },
          args: [fullTitle],
        });
        window.close(); // ポップアップを閉じる
      }
    } catch (error) {
      console.error("Error updating tab title:", error);
      alert("This page does not allow title updates.");
    }
  }

  // ボタンのクリックイベント
  renameButton.addEventListener("click", renameTab);
  // Enterキーでリネーム処理を実行
  textArea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Enterキーのデフォルト動作を無効化（改行防止）
      renameTab(); // リネーム処理を実行
    }
  });
  textArea.focus(); // テキストエリアにフォーカスを当てる
});
