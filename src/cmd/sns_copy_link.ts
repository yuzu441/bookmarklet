(async (): Promise<void> => {
  const title = document.title;
  const url = location.href;

  const mdLink = `${title} - ${url}`;

  await navigator.clipboard.writeText(mdLink);
})();
