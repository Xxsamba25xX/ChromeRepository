const fs = require('fs')
const path = require('path');
const execSync = require('child_process').execSync;

var whereAmI = path.parse(process.argv[1]);
var arguments = process.argv.slice(2);

var argFolderToCompile = arguments != null ? arguments[0] : "";

var queue = [];
queue.push(path.resolve(whereAmI.dir, argFolderToCompile))

var originPathInfo = path.parse(queue[0]);
var originalPath = path.resolve(originPathInfo.dir, originPathInfo.base);
var finalPath = path.resolve(originPathInfo.dir, originPathInfo.base + "_compiled");

removeFolder(finalPath);

for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    var fileInfo = getFileInfo(item)
    var itemPathInfo = path.parse(item);

    if (fileInfo != null) {
        if (fileInfo.isDirectory()) {
            folderFiles = getFiles(item)
            for (let folderFileIndex = 0; folderFileIndex < folderFiles.length; folderFileIndex++) {
                const folderFileItem = folderFiles[folderFileIndex];
                queue.push(path.resolve(item, folderFileItem))
            }
        }
        else if (fileInfo.isFile()) {
            var destination = item.replace(originalPath, finalPath);
            if (itemPathInfo.ext != ".ts") {
                copy(item, destination)
            } else {
                var relativePath = item.replace(itemPathInfo.dir, ".")
                var aux = execSync('cd "' + itemPathInfo.dir + '"' + " & " + 'tsc ' + relativePath, { stdio: 'inherit' });
                queue.push(item.substr(0, item.length - ".ts".length) + ".js")
            }
        }
    }
}


//Functions
function getFiles(folder) {
    try {
        return fs.readdirSync(folder, { WithFileTypes: true })
    } catch (err) {
        console.log(err)
        return [];
    }

}
function getFileInfo(path) {
    try {
        var aux = fs.lstatSync(path)
        return aux
    } catch (err) {
        console.log(err)
        return null;
    }
}
function copy(origin, destination) {
    var destinationPathInfo = path.parse(destination);
    createFolder(destinationPathInfo.dir)
    try {
        fs.copyFileSync(origin, destination)
    } catch (error) { }
    return getFileInfo(destination) != null
}

function createFolder(path) {
    try {
        fs.mkdirSync(path, { recursive: true })
    } catch (err) { }
}

function removeFolder(path) {
    try {
        fs.rmdirSync(path, { recursive: true })
    } catch (err) { }
}