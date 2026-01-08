import { Link2, BarChart3, ShieldCheck, Zap } from "lucide-react"
import Image from "next/image"

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
          <h2 className="text-4xl font-semibold">
            Powerful link management made simple
          </h2>
          <p className="max-w-sm sm:ml-auto">
            From shortening links to tracking performance, Sintra gives you
            everything you need to manage your URLs efficiently.
          </p>
        </div>

        <div className="px-3 pt-3 md:-mx-8">
          <div className="aspect-88/36 mask-b-from-75% mask-b-to-95% relative">
            <Image
              src="/image.png"
              className="absolute inset-0 z-10"
              alt="dashboard preview"
              width={2797}
              height={1137}
            />
            <Image
              src="/image.png"
              className="hidden dark:block"
              alt="dashboard preview dark"
              width={2797}
              height={1137}
            />
            <Image
              src="/image.png"
              className="dark:hidden"
              alt="dashboard preview light"
              width={2797}
              height={1137}
            />
          </div>
        </div>

        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Link2 className="size-4" />
              <h3 className="text-sm font-medium">Short Links</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Instantly convert long URLs into clean, shareable short links.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="size-4" />
              <h3 className="text-sm font-medium">Click Analytics</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Track total clicks and monitor how your links perform in real time.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4" />
              <h3 className="text-sm font-medium">Secure Access</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Authenticated dashboards ensure only you can manage your links.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="size-4" />
              <h3 className="text-sm font-medium">Fast & Reliable</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Optimized backend ensures quick redirects and minimal latency.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
