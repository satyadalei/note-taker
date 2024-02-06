import React, { ReactNode } from "react"

interface PageSectionsContent{
    children?: ReactNode;
    className?: string;
}
const PageSection : React.FC<PageSectionsContent> = ({children, className}) => {
  return (
    <div className={`min-h-screen w-full ${className}`} >
        {children}
    </div>
  )
}

export default PageSection