const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const toggleBtn = document.getElementById('toggleBtn');
const hexInput = document.getElementById('hexInput');
hexInput.value = '#c6d5ac';
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const alteredColorText = document.getElementById('alteredColorText');
toggleBtn.addEventListener('click', () => {
    if (toggleBtn.classList.contains('toggled')) {
        toggleBtn.classList.remove('toggled');
        lightenText.classList.remove('unselected');
        darkenText.classList.add('unselected');
    } else {
        toggleBtn.classList.add('toggled');
        darkenText.classList.remove('unselected');
        lightenText.classList.add('unselected');
    }
    reset();
});

const reset = () => {
    slider.value = 0;
    sliderText.innerText = `0%`;
    alteredColor.style.backgroundColor = hexInput.value;
    inputColor.style.backgroundColor = hexInput.value;
};

hexInput.addEventListener('keyup', (e) => {
    inputColor.style.backgroundColor = hexInput.value;
    reset();
});

const isValidHex = (hex) => {
    if (!hex) return false;
    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 6;
};

const convertHexToRGB = (hex) => {
    if (!isValidHex(hex)) return null;

    hex = hex.replace('#', ''); //remove hashtag

    //convert r,g, and b from hex to base 10
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
};

const alterColor = (hex, percentage) => {
    const { r, g, b } = convertHexToRGB(hex);
    const amount = Math.floor((percentage / 100) * 255);

    return convertRGBToHex(
        increaseHex(r, amount),
        increaseHex(g, amount),
        increaseHex(b, amount)
    );
};

const increaseHex = (hex, amount) => {
    return Math.min(255, Math.max(0, hex + amount));
};

const convertRGBToHex = (r, g, b) => {
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
};

slider.addEventListener('input', function (e) {
    if (!isValidHex(hexInput.value)) return;
    sliderText.textContent = `${slider.value}%`;
    const valueAddition = toggleBtn.classList.contains('toggled')
        ? -slider.value
        : slider.value;
    const hexColor = alterColor(hexInput.value, valueAddition);

    alteredColor.style.backgroundColor = hexColor;
    alteredColorText.innerText = hexColor;
});
