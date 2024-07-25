let primaryColor = $state('#3873D1')
let secondaryColor = $state('#CCBFAA')

export function getColor() {
	
	function changePrimaryColor(c) {
		primaryColor = c
	}
	function changeSecondaryColor(c) {
		secondaryColor = c
	}

	return {
		get primaryColor() {
			return primaryColor;
		},
		changePrimaryColor,
		get secondaryColor() {
			return secondaryColor;
		},
		changeSecondaryColor,
	};
}