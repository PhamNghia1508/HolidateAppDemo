import { Card, CardContent } from "@/components/ui/card";

export const PremiumCanvas = (): JSX.Element => {
  return (
    <main className="min-h-screen w-full bg-[#f3eee8]">
      <section
        aria-label="Premium canvas"
        className="mx-auto flex min-h-screen w-full items-start justify-center bg-[#f3eee8]"
      >
        <Card className="h-auto min-h-screen w-full max-w-none rounded-none border-0 bg-[#f3eee8] shadow-none">
          <CardContent className="min-h-screen p-0" />
        </Card>
      </section>
    </main>
  );
};
