import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Progress } from "../../@providers/components/ui/progress";
import { Skeleton } from "../../@providers/components/ui/skeleton";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 2000);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">
            Loading your experience
          </h1>
          <p className="text-sm text-muted-foreground">
            Please wait while we prepare everything for you
          </p>
        </div>

        <div className="space-y-6">
          <Progress value={progress} className="h-2 w-full" />
          <p className="text-center text-sm text-muted-foreground">
            {progress}% Complete
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
