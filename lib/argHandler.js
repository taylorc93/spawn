/* ArgHandler
 * Written by Connor Taylor
 * This class handles reading in the command line arguments
 * given by the user.  It also figures out how to respond to them
 * if neccessary (eg. -h is passed for help)
 */
import parseArgs from 'minimist';

export default class ArgHandler {
	constructor() {
		this.settings = {};
	}

	// Parses process.argv to a more usable structure
	// Currently uses minimist
	_parse() {
		return parseArgs(process.argv.slice(2));
	}

	processArgs() {
		const args = this._parse();
		delete args._

		if (args.h || args.help) {
			this.printHelp();
			return;
		}
		
		Object.keys(args).forEach((key) => {
			console.log(key);
			if (key === "c" || key === "--config") {
				this.settings.config = args[key];
				return;
			}
			if (key === 's' || key === '--src') {
				this.settings.src = args[key];
			}
		});

		return this.settings;
	}

	printHelp() {
		console.log('spawn - A better boilerplate generator');
		console.log('Options:')
		console.log('\t -c, --config \t relative path to the config file');
		console.log('\t -s, --src \t relative path to the directory to watch')
		console.log('\t -h, --help \t print help info');
	}

}