import { existsSync, writeFileSync } from 'fs';

const mockFilePaths = [
	'src/lib/assets/mocks/works-list.json',
	'src/lib/assets/mocks/works-detail.json'
];

mockFilePaths.forEach((filePath) => {
	if (existsSync(filePath)) {
		console.error(`Error: File ${filePath} already exists.`);
		process.exit(1);
	} else {
		writeFileSync(filePath, '{}', 'utf8');
		console.log(`File ${filePath} has been created.`);
	}
});
