import gsap from 'gsap'
import { SplitText } from 'gsap/all'

gsap.registerPlugin(SplitText)

export default function home() {
  let mm = gsap.matchMedia(),
    breakPoint = 479

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions

      const videos = document.querySelectorAll('video')
      videos.forEach((video) => {
        video.play()
      })
    }
  )
}
