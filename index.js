const wallpaper = require('wallpaper');
const wifiPassword = require('wifi-password');
const clipboardy = require('clipboardy');
const brightness = require('brightness');
const internalIp = require('internal-ip');

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
			id: "item-brightness-100",
			caption: "Brightness 100%"
		},
		{
			id: "item-brightness-80",
			caption: "Brightness 80%"
		},
		{
			id: "item-brightness-50",
			caption: "Brightness 50%"
		},
		{
			id: "item-brightness-0",
			caption: "Brightness 0%"
		},
		{
			id: "item-internal-ip-v4",
			caption: "Internal IP V4"
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
		case "item-brightness-100": {
			brightness.set(1.00);
			break;
		}
		case "item-brightness-80": {
			brightness.set(0.80);
			break;
		}
		case "item-brightness-50": {
			brightness.set(0.50);
			break;
		}
		case "item-brightness-0": {
			brightness.set(0.0);
			break;
        }
        case "item-next-wallpaper": {
            //console.log(myPicList);
            let pic = myPicList[Math.floor(Math.random() * myPicList.length)];
            //console.log("selected pic is: " + pic);

            wallpaper.set(picpath + pic);
            wallpaper.get();
			break;
		}
		case "item-internal-ip-v4": {
			var internalIpv4 = internalIp.v4.sync();
			myTrayApp.balloon("Internal IP V4 is...", internalIpv4).then(() => {
				clipboardy.writeSync(internalIpv4);
			});
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
				});
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
