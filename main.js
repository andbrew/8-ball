const TABLES = 6;
const FEE = 50;
let start = Array(TABLES);
let end = Array(TABLES);
let interval = Array(TABLES);

function bill(id, t = new Date()) {
	let total = FEE*(t.getTime()-start[id].getTime()) / (1000*60*60);
	return total.toFixed(2);
}

function format(t) {
	return t.getHours()+":"+t.getMinutes();
}

function play(id) {
	let td = document.getElementById(id);
	let img = td.getElementsByClassName("D")[0];
	let data = td.getElementsByTagName("p");
	if(img.src.match("img/donaldOff.png")) {
		img.src = "img/donald.gif";
		setTimeout(()=> {img.src = "img/donaldOn.png";}, 3800);
		start[id] = new Date();
		data[0].innerText = format(start[id]);
		data[1].innerText = "$0.00";
		interval[id] = setInterval(()=> {
			data[1].innerText = "$" + bill(id);
		}, 1000);
	}
	else {
		img.src = "img/donaldOff.png";
		clearInterval(interval[id]);
		end[id] = new Date();
		data[0].innerText += " " + format(end[id]);
		data[1].innerText = "$" + bill(id);
	}
	return;
}
