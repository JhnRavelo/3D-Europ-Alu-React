import gsap from "gsap"

const imgAnimate = (index, opacity, pointerEvents, delay) => {
    const imgLabel = [...document.querySelectorAll('.imgi')]
    const divLabel = [...document.querySelectorAll('.divi')]

    gsap.to(imgLabel[index], {
        opacity,
        duration: 1,
        delay,
    })
    gsap.to(divLabel[index], {
        opacity,
        duration: 1,
        pointerEvents,
        delay,
    })
    return divLabel
}

const imgAnimation = (min, max, polar, index, objectPolar, objectRotation, maxDistance, minDistance, distance) => {

    if (objectRotation >= min && objectRotation <= max && objectPolar >= polar && distance < maxDistance && distance > minDistance) {
        imgAnimate(index, 1, 'all')
    } else {
        imgAnimate(index, 0, 'none')
    }

}

export {imgAnimate, imgAnimation}