import Compiler from './compiler';
import ArgHandler from './argHandler';
import fs from 'fs';

export function run() {
	const argHandler 	= new ArgHandler();
	const compiler 		= new Compiler();
	const settings 		= argHandler.processArgs();

	if (__DEV__) {
		console.log("User settings:", JSON.stringify(settings));
	}

	compiler.generateFiles(settings);	

	fs.watch(settings.src, (event, filename) => {
		console.log(__filename);
		console.log(event);
		console.log(filename);
	});
}