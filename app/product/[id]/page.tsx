"use client";

import Image from "next/image";
import headerBottom from "@/public/page/headerBottom.png";
import contact from "@/public/page/contact.png";
import announcement from "@/public/page/KMCC_VER_Announcement_KMCC_300_Jan25.png";
import finance1 from "@/public/page/Finance1.png";
import finance2 from "@/public/page/Finance2.png";
import finance3 from "@/public/page/Finance3.png";
import finance4 from "@/public/page/Finance4.png";
import {useProductContext} from "@/context/ProductContext";
import {faker} from "@faker-js/faker";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

interface AccordionItem {
  title: string;
}

const accordionData: AccordionItem[] = [{title: "Specifications"}];

export default function ProductID() {
  const {selectedProduct} = useProductContext();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='bg-[#eae8e9] min-h-screen'>
      <Image
        src={headerBottom}
        alt='headerBottom'
        width={1897}
        height={82}
        className='w-full'
      />
      <main className='container mx-auto px-5'>
        <div className='flex justify-between gap-4'>
          <div className='w-[calc(100%-268px)] bg-white shadow-md px-[2em]'>
            <div
              onClick={() => router.back()}
              className='flex items-center gap-1 text-[12px] text-[#041521] uppercase py-[1em]'
            >
              <span className='flex items-center gap-1'>
                <svg
                  fill='currentColor'
                  preserveAspectRatio='xMidYMid meet'
                  height='1em'
                  width='1em'
                  viewBox='0 0 40 40'
                  className='vertical-align-middle'
                >
                  <g>
                    <path d='m31.1 6.7l-11.8 11.9 11.8 11.8q0.5 0.4 0.5 1t-0.5 1l-3.7 3.7q-0.4 0.5-1 0.5t-1-0.5l-16.5-16.5q-0.5-0.4-0.5-1t0.5-1l16.5-16.6q0.5-0.4 1-0.4t1 0.4l3.7 3.7q0.5 0.4 0.5 1t-0.5 1z'></path>
                  </g>
                </svg>
                Products
              </span>
              <span>/</span>
              <span>{selectedProduct?.product_name}</span>
            </div>
            <div className='flex justify-between gap-[3em]'>
              <div className='w-[calc(100%-374px)]'>
                <Image
                  src={
                    selectedProduct?.product_image_url ||
                    faker.image.urlPicsumPhotos({width: 252, height: 160})
                  }
                  alt='product'
                  width={751}
                  height={501}
                  className='w-full'
                />
                <div className='border p-[2em]'>
                  <h2 className='font-bold mb-[0.5em]'>Description</h2>
                  <p className='text-justify mb-[2em] tracking-wide'>
                    {selectedProduct?.full_description}
                  </p>
                  <p className='text-justify mb-[2em] tracking-wide'>
                    {selectedProduct?.description}
                  </p>
                  <p className='text-justify mb-[2em] tracking-wide'>
                    {selectedProduct?.description_2}
                  </p>
                  <Image
                    src={announcement}
                    alt='Announcement'
                    width={680}
                    height={124}
                    className='w-full rounded-sm'
                  />
                </div>
                <div className='w-full mb-8'>
                  {accordionData.map((item, index) => (
                    <div
                      key={index}
                      className='border border-t-0 shadow-sm overflow-hidden'
                    >
                      <div
                        onClick={() => toggleAccordion(index)}
                        className='flex items-center justify-between px-6 py-4 cursor-pointer transition-all duration-300'
                      >
                        <span className='font-semibold text-xl text-gray-800'>
                          {item.title}
                        </span>
                        {activeIndex === index ? (
                          <FaChevronUp className='w-5 h-5 text-gray-600 transition-transform duration-300' />
                        ) : (
                          <FaChevronDown className='w-5 h-5 text-gray-600 transition-transform duration-300' />
                        )}
                      </div>

                      <div
                        className={`transition-all duration-300 ${
                          activeIndex === index
                            ? "max-h-[500px] opacity-100 py-4 px-6 bg-white"
                            : "max-h-0 opacity-0 py-0 px-6"
                        } overflow-hidden`}
                      >
                        <h4 className='text-base font-semibold text-gray-700 mb-3'>
                          General
                        </h4>

                        <div className='flex items-center gap-3 mb-3'>
                          <h3 className='font-semibold text-sm text-gray-700'>
                            Classification:
                          </h3>
                          <span className='text-sm font-medium text-gray-800'>
                            {selectedProduct?.classification}
                          </span>
                        </div>

                        <div className='flex items-center gap-2'>
                          <h3 className='font-semibold text-sm text-gray-700 whitespace-nowrap'>
                            Colors:
                          </h3>
                          <div className='flex gap-3 overflow-x-auto flex-nowrap ic'>
                            {selectedProduct?.color.map((color, index) => (
                              <div
                                key={index}
                                className='flex items-center justify-center px-3'
                              >
                                <span className='text-sm text-gray-700'>
                                  {color}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='w-[374px]'>
                <button
                  type='button'
                  title='Add to Wishlist'
                  className='flex items-center gap-1 ml-auto hover:text-red-600 hover:fill-red-600 text-[16px] font-bold'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                  >
                    <title id='wishlist-icon-0.012838829731468104'>
                      wishlist-icon
                    </title>
                    <path
                      fill='currentColor'
                      clipRule='evenodd'
                      fillRule='evenodd'
                      d='M2 8.62418C2 5.47372 4.5537 2.92001 7.70416 2.92001C9.58439 2.92001 11.0932 3.87685 12 5.09705C12.9068 3.87685 14.4156 2.92001 16.2958 2.92001C19.4463 2.92001 22 5.47372 22 8.62418C22 11.3745 20.3713 13.9772 18.5183 16.062C16.6525 18.1611 14.4852 19.8176 13.2591 20.6824C12.4981 21.219 11.5019 21.219 10.7409 20.6824C9.51476 19.8176 7.34749 18.1611 5.4817 16.062C3.62873 13.9772 2 11.3745 2 8.62418ZM7.70416 3.90861C5.09969 3.90861 2.98859 6.0197 2.98859 8.62418C2.98859 11.0025 4.41375 13.3723 6.2206 15.4052C8.01463 17.4236 10.1131 19.0299 11.3107 19.8745C11.73 20.1702 12.27 20.1702 12.6893 19.8745C13.8869 19.0299 15.9854 17.4236 17.7794 15.4052C19.5862 13.3723 21.0114 11.0025 21.0114 8.62418C21.0114 6.0197 18.9003 3.90861 16.2958 3.90861C14.4897 3.90861 13.095 4.99674 12.4379 6.25154C12.3526 6.41445 12.1839 6.51654 12 6.51654C11.8161 6.51654 11.6474 6.41445 11.5621 6.25154C10.905 4.99674 9.51031 3.90861 7.70416 3.90861Z'
                    ></path>
                  </svg>
                  <span>Add to wishlist</span>
                </button>
                <h1 className='text-[18px] py-2 font-bold'>
                  {selectedProduct?.product_name}
                </h1>
                <div className='flex items-center gap-[1em] my-[1.5em]'>
                  <div className='bg-[#e71333] rounded-r-md rounded-tl-full rounded-bl-full'>
                    <h5 className='text-white px-2 py-1 font-bold flex items-start'>
                      <span className='text-[19px] mt-2'>$</span>
                      <span className='text-[36px]'>
                        {selectedProduct?.product_price}
                      </span>
                    </h5>
                  </div>
                  <div className='flex gap-1'>
                    <span className='font-bold text-[11px] px-[6px] pt-[3px] pb-[4px] h-[18px] bg-[#ed1a3b] text-white mr-[3px]'>
                      FREE
                    </span>
                    <span className='font-bold text-[12px] pt-[3px] pb-[4px] px-0'>
                      Shipping
                    </span>
                  </div>
                </div>
                <button className='py-[0.5em] px-[1.5em] bg-[#e71333] rounded-[99999px] shadow-[0_2px_5px_rgba(0,0,0,0.16),_0_2px_3px_rgba(0,0,0,0.12)]'>
                  <span className='text-white text-center text-[16px] font-bold'>
                    Add to cart
                  </span>
                </button>
                <div>
                  <button className='w-full mt-[2.5em]'>
                    <div className='p-[12px] bg-[#f6ede6] rounded-t-lg flex flex-col gap-2'>
                      <div className='flex items-center justify-between'>
                        <span className='flex items-center gap-1 text-[16px] font-bold'>
                          Join
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='59'
                            height='20'
                            viewBox='0 0 59 20'
                            fill='none'
                          >
                            <g clipPath='url(#clip0_1722_2005)'>
                              <g clipPath='url(#clip1_1722_2005)'>
                                <path
                                  d='M57.7767 4.79643C58.2069 4.79643 58.5554 5.14499 58.5554 5.57516V14.4911C58.5554 14.9212 58.2069 15.2698 57.7767 15.2698H42.4221C41.9269 15.2698 41.5576 14.8147 41.6599 14.3306L43.5398 5.41471C43.6158 5.05509 43.934 4.79643 44.3019 4.79643H57.7767Z'
                                  fill='#E71333'
                                />
                                <path
                                  d='M49.664 13.0194C49.4344 13.0194 49.2173 12.9281 49.0569 12.7676L46.5603 10.271C46.2283 9.93906 46.2283 9.38855 46.5603 9.0566C46.8922 8.72464 47.4426 8.72464 47.7746 9.0566L49.664 10.946L53.9145 6.68445C54.2465 6.3525 54.7971 6.3525 55.1289 6.68445C55.4608 7.01642 55.4608 7.56693 55.1289 7.89887L50.2602 12.7676C50.0997 12.9281 49.8826 13.0194 49.653 13.0194H49.664Z'
                                  fill='white'
                                />
                                <path
                                  d='M6.7388 4.777H0.432932C0.193644 4.777 0 4.97065 0 5.20993V14.823C0 15.0622 0.193644 15.2559 0.432932 15.2559H2.33756C2.57685 15.2559 2.77049 15.0622 2.77049 14.823V11.3927H5.78026C6.01955 11.3927 6.21319 11.1991 6.21319 10.9598V9.2806C6.21319 9.04131 6.01955 8.84767 5.78026 8.84767H2.77049V7.32066H6.7388C6.97809 7.32066 7.17173 7.127 7.17173 6.88771V5.20855C7.17173 4.96926 6.97809 4.77562 6.7388 4.77562V4.777Z'
                                  fill='#041521'
                                />
                                <path
                                  d='M8.88962 14.823V5.20998C8.88962 4.9707 9.08328 4.77705 9.32257 4.77705H11.2272C11.4665 4.77705 11.6601 4.9707 11.6601 5.20998V14.823C11.6601 15.0623 11.4665 15.2559 11.2272 15.2559H9.32257C9.08328 15.2559 8.88962 15.0623 8.88962 14.823Z'
                                  fill='#041521'
                                />
                                <path
                                  d='M22.4475 14.6003L20.5401 11.4439C21.1182 11.1423 21.5761 10.7302 21.9081 10.2046C22.2524 9.66098 22.4239 9.03993 22.4239 8.34006C22.4239 7.64016 22.251 7.02328 21.9081 6.48384C21.5635 5.9444 21.0864 5.52115 20.4779 5.21132C19.8693 4.90149 19.1707 4.76594 18.3823 4.77701H14.4735C14.2342 4.77701 14.0406 4.97203 14.0406 5.20994V14.823C14.0406 15.0623 14.2342 15.2559 14.4735 15.2559H16.3781C16.6174 15.2559 16.811 15.0623 16.811 14.823V11.9321H17.5331C17.6894 11.9321 17.8332 12.0165 17.9093 12.1507L19.5456 15.036C19.623 15.1715 19.7654 15.2545 19.9218 15.2545H22.0768C22.4143 15.2545 22.6217 14.8866 22.4475 14.5975V14.6003ZM19.3409 8.87949C19.2302 9.03856 19.0808 9.16441 18.8913 9.25432C18.7018 9.34424 18.4819 9.3885 18.233 9.3885H16.811V7.3082H18.233C18.6119 7.3082 18.919 7.40504 19.1541 7.60005C19.3879 7.79509 19.5055 8.04129 19.5055 8.34143C19.5055 8.54061 19.4501 8.72042 19.3409 8.88087V8.87949Z'
                                  fill='#041521'
                                />
                                <path
                                  d='M27.9054 15.433C27.4448 15.4454 26.7062 15.3611 26.2637 15.2338C25.7948 15.0996 25.3687 14.9115 24.9841 14.6722C24.5997 14.433 24.2829 14.1605 24.034 13.8562C23.9054 13.6999 23.8044 13.5394 23.7284 13.3734C23.6176 13.13 23.749 12.8451 24.0063 12.7731L25.9981 12.2213C26.1792 12.1715 26.3729 12.242 26.4739 12.4011C26.5597 12.5352 26.6689 12.657 26.8031 12.7635C27.0231 12.9378 27.3065 13.0359 27.6565 13.0553C27.9359 13.065 28.182 12.9903 28.3979 12.8312C28.6122 12.6722 28.7202 12.4619 28.7202 12.2019C28.7202 12.0318 28.6579 11.8699 28.5334 11.715C28.4089 11.5601 28.2111 11.4481 27.9414 11.3789L26.3701 10.975C25.8307 10.8353 25.3701 10.6209 24.9855 10.3319C24.6011 10.0428 24.3065 9.68868 24.1032 9.26959C23.8985 8.85048 23.7961 8.38159 23.7961 7.8629C23.7961 6.83521 24.1377 6.03435 24.8209 5.46034C25.5043 4.88632 26.4656 4.60001 27.7021 4.60001C28.3605 4.60001 28.9414 4.68438 29.4462 4.85451C29.9499 5.02464 30.3842 5.29159 30.7493 5.65537C31.0078 5.9154 31.2361 6.23076 31.4325 6.60423C31.5612 6.84766 31.4352 7.14918 31.171 7.22525L29.2692 7.77577C29.081 7.8297 28.8876 7.74394 28.7823 7.57936C28.7188 7.47977 28.6357 7.38018 28.5334 7.28059C28.3287 7.08141 28.0522 6.98045 27.7021 6.98045C27.3521 6.98045 27.1005 7.05513 26.9164 7.20451C26.7312 7.3539 26.6398 7.57382 26.6398 7.8629C26.6398 8.04271 26.7145 8.19901 26.864 8.33457C27.0132 8.46873 27.2277 8.57108 27.5071 8.64162L29.0936 9.04552C29.8917 9.2447 30.5156 9.63752 30.965 10.2212C31.4146 10.8049 31.6385 11.4716 31.6385 12.2199C31.6385 12.9087 31.481 13.4924 31.1669 13.971C30.853 14.4496 30.4007 14.8147 29.8114 15.0637C29.272 15.2919 28.6357 15.4164 27.904 15.4358L27.9054 15.433Z'
                                  fill='#041521'
                                />
                                <path
                                  d='M41.1604 4.77705H33.3428C33.1033 4.77705 32.9099 4.9707 32.9099 5.20998V6.88916C32.9099 7.12845 33.1033 7.32209 33.3428 7.32209H35.874V14.823C35.874 15.0623 36.0674 15.2559 36.3069 15.2559H38.2115C38.4507 15.2559 38.6444 15.0623 38.6444 14.823V7.32209H40.8257C41.065 7.32209 41.2115 7.12845 41.2587 6.88916C41.2587 6.88916 41.5117 5.6277 41.5947 5.20998C41.6417 4.97623 41.4011 4.77705 41.1618 4.77705H41.1604Z'
                                  fill='#041521'
                                />
                              </g>
                            </g>
                            <defs>
                              <clipPath id='clip0_1722_2005'>
                                <rect width='59' height='20' fill='white' />
                              </clipPath>
                              <clipPath id='clip1_1722_2005'>
                                <rect
                                  width='58.7321'
                                  height='11'
                                  fill='white'
                                  transform='translate(0 4.60001)'
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <button className='flex items-center gap-1 text-[14px] font-bold'>
                          Learn More
                          <svg
                            fill='currentColor'
                            preserveAspectRatio='xMidYMid meet'
                            height='1em'
                            width='1em'
                            viewBox='0 0 40 40'
                          >
                            <g>
                              <path d='m31.2 19.6l-16.6 16.5q-0.4 0.5-1 0.5t-1-0.5l-3.7-3.7q-0.4-0.4-0.4-1t0.4-1l11.9-11.8-11.9-11.9q-0.4-0.4-0.4-1t0.4-1l3.7-3.7q0.5-0.4 1-0.4t1 0.4l16.6 16.6q0.4 0.4 0.4 1t-0.4 1z'></path>
                            </g>
                          </svg>
                        </button>
                      </div>
                      <div>
                        <span className='flex items-start gap-1 text-[14px]'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='18'
                            viewBox='0 0 88 107'
                            fill='none'
                          >
                            <g id='Kogan rewards'>
                              <path
                                id='Vector'
                                d='M15.1006 103.712C26.0653 101.564 38.9984 100.719 52.9126 100.528C55.2388 100.497 57.4663 99.5468 59.1138 97.9055L83.351 73.6683C84.4493 72.57 84.1099 70.6757 82.666 70.1018C82.629 70.0833 82.5858 70.071 82.5488 70.0525C77.6125 68.1211 71.9851 69.4848 68.178 73.1685L55.3252 84.9847'
                                stroke='#E71333'
                                strokeWidth='6.5'
                                strokeMiterlimit='10'
                                strokeLinecap='round'
                              />
                              <path
                                id='Vector_2'
                                d='M33.3833 86.916H51.3637C54.1404 86.916 56.3925 84.6638 56.3925 81.8872C56.3925 79.1105 54.1404 76.8583 51.3637 76.8583H38.4306C35.6663 76.8583 32.9698 76.1919 30.4091 75.1553C22.1038 71.7863 11.0836 77.4815 4 84.8366'
                                stroke='#E71333'
                                strokeWidth='6.5'
                                strokeMiterlimit='10'
                                strokeLinecap='round'
                              />
                              <circle
                                id='Ellipse 845'
                                cx='44.0001'
                                cy='32.5105'
                                r='28.9722'
                                stroke='#E71333'
                                strokeWidth='6.5'
                              />
                              <path
                                id='$'
                                d='M38.7751 45.4491L38.7788 45.4506C39.7756 45.8493 40.8842 46.1166 42.1009 46.2572V49.7562C42.1009 50.9669 43.0824 51.9484 44.2931 51.9484C45.5038 51.9484 46.4853 50.9669 46.4853 49.7562V46.2358C47.7594 46.067 48.8964 45.7433 49.8898 45.2567C51.4165 44.509 52.5935 43.4832 53.393 42.1719C54.1856 40.872 54.5801 39.4295 54.5801 37.8574C54.5801 35.9742 53.7797 34.2359 52.2597 32.6531C50.8696 31.177 48.9313 30.1133 46.4853 29.4344V21.0234C46.974 21.192 47.4227 21.4141 47.8333 21.6878L47.8333 21.6878L47.8387 21.6913C48.4421 22.0835 48.9431 22.5378 49.3468 23.0526C50.0435 23.941 51.2797 24.6018 52.5114 24.1584C53.6751 23.7394 54.4666 22.3714 53.7194 21.1528C53.4148 20.6561 53.0496 20.1739 52.6259 19.706C51.7397 18.6944 50.595 17.8842 49.2075 17.2676C48.3784 16.8991 47.47 16.6419 46.4853 16.4924V13.9712C46.4853 12.7605 45.5038 11.779 44.2931 11.779C43.0824 11.779 42.1009 12.7605 42.1009 13.9712V16.4667C39.9386 16.7422 38.162 17.454 36.8078 18.6381C35.0153 20.1756 34.1389 22.3009 34.1389 24.9411C34.1389 26.4071 34.4514 27.7027 35.1002 28.8057L35.1052 28.8141L35.1104 28.8223C35.7764 29.8689 36.6627 30.7372 37.7605 31.4273L37.7605 31.4273L37.7665 31.431C38.8777 32.11 40.0941 32.6175 41.4129 32.9549L41.4177 32.9561L42.1009 33.1244V41.9159C41.1703 41.7298 40.3586 41.3874 39.6575 40.8967C39.0669 40.4832 38.5839 40.0371 38.2023 39.5607C37.5177 38.706 36.3103 38.0529 35.1033 38.477C33.9387 38.8862 33.1646 40.2509 33.9039 41.4565C34.2306 41.9892 34.6232 42.5064 35.0795 43.0083L35.0795 43.0084L35.0853 43.0146C36.0348 44.0273 37.2712 44.8353 38.7751 45.4491ZM40.1861 21.7809C40.6979 21.3443 41.3318 21.0246 42.1009 20.8346V28.3777C41.1694 28.082 40.4176 27.6913 39.8315 27.216C39.2196 26.6701 38.8771 25.8545 38.8771 24.6757C38.8771 23.443 39.3137 22.4994 40.1787 21.7871L40.1788 21.7871L40.1861 21.7809ZM46.4853 41.7469V34.3794C47.2349 34.6963 47.881 35.0611 48.4274 35.4709L48.4274 35.4709L48.4332 35.4752C49.392 36.1748 49.8418 37.0453 49.8418 38.1228C49.8418 39.246 49.3451 40.1767 48.2643 40.9416C47.773 41.2853 47.1821 41.556 46.4853 41.7469Z'
                                fill='#E71333'
                                stroke='#E71333'
                                strokeWidth='1.11111'
                              />
                            </g>
                          </svg>
                          Earn <b>100%</b> Rewards Credit
                        </span>
                      </div>
                      <div className='flex items-center justify-center border border-[#e71333] bg-white p-[6px] rounded-[12px]'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='18'
                          viewBox='0 0 22 20'
                          fill='none'
                        >
                          <g id='Group 5170682'>
                            <path
                              id='Rectangle 930'
                              d='M3.733 16.9756L1.16076 5.57112C1.07198 5.17746 1.31912 4.78636 1.71278 4.69757L17.394 1.16075C17.7876 1.07196 18.1787 1.31911 18.2675 1.71277L19.4733 7.05863'
                              stroke='#E71333'
                              strokeWidth='1.25127'
                              strokeLinejoin='bevel'
                            />
                            <rect
                              id='Rectangle 930_2'
                              x='3.73297'
                              y='6.69409'
                              width='17.5365'
                              height='12.4217'
                              rx='0.730686'
                              stroke='#E71333'
                              strokeWidth='1.25127'
                              strokeLinejoin='bevel'
                            />
                            <path
                              id='$'
                              d='M11.4583 15.7097L11.4589 15.7099C11.6709 15.7947 11.908 15.8508 12.1697 15.879V16.6345C12.1697 16.8707 12.3612 17.0622 12.5974 17.0622C12.8337 17.0622 13.0252 16.8707 13.0252 16.6345V15.875C13.2985 15.8411 13.5408 15.7734 13.7511 15.6704C14.0651 15.5166 14.3059 15.3064 14.4693 15.0384C14.6316 14.7722 14.7124 14.4769 14.7124 14.1543C14.7124 13.7708 14.5497 13.4154 14.2368 13.0896C13.9476 12.7825 13.5416 12.5611 13.0252 12.4209V10.6052C13.1443 10.6424 13.2529 10.694 13.3515 10.7597L13.3515 10.7597L13.3523 10.7602C13.4806 10.8436 13.5875 10.9404 13.6738 11.0504C13.8143 11.2297 14.0598 11.3581 14.3005 11.2715C14.5306 11.1887 14.6809 10.9218 14.5373 10.6877C14.4748 10.5858 14.3998 10.4867 14.3125 10.3903C14.131 10.183 13.8959 10.0164 13.6099 9.8893C13.4328 9.8106 13.2378 9.75647 13.0252 9.72625V9.17555C13.0252 8.9393 12.8337 8.74779 12.5974 8.74779C12.3612 8.74779 12.1697 8.9393 12.1697 9.17555V9.72149C11.7116 9.77598 11.3384 9.92363 11.0563 10.1704C10.6901 10.4844 10.5101 10.9188 10.5101 11.4621C10.5101 11.7634 10.5743 12.0282 10.7064 12.2528L10.7064 12.2528L10.708 12.2554C10.8444 12.4697 11.0259 12.6477 11.2513 12.7893L11.2513 12.7893L11.2522 12.7899C11.4813 12.9299 11.7321 13.0345 12.0043 13.1042L12.0051 13.1044L12.1697 13.1449V15.0354C11.9576 14.9978 11.773 14.9227 11.6145 14.8117C11.4894 14.7242 11.3866 14.6293 11.3051 14.5276C11.1669 14.355 10.9273 14.2282 10.6916 14.311C10.4618 14.3917 10.3148 14.6577 10.4568 14.8892C10.5239 14.9986 10.6046 15.1049 10.6986 15.2083L10.6986 15.2083L10.6995 15.2093C10.894 15.4168 11.1479 15.583 11.4583 15.7097ZM11.7224 10.7812C11.8411 10.6799 11.9894 10.6085 12.1697 10.5694V12.2179C11.955 12.1541 11.7822 12.067 11.6486 11.9585C11.5129 11.8377 11.4394 11.6587 11.4394 11.4068C11.4394 11.1418 11.5338 10.9366 11.7213 10.7821L11.7213 10.7822L11.7224 10.7812ZM13.0252 15.0028V13.3858C13.2006 13.4564 13.3508 13.5392 13.4767 13.6335L13.4776 13.6342C13.6844 13.7851 13.7831 13.975 13.7831 14.2096C13.7831 14.4544 13.6739 14.6569 13.4419 14.821C13.3277 14.9009 13.1892 14.962 13.0252 15.0028Z'
                              fill='#E71333'
                              stroke='#E71333'
                              strokeWidth='0.173253'
                            />
                          </g>
                        </svg>
                        <span className='mx-1 text-[14px]'>
                          Earn $250 in vouchers^
                        </span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='14'
                          height='14'
                          viewBox='0 0 14 14'
                        >
                          <title id='info-icon-0.9820859442423702'>
                            info-icon
                          </title>
                          <path
                            d='M6.33333 3.66667H7.66666V5H6.33333V3.66667ZM6.33333 6.33334H7.66666V10.3333H6.33333V6.33334ZM7 0.333336C3.31999 0.333336 0.333328 3.32 0.333328 7C0.333328 10.68 3.31999 13.6667 7 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.32 10.68 0.333336 7 0.333336ZM7 12.3333C4.06 12.3333 1.66666 9.94 1.66666 7C1.66666 4.06 4.06 1.66667 7 1.66667C9.93999 1.66667 12.3333 4.06 12.3333 7C12.3333 9.94 9.93999 12.3333 7 12.3333Z'
                            fill='#666666'
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className='bg-[#e71333] text-white text-[12px] text-left py-[6px] px-[12px] rounded-b-lg font-bold'>
                      Try 14 days of Kogan FIRST for free. Cancel anytime.
                    </div>
                  </button>
                </div>
                <div className='py-[18px] border-t mt-[2em]'>
                  <h4 className='mb-[12px] text-[16] font-[500]'>
                    Finance available
                  </h4>
                  <div className='flex items-center gap-3'>
                    <Image
                      src={finance1}
                      alt='finance1'
                      width={51}
                      height={24}
                    />
                    <Image
                      src={finance2}
                      alt='finance2'
                      width={64}
                      height={24}
                    />
                    <Image
                      src={finance3}
                      alt='finance3'
                      width={68}
                      height={24}
                    />
                    <Image
                      src={finance4}
                      alt='finance4'
                      width={43}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-[#f7f7f7] h-[36px] w-[calc(100%+4em)] ml-[-2em]' />
          </div>
          <aside className='w-[268px] pl-4 mt-[2em]'>
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
