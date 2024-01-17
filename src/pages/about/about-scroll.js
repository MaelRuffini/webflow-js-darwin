import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

export default function aboutScroll() {
  let mm = gsap.matchMedia(),
    breakPoint = 479

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions

      const cards = gsap.utils.toArray('.team__box')
      let lastCard = cards[cards.length - 1]

      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: `top 5%`,
          endTrigger: lastCard,
          end: 'top 5%',
          ease: 'none',
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        })
      })

      // Parallax
      const team = gsap.utils.toArray('.wrapper__image-team')
      team.forEach((i) => {
        gsap.to(i.querySelector('.home-team__image'), {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: i,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }
  )
}
