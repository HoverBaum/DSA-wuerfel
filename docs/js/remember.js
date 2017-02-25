/**
 *   Remember values a user puts into the Website for the next time they visit.
 */


let remember = localStorage.remember
if(remember === undefined) {
	remember = []
} else {
	remember = JSON.parse(remember)
}

const toRemember = document.querySelectorAll('.remember')
for(let i = 0; i < toRemember.length; i++){
	let elm = toRemember[i]
	let found = remember.find(rem => rem.id === elm.id)
	if(found !== undefined) {

		//Set value to remembered one
		elm.value = found.value
	} else {
		remember.push({
			id: elm.id,
			value: elm.value
		})
		localStorage.remember = JSON.stringify(remember)
	}

	//Listen for changes and save them.
	elm.addEventListener('change', event => {
		console.log(event);
		remember.map(remembered => {
			if(remembered.id === event.target.id) {
				remembered.value = event.target.value
			}
			return remembered
		})
		localStorage.remember = JSON.stringify(remember)
	})
}
