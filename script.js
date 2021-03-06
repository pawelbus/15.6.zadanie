class Stopwatch {
  constructor(display, scores) {
    this.running = false;
    this.display = display;
    this.scoresTable = scores;
    this.reset();
    this.print(this.times);
  }

  reset() {
    if(!this.running) {
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
    this.print();
    }
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    function pad0(value) {
      let result = value.toString();
      if (result.length < 2) {
        result = '0' + result;
      }
      return result;
    }
    
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  saveScore() {
    let liElement = document.createElement('li');

    liElement.innerText = this.format(this.times);
    this.scoresTable.appendChild(liElement);
  }

  clearList() {
    this.scoresTable.innerHTML = '';
  }
}

const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());

const saveScoreButton = document.getElementById('save');
saveScoreButton.addEventListener('click', () => stopwatch.saveScore());

const clearListButton = document.getElementById('clearList');
clearListButton.addEventListener('click', () => stopwatch.clearList());

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.scoresTable'));