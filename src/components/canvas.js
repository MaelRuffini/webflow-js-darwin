import gsap from 'gsap'

export default function canvas() {
  const canvas = document.querySelector('.canvas')
  const cntxt = canvas.getContext('2d')

  function resizeCanvas() {
    const parent = document.querySelector('.canvas__embed')
    if (parent) {
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  const frameCount = 180
  const currentFrame = (index) => `https://image-sequence-darwin.netlify.app/animation/${(index + 1).toString().padStart(4, '0')}.png`

  const images = []
  const frames = { frame: 0 }
  let loadedImages = 0

  for (let i = 0; i < frameCount; i++) {
    const img = new Image()
    img.src = currentFrame(i)
    img.onload = () => {
      loadedImages++
      if (loadedImages === frameCount) {
        // All images are loaded, can start the animation
        gsap.to(frames, {
          frame: frameCount - 1,
          snap: 'frame',
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero__sticky-wrapper',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          onUpdate: render,
        })
      }
    }
    images.push(img)
  }

  function render() {
    cntxt.clearRect(0, 0, canvas.width, canvas.height)
    const img = images[frames.frame]

    if (!img.complete) {
      console.log('hey')
      //   return
    }

    const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
    const x = (canvas.width - img.width * scale) / 2
    const y = (canvas.height - img.height * scale) / 2

    cntxt.drawImage(img, x, y, img.width * scale, img.height * scale)
  }
}
