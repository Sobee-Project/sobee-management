"use client"
import { cn } from "@/_lib/utils"
import { ClassValue } from "clsx"
import React, { useCallback, useState } from "react"

type RatingStarsProps = {
  initialRating: number
  canHover?: boolean
  readOnly?: boolean
  containerClassName?: ClassValue
  starClassName?: ClassValue
}

const RatingStars = ({
  initialRating,

  containerClassName,
  starClassName,
  readOnly = false
}: RatingStarsProps) => {
  const [rating, setRating] = useState(initialRating)

  const getStarClass = (index: number) => {
    const effectiveRating = rating
    if (effectiveRating + 0.5 >= index + 1) {
      return "text-yellow-500"
    } else {
      return "text-gray-300 dark:text-gray-700"
    }
  }

  return (
    <div className={cn("flex", containerClassName)}>
      {[0, 1, 2, 3, 4].map((index) => (
        <div key={index} className={cn("relative", readOnly ? "cursor-default" : "cursor-pointer")}>
          <span className={cn(`block text-2xl ${getStarClass(index)}`, starClassName)}>&#9733;</span>
        </div>
      ))}
    </div>
  )
}

export default RatingStars
