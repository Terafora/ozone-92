import { useState } from 'react'
import reactLogo from './assets/react.svg'
import blogLogo from './assets/blog.svg'
import chatLogo from './assets/chat.svg'
import toyboxLogo from './assets/toybox.svg'
import patchlogsLogo from './assets/patchlogs.svg'
import ImageDisplay from './components/ImageDisplay'
import NavigationMenu from './components/NavigationMenu'
import SplashScreen from './components/SplashScreen'
import type { MenuItem } from './types'
import './App.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  
  const menuItems: MenuItem[] = [
    {
      id: 'blog',
      title: 'Blog',
      image: blogLogo,
      description: 'Welcome to our Blog page, bringing you information articles and updates straight from 2025 and beyond.'
    },
    {
      id: 'about',
      title: 'About',
      image: reactLogo,
      description: 'Learn more about us at Ozone92, where we explore the future of technology and design.'
    },
    {
      id: 'chat',
      title: 'Chat',
      image: chatLogo,
      description: 'Chat with our futuristic robot sitting on this site of the internet switchboard.'
    },
    {
      id: 'toybox',
      title: 'Toybox',
      image: toyboxLogo,
      description: 'Have a look at the toys we have created, from the 2025 toybox.'
    },
    {
      id: 'patchlogs',
      title: 'Patch Logs',
      image: patchlogsLogo,
      description: 'Stay updated with the latest changes and improvements'
    }
  ]

  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuItems[0])

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return (
    <div className="app-container">
      <ImageDisplay selectedItem={selectedItem} />
      <NavigationMenu 
        menuItems={menuItems}
        selectedItem={selectedItem}
        onItemSelect={setSelectedItem}
      />
    </div>
  )
}

export default App
