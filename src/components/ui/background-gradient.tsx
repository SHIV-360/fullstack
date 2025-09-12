import { cn } from "@/lib/utils";

export const BackgroundGradient = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={cn("absolute inset-0 z-0", className)}>
      <div
        className="absolute inset-0 bg-gradient-to-t from-background to-transparent"
        style={{
            maskImage: "radial-gradient(ellipse at center, white 20%, transparent 70%)"
        }}
      ></div>
       <div
        className="absolute inset-0"
        style={{
            background: "radial-gradient(circle at center, hsla(var(--primary)/0.1), transparent 70%)",
            opacity: 0.5,
        }}
      ></div>
    </div>
  );
};
