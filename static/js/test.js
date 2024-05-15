function __test() {
	let names = []
	let li = document.getElementById("tab-content").querySelectorAll('li')
	li.forEach(el => {
		let name = el.querySelector('a').innerText
		name && names.push(`'${ name }'`)
	})
	
	let key = '中国医药'
	let letter = document.querySelector('.py .selected').innerText
	console.log(key, letter)
	
	let database = JSON.parse(window.localStorage.getItem('database'))
	database[key][letter] = names
	window.localStorage.setItem('database', JSON.stringify(database))
	
	console.log(JSON.parse(window.localStorage.getItem('database')))
}
