import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"


interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  trackStyle?: string;
  rangeStyle?: string;
  thumbStyle?: string;
}


const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
  >(({ className,trackStyle, rangeStyle, thumbStyle, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className={cn("relative h-2 w-full grow overflow-hidden rounded-full bg-red-400",trackStyle)}>
      <SliderPrimitive.Range className={cn("absolute h-full bg-green-500",rangeStyle)} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={cn(" block h-5 w-5 rounded-full bg-white transition-all focus:outline-none focus:scale-150 disabled:pointer-events-none disabled:opacity-50",thumbStyle)} />
    <SliderPrimitive.Thumb className={cn(" block h-5 w-5 rounded-full bg-white transition-all focus:outline-none focus:scale-150 disabled:pointer-events-none disabled:opacity-50",thumbStyle)} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
