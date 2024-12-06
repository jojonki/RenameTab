// デフォルトの絵文字リスト
const defaultEmojiList = [
  // パーティ・イベント関連
  "🎉", "🎆", "🎈", "🎂", "🎁", "🎤", "🎧", "🥳", "🎨", "💥",

  // 食べ物・飲み物関連
  "🍎", "🍕", "🍔", "🍣", "🍩", "🍫", "🍿", "🍺", "🥤", "🥗",

  // スポーツ・趣味関連
  "🏀", "⚽", "🏓", "🏸", "🎮", "🎸", "🎯", "🛹", "🏋️", "🎳",

  // 日常・生活関連
  "🏡", "🚗", "✈️", "⛵", "💡", "🔑", "📱", "💻", "📦", "📅",

  // 実験関連
  "🔬", "🧪", "⚗️", "🧬", "🔭", "💣", "⚠️", "🔋", "📡", "🛠️",

  // 動物関連
  "🐶", "🐱", "🦁", "🐘", "🐦", "🐟", "🐾", "🐢", "🐍", "🦋",

  // その他
  "❤️", "💔", "🔥", "🌈", "⭐", "🌟", "⚡", "❄️", "☀️", "☔"
];



// 絵文字リストを保存
function saveEmojiList(newList) {
  chrome.storage.local.set({ emojiList: newList }, () => {
    console.log("Emoji list saved:", newList);
  });
}

// 絵文字リストを取得
function getEmojiList(callback) {
  chrome.storage.local.get("emojiList", (data) => {
    callback(data.emojiList || defaultEmojiList); // 保存されていなければデフォルトを返す
  });
}
