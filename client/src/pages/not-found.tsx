import { Card, CardContent } from "@/components/ui/card";
import { WarningCircle } from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-wi-bg">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <WarningCircle className="h-8 w-8 text-red-500" weight="fill" />
            <h1 className="text-2xl font-bold text-wi-t1">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-wi-t3">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
