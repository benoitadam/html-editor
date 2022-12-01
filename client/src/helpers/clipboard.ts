let _textarea: HTMLTextAreaElement | undefined = undefined;

function clipboardTextarea() {
  if (_textarea) return _textarea;
  _textarea = document.createElement('textarea');
  _textarea.id = 'copy-textarea';
  Object.assign(_textarea.style, {
    border: '0',
    padding: '0',
    margin: '0',
    position: 'absolute',
    left: '-9999px',
    width: '100px',
    height: '100px',
    opacity: '0',
  });
  _textarea.setAttribute('readonly', '');
  document.body.appendChild(_textarea);
  return _textarea;
}

export function clipboardPaste(): string | null {
  const textarea = clipboardTextarea();
  textarea.select();
  try {
    (document as any).execCommand('paste');
    textarea.blur();
    return textarea.value;
  } catch (error) {
    console.warn('copy error', error);
  }
  textarea.blur();
  return null;
}

export function clipboardCopy(value: string) {
  const textarea = clipboardTextarea();
  textarea.value = value;
  textarea.select();
  try {
    (document as any).execCommand('copy');
  } catch (error) {
    console.warn('copy error', error);
  }
  textarea.blur();
  return value;
}

export function clipboardCopyJson(value: any) {
  try {
    clipboardCopy(JSON.stringify(value, null, 2));
  } catch (error) {
    console.warn('copy error', error);
  }
}

export function clipboardPasteJson() {
  try {
    return JSON.parse(clipboardPaste() || 'null');
  } catch (e) {
    return null;
  }
}