export function extractHeadingsFromHTML(html) {
  const div = document.createElement('div');
  div.innerHTML = html;

  const headings = div.querySelectorAll('h1, h2, h3');
  const toc = [];

  headings.forEach((heading, index) => {
    let text = heading.innerText || heading.textContent;
    let slug = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    
    // Assign unique ID to heading
    heading.id = slug + '-' + index;

    toc.push({ id: heading.id, text, tag: heading.tagName });
  });

  return { toc, htmlWithIds: div.innerHTML };
}
