"use client";

import Image from "next/image";
import page from "@/public/page/page.png";

export default function Home() {
  return (
    <div>
      <Image
        src={page}
        alt='page'
        width={1842}
        height={743}
        layout='intrinsic'
        className='w-full h-full'
      />
    </div>
  );
}
