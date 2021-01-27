const wallpaper = require('wallpaper');
const wifiPassword = require('wifi-password');
const clipboardy = require('clipboardy');

const WindowsTrayicon = require("windows-trayicon");
const path = require("path");
const fs = require("fs");

const picpath = __dirname + '\\wallpapers\\';

const myPicList = fs.readdirSync(picpath, function (err, filesRead) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
});
//console.log(myPicList);

const myTrayApp = new WindowsTrayicon({
	title: "Ramayac Desktop Utils",
	icon: path.resolve(__dirname, "icon.ico"),
	menu: [
		{
			id: "item-next-wallpaper",
			caption: "Next Random Wallpaper"
		},
		{
			id: "item-wifi-password",
			caption: "Wifi password"
		},
		{
			id: "item-exit",
			caption: "Exit"
		}
    ]
});

myTrayApp.item((id) => {
	//console.log(`Menu id selected=${id}`);
	switch (id) {
		/*case "item-1-id": {
			console.log("First item selected...");
			break;
        }*/
        case "item-next-wallpaper": {
            //console.log(myPicList);
            let pic = myPicList[Math.floor(Math.random() * myPicList.length)];
            //console.log("selected pic is: " + pic);

            wallpaper.set(picpath + pic);
            wallpaper.get();
			break;
        }
		case "item-wifi-password": {
			var wifiPwd = "this is a test";
			wifiPassword().then(wifiPwd => {
				//console.log(wifiPwd);
				//=> 'its a secret!!!'
				myTrayApp.balloon("Wifi password is...", wifiPwd).then(() => {
					//console.log("Balloon clicked, pwd clipboardy :)");
					clipboardy.writeSync(wifiPwd);
				})
			});
			break;
		}
		case "item-exit": {
			myTrayApp.exit();
			process.exit(0)
			break;
		}
	}
});

process.stdin.resume()
