import gsap from "gsap";
import { useLayoutEffect, useRef } from "react"

interface Props {
    imgSrc?: string;
    title: string;
}

export default function TitleHeader({title}:Props) {
    const imgRef = useRef<HTMLImageElement>(null)
    const titleRef = useRef<HTMLSpanElement[]>([])

    useLayoutEffect(() => {
        if(!titleRef.current.length) return
        // if(!imgRef.current || !titleRef.current.length) return;
        // gsap.fromTo(
        //     imgRef.current,
        //     {scale:1.1},
        //     {scale:1, duration:3, ease: "power2.out"}
        // )


        const mid = (titleRef.current.length-1) / 2


    titleRef.current.forEach((el, i) => {
      const offset = (i - mid) * 30
      gsap.set(el, {
        x: offset,
        opacity: 0,
      })
    })

    const tl = gsap.timeline()

    tl.to(titleRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      stagger: 0.05,
      delay:1.5
    })

    tl.to(titleRef.current, {
      x: 0,
      duration: 0.8,
      ease: "power2.out",
    })
       
    return () => {
        tl.kill();
    }
    },[])

    return <div>
        <div className="overflow-hidden w-full relative h-80 flex justify-center items-center">
            <div className="text-white font-extrabold text-6xl font-serif uppercase">
{title.split("").map((char,i)=>(
                <span key={i} ref={(el) => {
                    if(el) titleRef.current[i] = el
                    }}
                     className="inline-block">
                    {char}
                </span>
            ))}
            </div>
            
        </div>
    </div>
}