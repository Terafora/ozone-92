import React, { useState, useEffect } from 'react'
import './SplashScreen.css'

interface SplashScreenProps {
  onComplete: () => void
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState<'dropping' | 'centered' | 'complete'>('dropping')

  useEffect(() => {
    // Start the dropping animation immediately
    const dropTimer = setTimeout(() => {
      setAnimationPhase('centered')
    }, 3500) // Text takes 3.5s to reach center

    // Hold at center for 1 second, then complete
    const centerTimer = setTimeout(() => {
      setAnimationPhase('complete')
      // Give a small delay before calling onComplete to allow fade out
      setTimeout(() => {
        onComplete()
      }, 300)
    }, 4500) // 3.5s drop + 1s hold = 4.5s

    return () => {
      clearTimeout(dropTimer)
      clearTimeout(centerTimer)
    }
  }, [onComplete])

  return (
    <div className={`splash-screen ${animationPhase}`}>
      <div className="splash-content">
        <div className="gameboy-text">
          <div className="text-line">OZONE</div>
          <div className="text-line small">INDUSTRIES</div>
        </div>
        <div className="gameboy-logo">®</div>
      </div>
      <div className="scan-lines"></div>
    </div>
  )
}

export default SplashScreen
