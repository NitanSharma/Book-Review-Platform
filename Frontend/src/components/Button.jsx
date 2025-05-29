import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ExternalLink, Star } from 'lucide-react';

const Button = () => {
  return (
   <div className="space-y-4 p-4 w-full max-w-xs ">
      {/* Want to Read Button */}
      <button className="w-full flex justify-between items-center bg-green-700 text-white rounded-full py-2 px-4 text-sm font-semibold">
        Want to Read
        <ChevronDown size={16} />
      </button>

      {/* Shop this series Button */}
      <button className="w-full flex justify-between items-center border-2 border-green-700 rounded-full py-2 px-4 text-sm text-green-700 font-medium">
        <div className="flex items-center gap-2">
          Shop this series
          <ExternalLink size={16} />
        </div>
        <ChevronDown size={16} />
      </button>

      {/* Rating Section */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <Star key={index} className="text-gray-400" size={20} />
          ))}
        </div>
        <span className="text-sm text-gray-600">Rate this book</span>
      </div>
    </div>
  )
}

export default Button