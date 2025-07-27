import React, { useEffect, useRef, useState } from 'react'
import type { MenuItem } from '../types'

interface NavigationMenuProps {
  menuItems: MenuItem[]
  selectedItem: MenuItem
  onItemSelect: (item: MenuItem) => void
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ 
  menuItems, 
  onItemSelect 
}) => {
  const [scrollOffset, setScrollOffset] = useState(0)
  const navRef = useRef<HTMLUListElement>(null)
  
  // Calculate visible range
  const visibleRange = 8 // Show 8 items above and below center
  const visibleCount = visibleRange * 2 + 1 // Total visible items

  // Get the menu item that should be selected based on current scroll
  const getSelectedMenuItem = () => {
    const index = ((scrollOffset % menuItems.length) + menuItems.length) % menuItems.length
    return menuItems[index]
  }

  // Set initial selected item only once when component mounts
  useEffect(() => {
    if (menuItems.length > 0) {
      const initialItem = getSelectedMenuItem()
      onItemSelect(initialItem)
    }
  }, [menuItems.length]) // Only depend on menuItems.length to avoid infinite loops

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? 1 : -1
      const newScrollOffset = scrollOffset + delta
      setScrollOffset(newScrollOffset)
      
      // Calculate selected item with the NEW scroll offset
      const index = ((newScrollOffset % menuItems.length) + menuItems.length) % menuItems.length
      const selectedItem = menuItems[index]
      onItemSelect(selectedItem)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        const delta = e.key === 'ArrowDown' ? 1 : -1
        const newScrollOffset = scrollOffset + delta
        setScrollOffset(newScrollOffset)
        
        // Calculate selected item with the NEW scroll offset
        const index = ((newScrollOffset % menuItems.length) + menuItems.length) % menuItems.length
        const selectedItem = menuItems[index]
        onItemSelect(selectedItem)
      }
    }

    const navElement = navRef.current
    if (navElement) {
      navElement.addEventListener('wheel', handleWheel, { passive: false })
    }
    
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      if (navElement) {
        navElement.removeEventListener('wheel', handleWheel)
      }
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [scrollOffset, menuItems]) // Include dependencies for the event handlers

  // Remove the duplicate useEffect that was causing infinite loops

  return (
    <div className="right-column sonic-menu">
      <nav className="main-navigation">
        <h1 className="menu-title">MAIN MENU</h1>
        <ul ref={navRef} className="nav-list sonic-nav">
          {Array.from({ length: visibleCount }, (_, visibleIndex) => {
            // Calculate the actual position in the infinite scroll
            const globalPosition = scrollOffset - visibleRange + visibleIndex
            
            // Get the menu item for this position (wrapping around)
            const menuIndex = ((globalPosition % menuItems.length) + menuItems.length) % menuItems.length
            const item = menuItems[menuIndex]
            
            // Calculate relative position for styling
            const relativeIndex = visibleIndex - visibleRange
            
            // Check if this item is at the center position (where selection should be)
            const isSelected = visibleIndex === 8 // Center position in the 17-item visible range
            
            return (
              <li 
                key={`${item.id}-${globalPosition}`}
                className={`nav-item sonic-item ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  // Calculate the scroll offset needed to center this item
                  const targetScrollOffset = globalPosition
                  setScrollOffset(targetScrollOffset)
                  
                  // Update selected item when clicking
                  onItemSelect(item)
                }}
                style={{ 
                  '--item-index': visibleIndex, // Fixed cascade position
                  '--scroll-offset': relativeIndex, // Vertical scroll offset
                  zIndex: isSelected ? 10 : 1
                } as React.CSSProperties}
              >
                <div className="sonic-item-bg">
                  <span className="nav-title sonic-title">{item.title.toUpperCase()}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default NavigationMenu
