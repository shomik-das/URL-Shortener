import { Link, BarChart3 } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] from-background via-card/50 to-background flex items-center justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
      <div className="w-full grid lg:grid-cols-2 gap-8 items-center transition-height">
        {/* Left side - Welcome content */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 px-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-balance leading-tight">
              Shorten Links. Share Smarter.
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Create short, shareable links in seconds. Track clicks, manage your
              URLs, and keep everything organized from a simple dashboard.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Link className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">
                Fast & reliable URL shortening
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">
                Real-time click tracking & analytics
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="w-full max-w-md mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
