import { useState } from 'react'
import reactLogo from './assets/react.svg'
import homeLogo from './assets/home.svg'
import servicesLogo from './assets/services.svg'
import portfolioLogo from './assets/portfolio.svg'
import contactLogo from './assets/contact.svg'
import ImageDisplay from './components/ImageDisplay'
import NavigationMenu from './components/NavigationMenu'
import type { MenuItem } from './types'
import './App.css'

function App() {
  const menuItems: MenuItem[] = [
    {
      id: 'home',
      title: 'Home',
      image: homeLogo,
      description: 'Welcome to our main page'
    },
    {
      id: 'about',
      title: 'About',
      image: reactLogo,
      description: 'Learn more about us'
    },
    {
      id: 'services',
      title: 'Services',
      image: servicesLogo,
      description: 'Discover what we offer'
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      image: portfolioLogo,
      description: 'View our creative work'
    },
    {
      id: 'contact',
      title: 'Contact',
      image: contactLogo,
      description: 'Get in touch with us'
    }
  ]

  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuItems[0])

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
