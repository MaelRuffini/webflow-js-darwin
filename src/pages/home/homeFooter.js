import gsap from 'gsap'
import { SplitText } from 'gsap/all'

gsap.registerPlugin(SplitText)

export default function homeFooter() {
  let mm = gsap.matchMedia(),
    breakPoint = 479

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions

      const canvas = document.querySelector('.canvas--footer')
      const cntxt = canvas.getContext('2d')

      function resizeCanvas() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      window.addEventListener('resize', resizeCanvas)
      resizeCanvas()

      const frameCount = 80
      const currentFrame = (index) => `https://image-sequence-darwin.netlify.app/footer/${(index + 1).toString()}.jpg`

      const images = []
      const airpods = { frame: 0 }

      for (let i = 0; i < frameCount; i++) {
        const img = new Image()
        img.src = currentFrame(i)
        images.push(img)
      }

      gsap.to(airpods, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: '.section--contact',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        onUpdate: render,
      })

      images[0].onload = render

      function render() {
        cntxt.clearRect(0, 0, canvas.width, canvas.height)

        const img = images[airpods.frame]
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
        const x = canvas.width / 2 - (img.width / 2) * scale
        const y = canvas.height / 2 - (img.height / 2) * scale

        cntxt.drawImage(img, x, y, img.width * scale, img.height * scale)
      }
    }
  )
}
