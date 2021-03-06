function getScrollHeight(elm) {
  var savedValue = elm.value;
  elm.value = '';
  elm._baseScrollHeight = elm.scrollHeight;
  elm.value = savedValue;
}

export function onExpandableTextareaInput({ target: elm }) {
  // make sure the input event originated from a textarea and it's desired to be auto-expandable
  if (!elm.classList.contains('autoExpand') || !elm.nodeName === 'TEXTAREA')
    return;

  var minRows = elm.getAttribute('data-min-rows') | 0,
    rows;
  !elm._baseScrollHeight && getScrollHeight(elm);
  const fontsize = window.getComputedStyle(elm).fontSize;
  elm.rows = minRows;
  console.log(fontsize);
  rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 12);
  elm.rows = minRows + rows;
}

// global delegated event listener
