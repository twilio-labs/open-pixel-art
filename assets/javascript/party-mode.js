// get All the pixels into an array
const pixels = Array.from(document.querySelectorAll('#pixel-canvas rect.pixel'))

// add additional 'x-start' and 'y-start' attributes
pixels.forEach(p => {
    p.setAttribute('x-start', p.getAttribute('x'))
    p.setAttribute('y-start', p.getAttribute('y'))
})


document.addEventListener('keydown',onKeyDown)

function onKeyDown(event) {
    const {key} = event
    const keyMap = {
        'Escape':reset,
        ' ': random,
        'o':order,
        't':twist,
        'f':flip,
        'v':vert,
    }
    const f = keyMap[key]
    if(f) {
        f()
        event.preventDefault()
    }
}

const width = 40
const height = 40


function reset() {
    applyTransform((xCurr, yCurr, xStart, yStart, i) => [xStart, yStart])
}

function random() {
    const r = () => Math.floor(Math.random() * 40) * 10
    applyTransform(() => [r(), r()])
}

function order() {
    const f= (xCurr, yCurr, xStart, yStart, i) => [(i % width) * 10, (Math.floor(i / width)) * 10]
    applyTransform(f)
}

function flip() {
    applyTransform((x,y) => [390-x, y])
}

function vert() {
    applyTransform((x,y) => [x, 390-y])
}

function twist() {
    applyTransform((x,y) => [390 - y, x])
}

function applyTransform(transformFunction) {
    pixels.forEach((p,i) => {
        const [xCurr, yCurr, xStart, yStart] = ['x','y','x-start','y-start'].map(j => Number(p.getAttribute(j)))
        const [x, y] = transformFunction(xCurr, yCurr, xStart, yStart, i)
        p.setAttribute('x', x) 
        p.setAttribute('y', y) 
    })
}
