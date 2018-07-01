function isPC () {
	const userAgentInfo = navigator.userAgent;
	const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
	let flag = true;
	for (let v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
	}
	return flag;
}

function addPreZero(num){
   return ('00000'+num).slice(-6);
}

function isMyPet(id) {
  let myPetIds = [];

  if(localStorage.getItem('myCats')) {
    myPetIds = JSON.parse(localStorage.getItem('myCats'));
  }

  return myPetIds.map((id) => id * 1).indexOf(id * 1) !== -1;
}

export {
  isPC,
  addPreZero,
  isMyPet
};