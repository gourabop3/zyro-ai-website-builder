import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-muted-foreground/10 bg-background/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-12 flex items-center justify-between px-4 py-4">
        <Link
          href={"/workspaces"}
          className="flex items-center gap-2 font-bold text-lg text-foreground"
        >
          <Image src="/logo.svg" alt="Zyro Logo" width={28} height={28} />
          Zyro
        </Link>
        <div className="flex gap-8 items-center">
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <div className="flex justify-center items-center">
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}
