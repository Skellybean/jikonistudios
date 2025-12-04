'use client'
import React from 'react'

interface LoadingScreenProps {
  progress?: number
}

const LoadingScreen = ({ progress }: LoadingScreenProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
            <div className="text-center max-w-md w-full px-6">

                <div className="mb-8">
                    <img
                        src="/logo.png"
                        alt="Jikoni Studios"
                        className="h-24 w-auto mx-auto animate-pulse"
                    />
                </div>

      
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>

          
                {progress !== undefined && (
                    <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{progress}%</p>
                    </div>
                )}

                <p className="text-gray-700 text-lg font-medium">
                    Preparing your experience...
                </p>
            </div>
        </div>
    )
}

export default LoadingScreen
