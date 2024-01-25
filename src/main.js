import './styles/style.css'
import barba from '@barba/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Lenis from '@studio-freight/lenis'
import header from './components/header'
import home from './pages/home/home'
import homeScroll from './pages/home/home-scroll'
import about from './pages/about/about'
import aboutScroll from './pages/about/about-scroll'
import text from './components/text'
import homeFooter from './pages/home/homeFooter'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis()

setTimeout(() => {
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
}, 2500)

const currentLink = () => {
  var links = document.querySelectorAll('a[href]')
  var cbk = function (e) {
    if (e.currentTarget.href === window.location.href) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', cbk)
  }
}

const reinitializeWebflowIX2 = (newHtmlContent) => {
  let parser = new DOMParser()
  let newDom = parser.parseFromString(newHtmlContent, 'text/html')
  let newWebflowPageId = newDom.querySelector('html').getAttribute('data-wf-page')
  let newWebflowSiteId = newDom.querySelector('html').getAttribute('data-wf-site')

  if (newWebflowPageId) {
    document.documentElement.setAttribute('data-wf-page', newWebflowPageId)
  }
  if (newWebflowSiteId) {
    document.documentElement.setAttribute('data-wf-site', newWebflowSiteId)
  }

  if (window.Webflow) {
    window.Webflow.destroy()
    window.Webflow.ready()

    if (window.Webflow.require('ix2')) {
      window.Webflow.require('ix2').init()
    }
  }
}

const init = () => {
  currentLink()
  header()

  const isHome = document.querySelector('body').classList.contains('body--home')
  if (isHome) {
    home()
    homeScroll()
    text()
    homeFooter()
  }

  const isAbout = document.querySelector('body').classList.contains('body--about')
  if (isAbout) {
    about()
    aboutScroll()
  }

  const isManifesto = document.querySelector('body').classList.contains('body--manifesto')
  if (isManifesto) {
    let textTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.green__box',
          start: 'top top',
          end: '20% top',
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
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        ease: 'none',
      },
    })
  }
}

let loadingProgress = { value: 0 }

let loadingTl = gsap
  .timeline({ paused: true })
  .to('.loader__bar', {
    scaleX: 1,
    duration: 1.8,
    ease: 'Quart.easeInOut',
  })
  .to(
    loadingProgress,
    {
      value: 100,
      duration: 1.2,
      ease: 'Quart.easeInOut',
      onUpdate: function () {
        document.querySelector('.loader__percent').textContent = `${Math.round(loadingProgress.value)}%`
      },
    },
    '<'
  )
  .to('.loader__progress', {
    scaleX: 0,
    duration: 1.2,
    delay: 0.3,
    ease: 'Quart.easeInOut',
  })
  .to(
    '.loader__animation',
    {
      y: '2rem',
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'Quart.easeInOut',
    },
    '<'
  )
  .to(
    '.loader__wrapper',
    {
      backgroundColor: 'transparent',
      duration: 2.2,
      ease: 'Quart.easeInOut',
    },
    '<'
  )
  .to(
    '.loader__mask',
    {
      borderWidth: 0,
      duration: 2,
      ease: 'Quart.easeInOut',
    },
    '<'
  )
  .to('.loader__mask', {
    borderColor: '#bcff67',
    duration: 0,
  })
  .to('.loader__wrapper', {
    display: 'none',
    duration: 0,
  })

barba.init({
  preventRunning: true,
  transitions: [
    {
      name: 'default-transition',
      once() {
        loadingTl.play()
        init()
      },
      leave(data) {
        return new Promise((resolve) => {
          let leaveTl = gsap
            .timeline({
              onComplete() {
                resolve()
              },
            })
            .to('.loader__wrapper', {
              display: 'block',
              duration: 0,
            })
            .to(
              '.loader__wrapper',
              {
                backgroundColor: 'white',
                duration: 0.6,
                ease: 'Quart.easeInOut',
              },
              0
            )
        })
      },
      afterLeave() {
        let triggers = ScrollTrigger.getAll()
        triggers.forEach((trigger) => {
          trigger.kill()
        })
      },
      enter(data) {
        window.scrollTo(0, 0)
        let transitionTL = gsap
          .timeline({
            defaults: {
              ease: 'Quart.easeInOut',
            },
            onComplete: () => {
              reinitializeWebflowIX2(data.next.html)
            },
          })
          .to(
            '.loader__wrapper',
            {
              backgroundColor: 'transparent',
              duration: 0.6,
              ease: 'Quart.easeInOut',
            },
            0
          )
          .to('.loader__wrapper', {
            display: 'none',
            duration: 0,
          })
      },
      after() {
        init()
      },
    },
  ],
  views: [
    {
      namespace: 'home',
      beforeEnter() {
        document.querySelector('body').className = 'body body--home'
      },
    },
    {
      namespace: 'manifesto',
      beforeEnter() {
        document.querySelector('body').className = 'body body--manifesto'
      },
    },
    {
      namespace: 'about',
      beforeEnter() {
        document.querySelector('body').className = 'body body--about'
      },
    },
    {
      namespace: 'contact',
      beforeEnter() {
        document.querySelector('body').className = 'body body--contact'
      },
    },
    {
      namespace: 'privacy',
      beforeEnter() {
        document.querySelector('body').className = 'body body--privacy'
      },
    },
    {
      namespace: 'utils',
      beforeEnter() {
        document.querySelector('body').className = 'body body--utils'
      },
    },
  ],
})
