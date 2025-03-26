// llmに食わせるためにサイトから内容を抜き取り文字列にする

(async () => {
  const elm = document.querySelector("main");

  if (elm === null) {
    window.alert("main element not found");
    return;
  }

  const text = elm.innerText
    .replace(/[\n\r]/g, "")
    // .replace(/ +/g, ' ')
    .trim();

  await navigator.clipboard.writeText(text);
})();
