# pboWatcher
Simple Node JS script to watch the folder of a mod for a Bohemia Interactive game and repack it when changes occur. 

Essentially you point it to your mod and forget about it. Every time you save, add a file, or anything else, it will repack it automatically for you into a PBO. 

# How to use
Install Node JS (Should work on any recent version. Tested on 10.15.0 LTS and further.)

Put the script wherever you want. 

Put this command in a bat file or manually paste this in to an administrative command prompt. Fix the paths to fit your mod/addon.
AddonFolderName refers to the folder that needs to be packed into a pbo when changes occur.
node "C:\pboWatcher.js" "C:\Program Files (x86)\Steam\steamapps\common\DayZ\\@MODNAME\Addons" "AddonFolderName"

Run it. 
