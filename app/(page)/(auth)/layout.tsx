import React, { PropsWithChildren } from "react"

const layout = ({ children }: PropsWithChildren) => {
  return <div className='overflow-hidden'>{children}</div>
}

export default layout
