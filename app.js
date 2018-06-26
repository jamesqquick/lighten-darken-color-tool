const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');

const hexInput = document.getElementById('hexInput');
hexInput.value = '#000';
const darkenSlider = document.getElementById('darkenSlider');
darkenSlider.value = 1;
const lightenSlider = document.getElementById('lightenSlider');
lightenSlider.value = 1;
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');

hexInput.addEventListener('keyup', e => {
	//console.log(hexInput.value);
	if (hexInput.value.substring(0, 1) !== '#') {
		hexInput.value = '#' + hexInput.value;
	}
	inputColor.style.backgroundColor = hexInput.value;
	alteredColor.style.backgroundColor = hexInput.value;
	resetSliders();
});

const isValidHex = hex => {
	//if (!hex) return false;
	const strippedHex = hex.substring(0, 1) === '#' ? hex.substring(1) : hex;
	const validSizes = [3, 6];
	return validSizes.includes(strippedHex.length);
};

const convertHexToRGB = hex => {
	if (!isValidHex(hex)) return null;

	//Check for #, if there then remove it
	if (hex.substring(0, 1) === '#') {
		hex = hex.substring(1);
	}
	let hexArray = hex.split('');
	if (hexArray.length === 3) {
		hexArray = [
			hexArray[0],
			hexArray[0],
			hexArray[1],
			hexArray[1],
			hexArray[2],
			hexArray[2]
		];
	}
	//Should have an array of length 6 (first two red, second two green, third two blue in hex)
	//convert r,g, and b from hex to base 10
	const fixedHexString = hexArray.join('');
	const r = parseInt(fixedHexString.substring(0, 2), 16);
	const g = parseInt(fixedHexString.substring(2, 4), 16);
	const b = parseInt(fixedHexString.substring(4, 6), 16);

	return { r, g, b };
};

const alterColor = (r, g, b, percentage) => {
	if (r < 0 || g < 0 || b < 0) {
		return null;
	}
	const amount = Math.floor((percentage / 100) * 255);
	const newR = Math.min(255, Math.max(0, r + amount));
	const newG = Math.min(255, Math.max(0, g + amount));
	const newB = Math.min(255, Math.max(0, b + amount));

	return {
		r: newR,
		g: newG,
		b: newB
	};
};

const convertRGBToHex = (r, g, b) => {
	return (
		'#' +
		convertBase10ToHex(r) +
		convertBase10ToHex(g) +
		convertBase10ToHex(b)
	);
};

convertBase10ToHex = digit => {
	const decimalDigitToHexDigitMap = {
		0: 0,
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9,
		10: 'a',
		11: 'b',
		12: 'c',
		13: 'd',
		14: 'e',
		15: 'f'
	};

	const firstDigit = decimalDigitToHexDigitMap[Math.floor(digit / 16)];
	const secondDigit = decimalDigitToHexDigitMap[digit % 16];

	return firstDigit + '' + secondDigit;
};

lightenSlider.addEventListener('input', function(e) {
	if (!isValidHex(hexInput.value)) return;

	lightenText.textContent = `Lighten ${lightenSlider.value}%`;
	darkenSlider.value = 1;
	const { r, g, b } = convertHexToRGB(hexInput.value);
	const alteredColorRGB = alterColor(r, g, b, this.value);
	alteredColor.style.backgroundColor = convertRGBToHex(
		alteredColorRGB.r,
		alteredColorRGB.g,
		alteredColorRGB.b
	);
});

darkenSlider.addEventListener('input', function(e) {
	if (!isValidHex(hexInput.value)) return;

	darkenText.textContent = `Darken ${darkenSlider.value}%`;
	lightenSlider.value = 1;
	const { r, g, b } = convertHexToRGB(hexInput.value);
	const alteredColorRGB = alterColor(r, g, b, 0 - this.value);
	alteredColor.style.backgroundColor = convertRGBToHex(
		alteredColorRGB.r,
		alteredColorRGB.g,
		alteredColorRGB.b
	);
});

resetSliders = () => {
	darkenSlider.value = 1;
	lightenSlider.value = 1;
};
