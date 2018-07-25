#!/usr/bin/env node

const copy = require('graceful-copy')
var inquirer = require('inquirer')
var path = require('path')
var program = require('commander')
var fs = require('fs');

program
  .usage('[options] <file>')
  .option('-b, --base', 'Base Template Class')
  .parse(process.argv)

var templateName = program.args.shift() || null

const folderName = '.' // program.args.shift() || '.'
const templatesPath = path.join(__dirname, 'templates')
const destinationPath = path.resolve(folderName)

if ( null === templateName ) {
    console.log('Template name must be provided')
    process.exit(1);
}

 inquirer.prompt([{
            type: "confirm",
            message: `Are you sure you want to create "${templateName}" ?`,
            name: "confirmed",
            default: true
        }])
        .then((answers) => {
            if (answers.confirmed) {
                return finalize()
            }
            return false;
        })
        
var dataReplace = {
    title: titleCase(templateName),
    name: templateName
}
        
function finalize() {
    copy(templatesPath, destinationPath, {clean: false, data: dataReplace })
        .then(files => {
            console.log('Files Coped to: ', destinationPath)
            console.log(files)
            
                        
            fs.rename(files[0], `${destinationPath}/${templateName}.element.js`, function(err) {
                if ( err ) console.log('ERROR: ' + err);
            });
            
        }).catch(err => {
            console.log(err.stack)
        })
    return true
}


function titleCase(string) {
    if (!string) {
        return;
    }
    var words = string.split('-');
    var output = "";
    for (var i = 0, l = words.length; i < l; ++i) {
        output += words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return output;
}