import gsap from "gsap"
import { useEffect, useRef } from "react"
import TitleHeader from "./TitleHeader";

interface SectionProps {
  index: number
  active: boolean
  title: string;
}

export default function PostSection({ active, title }: SectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.to(sectionRef.current, {
      opacity: active ? 1 : 0,
      scale: active ? 1 : 0.95,
      duration: 0.5,
      ease: "power2.out",
      pointerEvents: active ? "auto" : "none",
    })
  }, [active])

  return (
    <div
      ref={sectionRef}
      className="fixed top-0 left-0 w-full h-[100dvh] flex items-center justify-center text-white text-5xl font-bold"
      style={{
        zIndex: active ? 10 : 1,
        opacity: 0,
        pointerEvents: "none",
        backgroundImage: `
            linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)),
            url("https://www.prugio.com/hb/2021/dongdaegu/final/mobile/assets/images/main/img_visual_image1.png")
  `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
        <TitleHeader title={title}/>
    </div>
  )
}
