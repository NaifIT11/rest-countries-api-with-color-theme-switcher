import { Moon } from "lucide-react";

export default function Header() {
  return (
    <div className="py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Where in the world?</h1>
          <button className="inline-flex gap-2 items-center">
            <Moon />
            <span className="text-base font-semibold">Dark Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
}
