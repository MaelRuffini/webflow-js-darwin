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

      // let heroTitle = new SplitText('.home-hero__title', { type: 'lines' })
      // gsap.from(heroTitle.lines, {
      //   opacity: 0,
      //   y: '2rem',
      //   duration: 1.2,
      //   delay: 1.8,
      //   ease: 'Quart.easeInOut',
      //   stagger: 0.05,
      // })

      // gsap.from('.h6__hero', {
      //   opacity: 0,
      //   y: '2rem',
      //   duration: 1.2,
      //   delay: 1.8,
      //   ease: 'Quart.easeInOut',
      //   stagger: 0.05,
      // })
    }
  )
}
