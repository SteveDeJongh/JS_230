// 1 Randomizer

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer() {
  let callbacks = Array.prototype.slice.call(arguments, 0);
  if (callbacks.length < 1) {
    return;
  }
  let maxTime = callbacks.length * 2;
  
  for (let i = 1; i <= maxTime; i += 1) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }

  callbacks.forEach(cb => {
    let delay = Math.floor(Math.random() * maxTime);
    setTimeout(() => {
      cb();
    }, delay * 1000);
  });
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6

// LS Solution

function randomizer(...callbacks) {
  if (callbacks.length < 1) {
    return;
  }

  const secondsEnd = 2 * callbacks.length;
  let secondsElapsed = 0;

  const timeLogger = setInterval(() => {
    secondsElapsed += 1;
    console.log(secondsElapsed);

    if (secondsElapsed >= secondsEnd) {
      clearInterval(timeLogger);
    }
  }, 1000);

  callbacks.forEach(callback => {
    const executeTime = Math.floor(Math.random() * secondsEnd * 1000);
    setTimeout(callback, executeTime);
  });
}