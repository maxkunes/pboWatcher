/*
Created by https://github.com/maxkunes

Example script launch:
node "C:\pboWatcher.js" "C:\Program Files (x86)\Steam\steamapps\common\DayZ\@MODNAME\Addons" "AddonFolderName"
*Note the lack of a slash after Addons*

AddonFolderName is the name of the folder that exists in the @Mod\Addons\ path which is normally packed into a pbo.

Script assumes the package chokidar is installed and accessible. This is used to watch the directory for changes.
Script assumes the package node-notifier is installed and accessible. This is used to do crossplatform toasts on packing. (Notifications)
Script also assumes PBO manager is installed in the C:\\ drive. Feel free to change the path to your PBOManager installation on line 38.
Zero error checking is done due to PBO Manager providing little to zero output when something goes wrong. 
*/

var chokidar = require('chokidar');
var exec = require('child_process').exec;
const notifier = require('node-notifier');



function execute(command, callback) { // https://stackoverflow.com/questions/12941083/execute-and-get-the-output-of-a-shell-command-in-node-js
    exec(command, function(error, stdout, stderr) {
        callback(stdout);
    });
};

function sleep(n) { // https://www.npmjs.com/package/sleep
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}


var addonDirectory = process.argv[2];
var addonName = process.argv[3];
var directoryToWatch = addonDirectory + '\\' + addonName;

var lastNotificationTime = 0;

chokidar.watch(directoryToWatch).on('all', (event, path) => {

    sleep(100); //Necessary to stop pbomanager from trying to access files while one is already being packed. Increase the '100' here if you are getting errors regarding pbomanager trying to pack a file that is already open.
    
    console.log(path + ' changed, repacking.');

    var packCommand = `\"C:\\Program Files\\PBO Manager v.1.4 beta\\PBOConsole.exe\" -pack "${directoryToWatch}" "${addonDirectory + '\\' +  addonName}.pbo"`;

    execute(packCommand, function(name) {});

   if((new Date()).getSeconds() - lastNotificationTime > 10) {
    notifier.notify({
        title: 'PBO Watcher Notification!',
        message: 'A file has changed. The PBO has been repacked!'
      });
    lastNotificationTime = (new Date()).getSeconds();
   }

    
});
