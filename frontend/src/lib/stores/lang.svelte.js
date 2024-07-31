let lang = $state('en')

export function getLang() {
	
	function changeLang(l) {
		lang = l
		localStorage.setItem('userLanguage', l);
	}

	return {
		get lang() {
			return lang;
		},
		changeLang,
	};
}