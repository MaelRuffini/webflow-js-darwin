import gsap from 'gsap'
import { ScrollTrigger, Observer } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, Observer)

export default function header() {
  let mm = gsap.matchMedia(),
    breakPoint = 479

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions

      // Toggle header visibility
      const header = document.querySelector('.navbar')

      Observer.create({
        target: window,
        type: 'scroll',
        tolerance: 50,
        onUp: function scrollUp() {
          header.classList.remove('is--hidden')
        },
        onDown: function scrollDown() {
          header.classList.add('is--hidden')
        },
      })
    }
  )
}
