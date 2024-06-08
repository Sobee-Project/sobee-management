"use client"
import { ArrowDown, ArrowUp } from "lucide-react"
import React from "react"
import { SpringsNumber } from "../../_components"

type Props = {
  title: string
  subtitle?: string
  icon: React.ReactNode | JSX.Element
  color: string
  value: number
  indicator?: "up" | "down"
  indicatorText?: string
  note?: string
  link?: string
  linkText?: string
  isSpring?: boolean
}

const StickerCard = ({
  title,
  subtitle = "",
  icon,
  color,
  value,
  indicator,
  indicatorText = "",
  note = "",
  link,
  linkText,
  isSpring = false
}: Props) => {
  return (
    <div
      className=' flex size-full flex-col rounded-lg border border-b-4 border-gray-200 bg-white p-5 shadow-lg dark:bg-slate-800 md:p-6'
      style={{ borderBottomColor: color }}
    >
      <div className='mb-auto flex w-full items-center justify-between'>
        <div className='me-3 flex size-14 shrink-0 items-center justify-center rounded bg-gray-100/80 dark:bg-slate-500/80'>
          {icon}
        </div>
        <div className='flex w-full flex-col text-end'>
          <span className='mb-1 text-base font-normal text-slate-500 dark:text-slate-300'>{title}</span>
          <span className='text-xs font-semibold text-slate-500'>{subtitle}</span>
          {isSpring ? (
            <SpringsNumber to={value} className='mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-300' />
          ) : (
            <span className='mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-300'>{value}</span>
          )}
        </div>
      </div>

      {indicator === "up" && (
        <span className='mb-12 inline-block text-sm font-semibold text-slate-500' style={{ color: "#03D3B5" }}>
          <ArrowUp width='9px' height='11px' className='inline-block' /> {indicatorText}
          <span className='text-sm font-normal text-slate-500'> {note}</span>
        </span>
      )}
      {indicator === "down" && (
        <span className='mb-12 inline-block text-sm font-semibold text-slate-500' style={{ color: "#FC6687" }}>
          <ArrowDown width='9px' height='11px' className='inline-block' /> {indicatorText}
          <span className='text-sm font-normal text-slate-500'> {note}</span>
        </span>
      )}
      {link && (
        <a className='text-xs font-semibold text-purple-700 no-underline' href={link} target='_blank' rel='noreferrer'>
          {linkText}
        </a>
      )}
    </div>
  )
}

export default StickerCard
