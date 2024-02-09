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

      const buttons = document.querySelectorAll('.button__wrapper')
      if (buttons) {
        buttons.forEach((button) => {
          let btnTl = gsap
            .timeline({ paused: true })
            .to(
              button.querySelector('.button__background'),
              {
                scaleY: 1,
                duration: 1.2,
                ease: 'Quart.easeInOut',
              },
              0
            )
            .to(
              button.querySelector('.button__text'),
              {
                yPercent: -200,
                duration: 1.2,
                ease: 'Quart.easeInOut',
              },
              0
            )
            .to(
              button.querySelector('.button__text--hover'),
              {
                yPercent: -200,
                duration: 1.2,
                ease: 'Quart.easeInOut',
              },
              0
            )

          button.addEventListener('mouseenter', () => {
            btnTl.play()
          })
          button.addEventListener('mouseleave', () => {
            btnTl.reverse()
          })
        })
      }

      // Toggle header visibility
      // const header = document.querySelector('.navbar')

      // Observer.create({
      //   target: window,
      //   type: 'scroll',
      //   tolerance: 50,
      //   onUp: function scrollUp() {
      //     header.classList.remove('is--hidden')
      //   },
      //   onDown: function scrollDown() {
      //     header.classList.add('is--hidden')
      //   },
      // })
    }
  )
}
