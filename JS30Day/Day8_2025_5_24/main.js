const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('button');

let currentInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        
        if (value === 'C') {
            currentInput = '';
            screen.value = '';
        }else if (value === '=') {
            try {
                const expression = currentInput.replace(/x/g, '*');
                const result = eval(expression);
                screen.value = result;
                currentInput = result.toString();
            } catch {
                screen.value = 'error';
                currentInput = '';
            }
        }else {
            currentInput += value;
            screen.value = currentInput;
        }
    });
});
