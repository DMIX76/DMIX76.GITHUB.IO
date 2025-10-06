// Переменные игры
let secretNumber;
let attempts;
let maxAttempts = 10;
let gameOver;
let allNumbers;

// Инициализация игры
function initGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = [];
    gameOver = false;
    allNumbers = Array.from({length: 100}, (_, i) => i + 1);
    
    document.getElementById('attemptCount').textContent = '0';
    document.getElementById('attemptList').innerHTML = '';
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = 'message';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').disabled = false;
    document.getElementById('checkBtn').disabled = false;
    
    // Вывод загаданного числа в консоль для отладки
    console.log(`Загаданное число: ${secretNumber}`);
    
    updateRemainingNumbers();
}

// Обновление списка неиспользованных чисел
function updateRemainingNumbers() {
    const remainingNumbersDiv = document.getElementById('remainingNumbers');
    remainingNumbersDiv.innerHTML = '';
    
    allNumbers.forEach(number => {
        const numberElement = document.createElement('div');
        numberElement.className = attempts.includes(number) ? 'number-item used' : 'number-item';
        numberElement.textContent = number;
        remainingNumbersDiv.appendChild(numberElement);
    });
}

// Запуск игры
function startGame() {
    initGame();
    document.getElementById('message').textContent = 'Игра началась! Угадайте число от 1 до 100.';
    document.getElementById('message').className = 'message info';
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('newGameBtn').style.display = 'inline-block';
    document.getElementById('guessInput').focus();
}

// Проверка предположения
function checkGuess() {
    if (gameOver) return;
    
    const guessInput = document.getElementById('guessInput');
    const guess = parseInt(guessInput.value);
    const messageDiv = document.getElementById('message');
    const attemptList = document.getElementById('attemptList');
    
    // Проверка валидности ввода
    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageDiv.textContent = 'Пожалуйста, введите число от 1 до 100!';
        messageDiv.className = 'message error';
        return;
    }
    
    // Проверка на повторение попытки
    if (attempts.includes(guess)) {
        messageDiv.textContent = 'Вы уже пробовали это число!';
        messageDiv.className = 'message error';
        return;
    }
    
    // Добавляем попытку
    attempts.push(guess);
    document.getElementById('attemptCount').textContent = attempts.length;
    
    // Создаем элемент списка для этой попытки
    const attemptItem = document.createElement('li');
    
    // Проверяем предположение
    if (guess === secretNumber) {
        // Победа!
        messageDiv.textContent = `🎉 Поздравляю! Вы угадали число ${secretNumber} за ${attempts.length} попыток!`;
        messageDiv.className = 'message success';
        gameOver = true;
        guessInput.disabled = true;
        document.getElementById('checkBtn').disabled = true;
        attemptItem.textContent = `${guess} - ✅ Правильно!`;
        attemptItem.style.borderLeftColor = '#28a745';
    } else if (attempts.length >= maxAttempts) {
        // Превышено количество попыток
        messageDiv.textContent = `💀 Игра окончена! Загаданное число было: ${secretNumber}`;
        messageDiv.className = 'message error';
        gameOver = true;
        guessInput.disabled = true;
        document.getElementById('checkBtn').disabled = true;
        attemptItem.textContent = `${guess} - ❌ Превышено количество попыток`;
    } else {
        // Подсказка
        const difference = Math.abs(secretNumber - guess);
        let hint = '';
        
        if (difference <= 5) {
            hint = 'Очень горячо!';
            attemptItem.style.borderLeftColor = '#ff6b6b';
        } else if (difference <= 10) {
            hint = 'Горячо';
            attemptItem.style.borderLeftColor = '#ffa500';
        } else if (difference <= 20) {
            hint = 'Тепло';
            attemptItem.style.borderLeftColor = '#ffd700';
        } else if (difference <= 30) {
            hint = 'Прохладно';
            attemptItem.style.borderLeftColor = '#add8e6';
        } else {
            hint = 'Холодно';
            attemptItem.style.borderLeftColor = '#0000ff';
        }
        
        if (guess < secretNumber) {
            messageDiv.textContent = `⬆️ Слишком мало! ${hint}`;
            attemptItem.textContent = `${guess} - ⬆️ Мало (${hint})`;
        } else {
            messageDiv.textContent = `⬇️ Слишком много! ${hint}`;
            attemptItem.textContent = `${guess} - ⬇️ Много (${hint})`;
        }
        messageDiv.className = 'message info';
    }
    
    // Добавляем попытку в список
    attemptList.appendChild(attemptItem);
    
    // Обновляем список неиспользованных чисел
    updateRemainingNumbers();
    
    // Очищаем поле ввода
    guessInput.value = '';
    guessInput.focus();
}

// Новая игра
function newGame() {
    initGame();
    document.getElementById('message').textContent = 'Новая игра началась! Угадайте число от 1 до 100.';
    document.getElementById('message').className = 'message info';
}

// Обработка нажатия Enter
document.getElementById('guessInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Инициализация при загрузке страницы
window.onload = function() {
    document.getElementById('message').textContent = 'Нажмите "Старт" чтобы начать игру!';
    document.getElementById('message').className = 'message info';
    document.getElementById('guessInput').disabled = true;
    document.getElementById('checkBtn').disabled = true;
};