import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import SanityImage from '../../media/SanityImage'

gsap.registerPlugin(Draggable, InertiaPlugin)

export default function ImageCarousel({ images = [], projectTitle }) {
  const wrapperRef = useRef(null)
  const loopRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!wrapperRef.current || images.length === 0) return

    const boxes = gsap.utils.toArray('.carousel-item')

    const loop = horizontalLoop(boxes, {
      paused: true,
      draggable: true,
      center: true,
      onChange: (element, index) => {
        setActiveIndex(index)
      }
    })

    loopRef.current = loop

    return () => {
      loop.kill()
    }
  }, [images])

  const handleNext = () => {
    loopRef.current?.next({ duration: 0.4, ease: 'power1.inOut' })
  }

  const handlePrev = () => {
    loopRef.current?.previous({ duration: 0.4, ease: 'power1.inOut' })
  }

  if (!images || images.length === 0) return null

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Left Gradient Fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #151518 0%, #151518 24px, #15151800 100%)'
        }}
      />

      {/* Right Gradient Fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, #151518 0%, #151518 24px, #15151800 100%)'
        }}
      />

      {/* Carousel Wrapper */}
      <div ref={wrapperRef} className="absolute inset-0 flex items-center">
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-item flex-shrink-0 px-8 w-[90%] md:w-[70%]"
          >
            <div className="w-full aspect-[3/2] rounded overflow-hidden">
              <SanityImage
                image={image}
                alt={image?.alt || `Project image ${index + 1}`}
                width={1400}
                height={933}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-fg-04 hover:bg-fg-08 transition-colors"
        aria-label="Previous image"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-fg-04 hover:bg-fg-08 transition-colors"
        aria-label="Next image"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

// GSAP Horizontal Loop Helper Function
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items)
  config = config || {}

  let onChange = config.onChange,
    lastIndex = 0,
    tl = gsap.timeline({
      repeat: config.repeat,
      onUpdate: onChange && function() {
        let i = tl.closestIndex()
        if (lastIndex !== i) {
          lastIndex = i
          onChange(items[i], i)
        }
      },
      paused: config.paused,
      defaults: { ease: 'none' },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    spaceBefore = [],
    xPercents = [],
    curIndex = 0,
    center = config.center,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
    container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
    totalWidth

  const getTotalWidth = () =>
    items[length - 1].offsetLeft +
    xPercents[length - 1] / 100 * widths[length - 1] -
    startX +
    spaceBefore[0] +
    items[length - 1].offsetWidth *
    gsap.getProperty(items[length - 1], 'scaleX') +
    (parseFloat(config.paddingRight) || 0)

  const populateWidths = () => {
    let b1 = container.getBoundingClientRect(), b2
    items.forEach((el, i) => {
      widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px'))
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, 'x', 'px')) / widths[i] * 100 + gsap.getProperty(el, 'xPercent'))
      b2 = el.getBoundingClientRect()
      spaceBefore[i] = b2.left - (i ? b1.right : b1.left)
      b1 = b2
    })
    gsap.set(items, {
      xPercent: i => xPercents[i]
    })
    totalWidth = getTotalWidth()
  }

  const populateOffsets = () => {
    const timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0
    center && times.forEach((t, i) => {
      times[i] = timeWrap(tl.labels['label' + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset)
    })
  }

  const populateTimeline = () => {
    tl.clear()
    for (let i = 0; i < length; i++) {
      const item = items[i]
      const curX = xPercents[i] / 100 * widths[i]
      const distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0]
      const distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX')

      tl.to(item, {
        xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
        duration: distanceToLoop / pixelsPerSecond
      }, 0)
      .fromTo(item,
        { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) },
        {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false
        },
        distanceToLoop / pixelsPerSecond
      )
      .add('label' + i, distanceToStart / pixelsPerSecond)

      times[i] = distanceToStart / pixelsPerSecond
    }
  }

  let timeWrap = gsap.utils.wrap(0, 1)

  gsap.set(items, { x: 0 })
  populateWidths()
  populateTimeline()
  timeWrap = gsap.utils.wrap(0, tl.duration())
  populateOffsets()

  const toIndex = (index, vars) => {
    vars = vars || {}
    const newIndex = gsap.utils.wrap(0, length, index)
    let time = times[newIndex]

    if (time > tl.time() !== index > curIndex && index !== curIndex) {
      time += tl.duration() * (index > curIndex ? 1 : -1)
    }

    if (time < 0 || time > tl.duration()) {
      vars.modifiers = { time: timeWrap }
    }

    curIndex = newIndex
    vars.overwrite = true

    return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars)
  }

  tl.next = vars => toIndex(curIndex + 1, vars)
  tl.previous = vars => toIndex(curIndex - 1, vars)
  tl.closestIndex = () => {
    const getClosest = (values, value, wrap) => {
      let i = values.length, closest = 1e10, index = 0, d
      while (i--) {
        d = Math.abs(values[i] - value)
        if (d > wrap / 2) d = wrap - d
        if (d < closest) {
          closest = d
          index = i
        }
      }
      return index
    }
    return getClosest(times, tl.time(), tl.duration())
  }

  tl.progress(1, true).progress(0, true)

  if (config.draggable && typeof Draggable !== 'undefined') {
    const proxy = document.createElement('div')
    let ratio, startProgress, draggable, lastSnap, initChangeX, dragSnap

    const align = () => tl.progress(gsap.utils.wrap(0, 1)(startProgress + (draggable.startX - draggable.x) * ratio))
    const syncIndex = () => tl.closestIndex()

    draggable = Draggable.create(proxy, {
      trigger: items[0].parentNode,
      type: 'x',
      onPress() {
        const x = this.x
        gsap.killTweensOf(tl)
        tl.pause()
        startProgress = tl.progress()
        ratio = 1 / totalWidth
        initChangeX = (startProgress / -ratio) - x
        gsap.set(proxy, { x: startProgress / -ratio })
      },
      onDrag: align,
      onThrowUpdate: align,
      overshootTolerance: 0,
      inertia: true,
      snap(value) {
        if (Math.abs(startProgress / -ratio - this.x) < 10) {
          return lastSnap + initChangeX
        }
        let time = -(value * ratio) * tl.duration(),
          wrappedTime = timeWrap(time),
          snapTime = times[(() => {
            let i = times.length, closest = 1e10, index = 0, d
            while (i--) {
              d = Math.abs(times[i] - wrappedTime)
              if (d > tl.duration() / 2) d = tl.duration() - d
              if (d < closest) {
                closest = d
                index = i
              }
            }
            return index
          })()],
          dif = snapTime - wrappedTime
        Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration())
        lastSnap = (time + dif) / tl.duration() / -ratio
        return lastSnap
      },
      onRelease() {
        syncIndex()
      },
      onThrowComplete: syncIndex
    })[0]
  }

  return tl
}
