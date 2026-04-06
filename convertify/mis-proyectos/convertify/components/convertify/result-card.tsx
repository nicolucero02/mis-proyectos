import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ResultCardProps {
  title: string;
  items: string[];
}

export function ResultCard({ title, items }: ResultCardProps) {
  return (
    <Card className="h-full p-6 sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 p-2 text-amber-200">
          <AlertCircle className="h-4 w-4" />
        </span>
        <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300 sm:text-base">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
