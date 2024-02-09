import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

export default function homeScroll() {
  let mm = gsap.matchMedia(),
    breakPoint = 479

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions

      gsap.to('.home-hero__title', {
        opacity: 0,
        y: '-0.5rem',
        duration: 0.3,
        ease: 'Quart.easeInOut',
        scrollTrigger: {
          trigger: '.hero__wrapper',
          start: '5% top',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to('.h6__hero', {
        opacity: 0,
        y: '-0.5rem',
        duration: 0.3,
        stagger: 0.05,
        ease: 'Quart.easeInOut',
        scrollTrigger: {
          trigger: '.hero__wrapper',
          start: '5% top',
          toggleActions: 'play none none reverse',
        },
      })

      // Panel animations
      const cards = gsap.utils.toArray('.mission__bg-image')

      gsap.fromTo(
        '.image__title--one',
        {
          y: isDesktop ? '-100vh' : 0,
        },
        {
          y: isDesktop ? '100vh' : 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.mission__item--one',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      gsap.fromTo(
        '.image__title--two',
        {
          y: isDesktop ? '-100vh' : 0,
        },
        {
          y: isDesktop ? '100vh' : 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.mission__item--two',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      gsap.fromTo(
        '.image__title--three',
        {
          y: isDesktop ? '-100vh' : 0,
        },
        {
          y: isDesktop ? '100vh' : 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.mission__item--three',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      cards.forEach((card, index) => {
        gsap.from(card.querySelector('.mission__image'), {
          scale: 1.5,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            ease: 'Quart.easeIn',
          },
        })

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: '.section--home-mission',
          end: `bottom bottom`,
          ease: 'none',
          pin: isDesktop ? true : false,
          pinSpacing: false,
          invalidateOnRefresh: true,
        })
      })

      // Parallax
      // const team = gsap.utils.toArray('.wrapper__image-team')
      // team.forEach((i) => {
      //   gsap.to(i.querySelector('.home-team__image'), {
      //     yPercent: 30,
      //     ease: 'none',
      //     scrollTrigger: {
      //       trigger: i,
      //       start: 'top bottom',
      //       end: 'bottom top',
      //       scrub: true,
      //     },
      //   })
      // })
    }
  )
}
