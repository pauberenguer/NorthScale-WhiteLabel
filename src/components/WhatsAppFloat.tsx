"use client";

import { site } from "@/lib/content";

export function WhatsAppFloat() {
  return (
    <a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="wa-float group fixed right-5 bottom-5 z-[60] inline-flex h-16 w-16 items-center justify-center rounded-full shadow-[0_12px_30px_rgba(37,211,102,0.42),0_4px_10px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out hover:scale-105 md:right-6 md:bottom-6 max-[600px]:h-14 max-[600px]:w-14 max-[600px]:right-4 max-[600px]:bottom-4"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 -z-10 animate-wa-pulse rounded-full bg-[#25D366]/35" />

      {/* Green circle + icon */}
      <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#25D366]">
        <svg viewBox="0 0 32 32" className="h-10 w-10 max-[600px]:h-[34px] max-[600px]:w-[34px]" fill="white">
          <path d="M16.004 2.002c-7.732 0-14.002 6.27-14.002 14.002 0 2.47.655 4.88 1.898 6.994L2 30l7.188-1.884A13.94 13.94 0 0 0 16.004 30c7.732 0 14.002-6.27 14.002-14.002S23.736 2.002 16.004 2.002zm0 25.63a11.58 11.58 0 0 1-5.906-1.617l-.424-.252-4.392 1.152 1.174-4.286-.276-.44a11.56 11.56 0 0 1-1.774-6.187c0-6.408 5.216-11.624 11.628-11.624 6.408 0 11.624 5.216 11.624 11.624 0 6.412-5.216 11.63-11.654 11.63zm6.376-8.71c-.35-.174-2.07-1.02-2.39-1.138-.32-.116-.553-.174-.786.176-.232.35-.904 1.138-1.108 1.372-.204.232-.408.262-.758.088-.35-.176-1.476-.544-2.812-1.734-1.04-.926-1.74-2.07-1.944-2.42-.204-.35-.022-.54.154-.714.158-.156.35-.408.524-.612.176-.204.234-.35.35-.582.118-.232.06-.436-.028-.61-.088-.176-.786-1.896-1.078-2.596-.284-.68-.572-.588-.786-.6-.204-.008-.436-.01-.67-.01s-.612.088-.932.436c-.32.35-1.222 1.194-1.222 2.914s1.252 3.38 1.426 3.612c.176.232 2.462 3.758 5.966 5.27.834.36 1.484.574 1.992.736.836.266 1.598.228 2.2.138.67-.1 2.07-.846 2.362-1.662.292-.818.292-1.52.204-1.664-.088-.146-.32-.232-.67-.408z" />
        </svg>
      </span>

      {/* Tooltip - desktop only */}
      <span className="pointer-events-none absolute right-[calc(100%+14px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-[10px] bg-[var(--color-ink,#0e0e0e)] px-3.5 py-2 text-[13px] font-medium text-white opacity-0 shadow-[0_6px_18px_rgba(0,0,0,0.18)] transition-all duration-200 ease-out group-hover:opacity-100 group-hover:-translate-x-0.5 group-hover:-translate-y-1/2 max-[600px]:hidden">
        Chatea con nosotros
        <span className="absolute -right-[5px] top-1/2 -translate-y-1/2 rotate-45 h-2.5 w-2.5 bg-[var(--color-ink,#0e0e0e)]" />
      </span>
    </a>
  );
}
