import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import PostSection from "../components/PostSection"

gsap.registerPlugin(ScrollTrigger)

export default function PostPage() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const sections = [{title:"notice", posts:[]}, {title:"event", posts:[]}, {title:"complain", posts:[]}] // 3개 페이지

  useLayoutEffect(() => {
    if (!wrapperRef.current) return
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
              trigger: wrapperRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              onUpdate: (self) => {
                const total = sections.length
                const progress = self.progress
                const index = Math.floor(progress * total)
                setActiveIndex(Math.min(index, total - 1))
        
                // ✅ 진행 바 애니메이션
                if (progressBarRef.current) {
                  gsap.to(progressBarRef.current, {
                    width: `${progress * 100}%`,
                    duration: 0.2,
                    ease: "power1.out",
                  })
                }
              },
            })
        })
 
        return () => ctx.revert();

  }, [sections.length])

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ height: `${sections.length * 100}vh` }}>
      {/* ✅ 상단 진행 바 */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gray-800 z-[999]">
        <div
          ref={progressBarRef}
          className="h-full bg-green-400"
          style={{ width: "0%" }}
        />
      </div>

      {/* ✅ 페이지 섹션 */}
      {sections.map((_, i) => (
        <PostSection key={i} index={i} active={activeIndex === i} {...sections[i]} />
      ))}
    </div>
  )
}

