const {toHtml} = require('../../src/helper/markdown');

describe(' Convert Markdown to HTML', () => {
    it('should convert # to h1 element', () => {
        const md = `# Title`;

        const html = toHtml(md);

        expect(html).toMatch("<h1>Title</h1>")
    });

    it('should convert text in ** to em element', () => {
        const md = `*Content*`;

        const html = toHtml(md);

        expect(html).toMatch("<em>Content</em>")   
    });

});