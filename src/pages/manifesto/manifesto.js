import gsap from 'gsap'

export default function manifesto() {
  let mm = gsap.matchMedia(),
    breakPoint = 479

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions

      let delay
      const loaded = sessionStorage.getItem('loaded')
      if (loaded) {
        delay = 0.4
      } else {
        delay = 3.6
        sessionStorage.setItem('loaded', 'true')
      }

      gsap.to('.green-box-parallax', {
        y: '-10rem',
        ease: 'none',
        scrollTrigger: {
          trigger: '.green__box',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          ease: 'none',
        },
      })
    }
  )
}
