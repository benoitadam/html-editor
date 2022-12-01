export const setTitle = (title?: string) => {
    if (!title) return;
    const titleEl = document.getElementsByTagName('title')[0];
    if (titleEl) titleEl.innerText = title;
    document.title = title;
}

export default setTitle;