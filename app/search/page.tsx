"use client";

import {Suspense, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";
import sidebar from "@/public/page/sidebar.png";
import headerBottom from "@/public/page/headerBottom.png";
import contact from "@/public/page/contact.png";
import {faker} from "@faker-js/faker";
import {Product, useProductContext} from "@/context/ProductContext";

function SearchContent() {
  const searchParams = useSearchParams();
  const keywords = searchParams?.get("keywords") ?? "Products";
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [data, setData] = useState<Product[]>([]);
  const {setSelectedProduct, imageSearch} = useProductContext();

  const fetchSearchData = async (keywords: string) => {
    if (keywords) {
      try {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL;
        
        if (!appUrl) {
          throw new Error("NEXT_PUBLIC_APP_URL is not defined");
        }

        const response = await fetch(appUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: keywords,
            profile: "ecommerce",
          }),
        });

        const data = await response.json();

        if (data.isSuccess && data.body) {
          setData([...data.body.result]);
        } else {
          console.error("Failed to fetch suggested searches. Response:", data);
        }
      } catch (error) {
        console.error("Error fetching suggested searches:", error);
      }
    }
  };

  const handleNavigation = (id: string, product: Product) => {
    setSelectedProduct(product);
    router.push(`/product/${id}`);
  };

  useEffect(() => {
    if (imageSearch && keywords === "image") {
      setImage(imageSearch);
    } else {
      fetchSearchData(keywords);
    }
  }, [keywords, imageSearch]);

  return (
    <div className='bg-white px-6 py-9 rounded-sm shadow w-[calc(100%-596px)]'>
      <h1 className='mb-[10px] text-[21px] font-bold flex gap-3 items-center'>
        Search for{" "}
        {keywords === "image" && image ? (
          <span>
            <Image
              src={image}
              alt='image'
              width={132}
              height={132}
              className='w-[132px] h-[132px] object-cover rounded-sm'
            />
          </span>
        ) : (
          keywords
        )}
      </h1>
      <div className='w-auto flex gap-3 justify-end mb-6'>
        <div className='flex flex-col'>
          <label className='text-[#6b6b6b] text-[12px] mb-2'>Sort by:</label>
          <select className='h-[32px] p-[8px] text-[12px] bg-white border-[1px] border-[#6b6b6b] rounded-[2px]'>
            <option value=''>Relevance</option>
            <option value='featured'>Featured</option>
            <option value='rating'>Customer Rating</option>
            <option value='price'>Price - Lowest First</option>
            <option value='-price'>Price - Highest First</option>
            <option value='newest'>Newest</option>
            <option value='title'>Product Name A-Z</option>
            <option value='-title'>Product Name Z-A</option>
            <option value='-discount'>Highest % Discount</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <span className='text-[#6b6b6b] text-[12px] mb-2'>View as:</span>
          <div className='flex'>
            <button className='rounded-tl-[4px] font-bold text-center text-[12px] rounded-bl-[4px] w-[60px] h-[32px] py-2 border-[1px] border-[#041521] bg-[#f6ede6]'>
              Grid
            </button>
            <button className='rounded-tr-[4px] font-bold text-center text-[12px] rounded-br-[4px] w-[60px] h-[32px] py-2 border-[1px] border-[#041521]'>
              List
            </button>
          </div>
        </div>
      </div>
      <section className='grid grid-cols-3 gap-4'>
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <div
                onClick={() => handleNavigation(item.product_id, item)}
                key={item.sku}
                className='bg-white rounded-md shadow p-4 cursor-pointer pb-12'
              >
                {item.product_image_url.length > 0 ? (
                  <Image
                    src={item.product_image_url}
                    alt='Product'
                    width={400}
                    height={128}
                    className='mb-4 object-contain rounded-sm w-full h-[120px]'
                  />
                ) : (
                  <Image
                    src={faker.image.urlPicsumPhotos({width: 252, height: 160})}
                    alt='Product'
                    width={400}
                    height={128}
                    className='mb-4 object-contain rounded-sm w-full h-[120px]'
                  />
                )}
                <h3 className='font-semibold'>{item.product_name}</h3>
                <p className='text-red-500'>${item.product_price}</p>
              </div>
            );
          })
        ) : (
          <div className='col-span-3 text-center text-gray-500 text-lg'>
            No data
          </div>
        )}
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <div className='bg-[#eae8e9] min-h-screen'>
      <Image
        src={headerBottom}
        alt='headerBottom'
        width={1897}
        height={82}
        className='w-full'
      />
      <main className='container mx-auto px-5 py-9'>
        <div className='flex justify-between gap-4'>
          <aside className='w-[328px] pr-4'>
            <Image
              src={sidebar}
              alt='sidebar'
              width={328}
              height={825}
              layout='intrinsic'
              className='w-full h-full object-cover'
            />
          </aside>
          <Suspense fallback={<div>Loading search results...</div>}>
            <SearchContent />
          </Suspense>
          <aside className='w-[268px] pl-4'>
            <Image
              src={contact}
              alt='contact'
              width={268}
              height={869}
              layout='intrinsic'
              className='w-full h-full object-cover'
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
