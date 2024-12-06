import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import MobileViewCaldender from "@/components/MobileViewCaldender"

export default function Home() {
  return (
    <div className="flex-1">
      <MaxWidthWrapper>
        <MobileViewCaldender></MobileViewCaldender>
      </MaxWidthWrapper>
    </div>
  )
}
