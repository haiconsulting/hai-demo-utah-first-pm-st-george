import { Cormorant, Inter } from "next/font/google";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-hai-display",
  display: "swap",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-hai-sans", display: "swap" });

export default function PitchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${cormorant.variable} ${inter.variable} hai min-h-dvh bg-[#fbf7f0] text-[#4a4038]`}
      style={{ fontFamily: "var(--font-hai-sans), Helvetica, Arial, sans-serif" }}
    >
      {children}
    </div>
  );
}
