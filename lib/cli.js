import Compiler from './compiler';
import fs from 'fs';

export function run() {
	const compiler = new Compiler();
	compiler.run();
	fs.watch('lib', (event, filename) => {

	});
}