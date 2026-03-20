import { existsSync, writeFileSync } from 'fs';

const mockFiles = [
	{
		path: 'src/lib/assets/mocks/works-list.json',
		content: {
			contents: []
		}
	},
	{
		path: 'src/lib/assets/mocks/works-detail.json',
		content: {}
	}
];

mockFiles.forEach(({ path, content }) => {
	if (existsSync(path)) {
		console.log(`Skip: File ${path} already exists.`);
		return;
	}

	writeFileSync(path, JSON.stringify(content, null, '\t'), 'utf8');
	console.log(`File ${path} has been created.`);
});
