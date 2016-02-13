import xmlParser from 'xml2js';
import fs from 'fs';
import { onError } from 'utils/helpers';

export default class Compiler {


	// Called by parseSpawnFile after the xml has been parsed.
	// Recursive function that injects its templated code into
	// the file
	compileTemplate(parsedXML) {
		const templateName 	= Object.keys(parsedXML)[0];
		const subtree 			= parsedXML[templateName];
		let 	options 			= {};

		// '$' key holds properties of each xml node if there are any
		Object.keys(subtree).forEach((key) => {
			if (key === '$') {
				options = Object.assign(options, subtree[key]);
			}
		});

		return "";
	}

	// Given a raw xml string, parses the content and returns the compiled
	// template to write to the output directory
	parseSpawnFile(xmlString) {
		return new Promise((resolve, reject) => {
			xmlParser.parseString(xmlString, (err, result) => {
				if (err) {
					console.error("Invalid xml string: ", err);
					reject();
				} else {
					// Compile spawn file to templated code
					const compiledTemplate = this.compileTemplate(result);
					resolve(compiledTemplate);
				}
			});
		});
	}

	// Given a users settings for the input and output directories,
	// reads in all of the files and for each spawn file, parses it
	// and writes the compiled template to the output directory
	generateFiles(settings) {
		fs.readdir(settings.src, (err, filenames) => {
			if (err) {
				onError(settings.src);
				return;
			}

			filenames.forEach((filename) => {
				const fileType = filename.split('.').pop();

				if (fileType === 'spawn') {
					fs.readFile(settings.src + filename, (err, content) => {
						if (err) {
							onError(settings.src + filename);
						}

						this.parseSpawnFile(content).then((fileString) => {
							console.log(fileString);
						});
					});
				}
			});
		});
	}
}