const canvas = document.getElementById('pixel-canvas');
const rects = Array.from(
  document.querySelectorAll('#pixel-canvas .pixel-rect')
);
const images = Array.from(
  document.querySelectorAll('#pixel-canvas .pixel-image')
);
// hide image-pixels on load
images.forEach(image => image.remove());

let showImages = false;

// add additional 'x-start' and 'y-start' attributes
rects.forEach(rect => {
  rect.setAttribute('x-start', rect.getAttribute('x'));
  rect.setAttribute('y-start', rect.getAttribute('y'));
});

document.addEventListener('keydown', onKeyDown);

function onKeyDown(event) {
  // don't interfere with copy/paste/reload
  const isControlAction = event.metaKey || event.ctrlKey;
  if (isControlAction) {
    return;
  }

  const { key } = event;
  const keyMap = {
    Escape: reset,
    r: random,
    o: order,
    t: twist,
    f: flip,
    v: vert,
    w: walk,
    a: toggleImages,
    p: runAll
  };

  const f = keyMap[key];
  if (f) {
    f();
    event.preventDefault();
  }
}

const width = 40;
const height = 40;

function runAll() {
  setTimeEffect(order, 1000);
  setTimeEffect(reset, 2000);
  setTimeEffect(twist, 3000);
  setTimeEffect(flip, 4000);
  setTimeEffect(vert, 5000);
  setTimeEffect(random, 6000);
  setTimeEffect(walk, 7000);
  setTimeEffect(reset, 8000);
}

function setTimeEffect(effect, time) {
  setTimeout(() => {
    effect();
  }, time);
}

function reset() {
  transform(({ xStart, yStart }) => [xStart, yStart]);
}

function random() {
  const r = () => Math.floor(Math.random() * 40) * 10;
  transform(() => [r(), r()]);
}

function order() {
  const f = ({ i }) => [(i % width) * 10, Math.floor(i / width) * 10];
  transform(f);
}

function flip() {
  transform(({ x, y }) => [390 - x, y]);
}

function vert() {
  transform(({ x, y }) => [x, 390 - y]);
}

function twist() {
  transform(({ x, y }) => [390 - y, x]);
}

function walk() {
  transform(w);
}

const nudges = [[10, 0], [-10, 0], [0, 10], [0, -10]];
const randomElement = arr => arr[Math.floor(Math.random() * arr.length)];
const between = (min, value, max) => Math.min(Math.max(value, min), max);
const w = ({ x, y }) => {
  const [dx, dy] = randomElement(nudges);
  const newX = between(0, x + dx, 390);
  const newY = between(0, y + dy, 390);
  return [newX, newY];
};

function transform(transformFunction) {
  rects.forEach((rect, i) => {
    const image = images[i];
    const [x, y, xStart, yStart] = ['x', 'y', 'x-start', 'y-start'].map(j =>
      Number(rect.getAttribute(j))
    );
    const [xNew, yNew] = transformFunction({ x, y, xStart, yStart, i });
    rect.setAttribute('x', xNew);
    rect.setAttribute('y', yNew);
    image.setAttribute('x', xNew);
    image.setAttribute('y', yNew);
  });
}

function toggleImages() {
  showImages = !showImages;
  if (showImages) {
    rects.forEach(rect => rect.remove());
    images.forEach(image => {
      const name = image.getAttribute('name');
      image.classList.remove('hidden');
      image.setAttribute(
        'xlink:href',
        `//avatars.githubusercontent.com/${name}?size=20`
      );
      canvas.appendChild(image);
    });
  } else {
    rects.forEach(rect => canvas.appendChild(rect));
    images.forEach(image => image.remove());
  }
}
