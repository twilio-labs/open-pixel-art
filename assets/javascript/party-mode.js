// get All the pixels into an array
const pixels = Array.from(
  document.querySelectorAll('#pixel-canvas rect.pixel')
);

// add additional 'x-start' and 'y-start' attributes
pixels.forEach(p => {
  p.setAttribute('x-start', p.getAttribute('x'));
  p.setAttribute('y-start', p.getAttribute('y'));
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
    w: walk
  };
  const f = keyMap[key];
  if (f) {
    f();
    event.preventDefault();
  }
}

const width = 40;
const height = 40;

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
  pixels.forEach((p, i) => {
    const [x, y, xStart, yStart] = ['x', 'y', 'x-start', 'y-start'].map(j =>
      Number(p.getAttribute(j))
    );
    const [xNew, yNew] = transformFunction({ x, y, xStart, yStart, i });
    p.setAttribute('x', xNew);
    p.setAttribute('y', yNew);
  });
}
