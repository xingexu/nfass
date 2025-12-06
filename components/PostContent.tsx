'use client'

import { useState, useEffect } from 'react'

interface PostContentProps {
  content: string
  maxLength?: number
}

export default function PostContent({ content, maxLength = 500 }: PostContentProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [textLength, setTextLength] = useState(0)
  
  // Check if content is HTML
  const isHTML = content.includes('<') && content.includes('>')
  
  useEffect(() => {
    if (isHTML && typeof window !== 'undefined') {
      // Extract text content from HTML to check length
      const div = document.createElement('div')
      div.innerHTML = content
      setTextLength((div.textContent || div.innerText || '').length)
    } else {
      setTextLength(content.length)
    }
  }, [content, isHTML])
  
  const shouldTruncate = textLength > maxLength && !isExpanded

  return (
    <div className="prose prose-lg max-w-none text-text">
      {isHTML ? (
        <div 
          dangerouslySetInnerHTML={{ __html: content }}
          className="prose prose-lg max-w-none"
        />
      ) : (
        <div className="whitespace-pre-wrap">
          {shouldTruncate ? content.substring(0, maxLength) + '...' : content}
        </div>
      )}
      
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(true)}
          className="quote-button px-4 py-2 mt-4"
        >
          READ MORE
        </button>
      )}
    </div>
  )
}
