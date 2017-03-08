//http://stackoverflow.com/questions/30452263/is-there-a-mechanism-to-loop-x-times-in-es6-ecmascript-6-without-mutable-varia
const repeat = n => f => x => {
  while (true) {
    if (n === 0)
      return x
    else
      (n = n - 1, x = f (x))
  }
}

//http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const roll = max => {
	return Math.floor(Math.random() * (max - 2)) + 1;
}

function generate() {

	//Get users input
	const attribute1 = document.querySelector('#attribute1').value
	const attribute2 = document.querySelector('#attribute2').value
	const attribute3 = document.querySelector('#attribute3').value
	const attributes = [attribute1, attribute2, attribute3]
	const abilityValue = document.querySelector('#ability').value
	const count = document.querySelector('#count').value

	//Generate results
	const results = []
	const trial = () => {
		const rolls = [roll(20), roll(20), roll(20)]
		const result = {
			rolls,
			remainingFW: rolls.reduce((remaining, role, index) => {
				const difference = role - attributes[index]
				return (difference > 0 ) ? remaining - difference : remaining
			}, abilityValue)
		}
		results.push(result)
	}
	repeat(count)(trial)()

	//Display the results
	const resultsContainer = document.querySelector('#result')
	const printCheckboxes = document.querySelector('#printCheckboxes').checked
	resultsContainer.innerHTML = '<dl>' + results.reduce((html, result, index) => {
		return html += `<dt><label><input type="checkbox" class="list-checkbox ${printCheckboxes ? '' : 'no-print'}"> ${(result.remainingFW >= 0) ? 'Widerstanden' : 'NICHT widerstanden'} <br/><small>Übrige FW: ${result.remainingFW} | Ergebnisse: ${result.rolls}</small></label></dt>`
	}, '') + '</dl>'

	return false
}
