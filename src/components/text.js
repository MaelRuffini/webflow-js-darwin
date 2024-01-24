import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

export default function text() {
  let textTl = gsap
    .timeline({
      scrollTrigger: {
        trigger: '.green__box',
        start: 'top center',
        end: 'top top',
        scrub: true,
        ease: 'none',
      },
    })
    .to(
      '.tags__text',
      {
        yPercent: -115,
        ease: 'none',
      },
      0
    )
    .to(
      '.tags__text--absolute',
      {
        yPercent: -140,
        ease: 'none',
      },
      0
    )

  gsap.to('.green-box-parallax', {
    y: '-10rem',
    ease: 'none',
    scrollTrigger: {
      trigger: '.green__box',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      ease: 'none',
    },
  })
}
