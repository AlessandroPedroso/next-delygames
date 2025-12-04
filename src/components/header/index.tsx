import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="w-full h-28 bg-slate-100 text-black px-2">
      <div className="max-w-7xl mx-auto">
        <nav>
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo do site dalygames"
              width={184}
              height={40}
              quality={100}
              priority={true}
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}
