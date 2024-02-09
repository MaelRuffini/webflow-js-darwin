import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

export default function text() {
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
