const fs = require("fs");

function done(output) {
	process.stdout.write(output);
	process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
	const userInputArray = userInput.split(" ");
	const command = userInputArray[0];

	switch (command) {
		case "echo":
			commandLibrary.echo(userInputArray.slice(1).join(" "));
			break;
		case "cat":
			commandLibrary.cat(userInputArray.slice(1));
			break;
		case "sort":
			commandLibrary.sort(userInputArray.slice(1));
			break;
		case "wc":
			commandLibrary.wc(userInputArray.slice(1));
			break;
		case "head":
			commandLibrary.head(userInputArray.slice(1));
			break;
		case "tail":
			commandLibrary.tail(userInputArray.slice(1));
			break;
		default:
			done("Error: Command not found");
	}
}

const commandLibrary = {
	"echo": function(userInput) {
		done(userInput);
	},
	"cat": function(fullPath) {
		const fileName = fullPath[0];
		fs.readFile(fileName, (err, data) => {
			if (err) throw err;
			done(data);
		});
	},
	"sort": function(fullPath) {
		const fileName = fullPath[0];
		fs.readFile(fileName, 'utf8', (err, data) => {
			if (err) throw err;
			done(data.split("\n").sort().join("\n"));
		});
	},
	"wc": function(fullPath) {
		const fileName = fullPath[0];
		fs.readFile(fileName, 'utf8', (err, data) => {
			if (err) throw err;
			const newLineCount = data.split("\n").length-1;
			const wordCount = data.split(/\s+/).length-1;
			const byteCount = data.length;
			done("   " + newLineCount + "   " + wordCount + "   " + byteCount + " " + fileName);
		});
	},
	"head": function(fullPath) {
		const fileName = fullPath[0];
		fs.readFile(fileName, 'utf8', (err, data) => {
			if (err) throw err;
			done(data.split("\n").slice(0, 10).join("\n"));
		});
	},
	"tail": function(fullPath) {
		const fileName = fullPath[0];
		fs.readFile(fileName, 'utf8', (err, data) => {
        	if (err) throw err;
           	done(data.split("\n").slice(-10).join("\n"));
        });
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
