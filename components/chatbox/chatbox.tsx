"use client";

import React, {useState, useRef, useEffect} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  PlusCircleIcon,
  PhotoIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import logo from "@/public/page/freepik__the-style-is-candid-image-photography-with-natural__37512.png";

interface Message {
  sender: "user" | "bot";
  text: string;
  time: string;
  images?: ImagePreview[];
}

interface ImagePreview {
  id: string;
  src: string;
}

interface HandleRemoveImage {
  (id: string): void;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processMessages, setProcessMessages] = useState("done");
  const [textProcessing, setTextProcessing] = useState("");
  const abortFuncs = useRef<AbortController[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImagePreviews: ImagePreview[] = files.map((file) => ({
      id: URL.createObjectURL(file as Blob),
      src: URL.createObjectURL(file as Blob),
    }));
    setImagePreviews((prev) => [...prev, ...newImagePreviews]);
  };

  const handleRemoveImage: HandleRemoveImage = (id) => {
    setImagePreviews((prev) => prev.filter((image) => image.id !== id));
  };

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTo({
        top: boxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, textProcessing]);

  const handleSend = async () => {
    if (input.trim() === "") return;
    const abortController = new AbortController();
    abortFuncs.current.unshift(abortController);
    const userMessage: Message = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      images: imagePreviews,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);
    setProcessMessages("processing");

    let resultText = "";
    let urls: string[] = [];
    let accumulatedChunk = "";

    try {
      const chatboxUrl = process.env.NEXT_PUBLIC_CHATBOX_URL;

      if (!chatboxUrl) {
        throw new Error("Chatbox URL is not defined");
      }
      
      const response = await fetch(chatboxUrl, {
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              content: input,
              role: "user",
            },
          ],
        }),
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortController.signal,
      });

      if (!response.body) {
        throw new Error("Response body is null");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const {done, value} = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, {stream: true});
        accumulatedChunk += chunk;

        const objects = accumulatedChunk.split("\n");
        accumulatedChunk = objects.pop() || "";

        objects.forEach((obj) => {
          if (obj.trim()) {
            try {
              const result = JSON.parse(obj);

              if (result?.choices?.[0]?.messages?.[0]) {
                const msg = result.choices[0].messages[0];

                if (msg.role === "tool") {
                  try {
                    const toolContent = JSON.parse(msg.content);
                    if (toolContent.citations) {
                      toolContent.citations.forEach(
                        (citation: {url: string}) => {
                          if (citation.url) {
                            urls.push(citation.url);
                          }
                        },
                      );
                    }
                  } catch (e) {
                    if (!(e instanceof SyntaxError)) {
                      throw e;
                    }
                  }
                } else if (msg.role === "assistant") {
                  let content = msg.content;
                  content = content.replace(
                    /\[doc(\d+)\]/g,
                    (match: string, p1: string): string => {
                      const index = parseInt(p1, 10) - 1;
                      return urls[index]
                        ? `<a style="color:#1F4F82" href="${urls[index]}" target="_blank">[Ref${p1}]</a>`
                        : match;
                    },
                  );
                  resultText += content;
                }
                if (obj.length > 0) {
                  setTextProcessing(resultText);
                }
              }
            } catch (e) {
              console.error("Parsing error: ", e);
              if (!(e instanceof SyntaxError)) {
                throw e;
              }
            }
          }
        });
      }
    } catch (e) {
      console.error("Request error: ", e);
      const errorMessage =
        "Sorry an error occurred. Please try again. If the problem persists, please contact the site administrator.";
      const errorChatMsg: Message = {
        sender: "bot",
        text: errorMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, userMessage, errorChatMsg]);
    } finally {
      setLoading(false);
      if (resultText !== "") {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: resultText,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }
      setProcessMessages("done");
      setTextProcessing("");
    }

    setImagePreviews([]);
    urls = [];
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  const toggleChatBox = () => {
    setIsChatBoxVisible(!isChatBoxVisible);
  };

  return (
    <div className='fixed bottom-16 right-4 z-[999999]'>
      {!isChatBoxVisible && (
        <div className='flex items-center justify-center w-16 h-16 rounded-full cursor-pointer'>
          <Image
            src='https://i.pinimg.com/736x/9c/76/0b/9c760b151faf6e0a69bf6ddf13006f00.jpg'
            alt='Message Icon'
            width={64}
            height={64}
            className='rounded-full'
            onClick={toggleChatBox}
          />
        </div>
      )}
      {isChatBoxVisible && (
        <div className='fixed bottom-16 right-4 w-96 h-[600px] max-w-md rounded-xl border shadow-lg z-[100] bg-white'>
          <div className='bg-black py-2 rounded-t-xl flex items-center justify-between px-4'>
            <p className='text-white font-bold text-xl'>Kogan AI Assistant</p>
            <button onClick={toggleChatBox} className='text-white'>
              Close
            </button>
          </div>
          <div className='bg-gray-100 flex items-center py-4 space-x-5 pl-5'>
            <Image
              src={logo}
              alt='logo'
              width={48}
              height={48}
              className='rounded-full object-cover w-[48px] h-[48px]'
            />
            <div className='flex-col'>
              <p>Chat with us 24/7</p>
            </div>
          </div>
          <div
            ref={boxRef}
            className='h-[400px] overflow-y-scroll mb-4 p-4 bg-white'
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start mb-4 ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {message.sender === "bot" && (
                  <Image
                    src={logo}
                    alt='bot-avatar'
                    width={32}
                    height={32}
                    className='rounded-full mr-2 min-w-[32px] h-[32px]'
                  />
                )}
                <div
                  className={`flex-col border-[1px] border-[#ccc] p-[10px] rounded-[10px] ${
                    message.sender === "user"
                      ? "items-end"
                      : "items-start bg-[#f3f3f3]"
                  }`}
                >
                  {message.images && message.images.length > 0 && (
                    <div className='flex flex-wrap gap-1'>
                      {message.images.map((image) => (
                        <Image
                          key={image.id}
                          src={image.src}
                          alt={`Selected ${image.id}`}
                          width={45}
                          height={45}
                          className='object-cover rounded-md border'
                        />
                      ))}
                    </div>
                  )}
                  <ReactMarkdown
                    className='text-xs text-gray-500 mt-1'
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {message.text}
                  </ReactMarkdown>
                  <div className='text-xs text-gray-500 mt-1'>
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
            {/* Display processing message */}
            {loading && processMessages === "processing" && (
              <div
                className={`w-full flex items-start mb-4 ${
                  messages.length % 2 === 0 ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Image
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGljy8ouUODVtOniU5jzF6r-4xJ-dOjEiU3g&s'
                  alt='bot-avatar'
                  width={32}
                  height={32}
                  className='rounded-full mr-2'
                />
                <div className='flex-col border-[1px] border-[#ccc] p-[10px] rounded-[10px] items-start'>
                  <ReactMarkdown
                    className='text-xs text-gray-500 mt-1'
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {textProcessing}
                  </ReactMarkdown>
                  <div className='text-xs text-gray-500 mt-1'>
                    Generating answers...
                  </div>
                </div>
              </div>
            )}
            {loading && processMessages === "processing" && (
              <div className='flex justify-center items-end absolute bottom-6 left-0 right-0 mb-4'>
                <button
                  disabled
                  type='button'
                  className='py-1.5 px-2.5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200  focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center'
                >
                  <svg
                    aria-hidden='true'
                    role='status'
                    className='inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='#1C64F2'
                    />
                  </svg>
                  Loading...
                </button>
              </div>
            )}
          </div>

          {imagePreviews.length > 0 && (
            <div className='flex gap-4 px-1 py-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 bg-white'>
              {imagePreviews.map((image) => (
                <div key={image.id} className='relative'>
                  <Image
                    src={image.src}
                    alt='Selected'
                    width={45}
                    height={45}
                    className='object-cover rounded-md border'
                  />
                  <XCircleIcon
                    width={16}
                    color='black'
                    className='absolute top-0 right-0 -mt-2 -mr-2 cursor-pointer'
                    onClick={() => handleRemoveImage(image.id)}
                  />
                </div>
              ))}
            </div>
          )}

          <div className='flex items-center border-t border-gray-300 bg-white rounded-b-lg shadow-sm'>
            <div className='hover:opacity-80 flex items-center'>
              <PlusCircleIcon
                width={25}
                color='black'
                onClick={handleNewChat}
                title='Create new chat'
                className='cursor-pointer flex items-center justify-center ml-4'
              />
              <PhotoIcon
                width={25}
                color='black'
                onClick={handleFileInputClick}
                title='add image'
                className='cursor-pointer flex items-center justify-center ml-4'
              />
            </div>
            <input
              type='file'
              hidden
              ref={fileInputRef}
              accept='image/*'
              multiple
              onChange={handleFileChange}
            />
            <input
              type='text'
              value={input}
              onKeyDown={(e) =>
                processMessages !== "processing" &&
                e.key === "Enter" &&
                handleSend()
              }
              onChange={(e) => setInput(e.target.value)}
              className='flex-grow p-4 border-none outline-none text-gray-700 placeholder-gray-500 rounded-l-lg'
              placeholder='Type a message...'
            />
            <button
              onClick={handleSend}
              disabled={processMessages === "processing"}
              className={`p-4 text-gray-500 font-semibold transition-colors duration-300 rounded-r-lg ${
                processMessages === "processing"
                  ? "cursor-not-allowed"
                  : "hover:text-gray-700 hover:underline"
              }`}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
