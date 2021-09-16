const TABLES = 6;
const FEE = 50;
let start = Array(TABLES);
let end = Array(TABLES);
let interval = Array(TABLES);

function bill(id) {
	let now = new Date();
	let total = (FEE*(now.getTime() - start[id].getTime()))/(1000*60*60);
	return total;
}

function play(id) {
	let td = document.getElementById(id);
	let img = td.getElementsByClassName("D")[0];
	let data = td.getElementsByTagName("p");
	if(img.src.match("img/donaldOff.png")) {
		img.src = "img/donald.gif";
		setTimeout(()=> {img.src = "img/donaldOn.png";}, 3800);
		start[id] = new Date();
		data[0].innerText = start[id].getHours()+":"+start[id].getMinutes();
		data[1].innerText = "$0.00";
		interval[id] = setInterval(()=> {
			data[1].innerText = "$" + bill(id).toFixed(2);
		}, 1000);
	}
	else {
		img.src = "img/donaldOff.png";
		clearInterval(interval[id]);
		end[id] = new Date();
		data[0].innerText += " "+end[id].getHours()+":"+end[id].getMinutes();
		data[1].innerText = "$" + bill(id).toFixed(2);
	}
	return;
}
