var shell = require("shelljs");
var output = shell.exec("npm run cover",{silent:false,async:false}).output;
console.log(output);