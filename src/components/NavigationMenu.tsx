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

  // Update selected item whenever scroll changes
  useEffect(() => {
    const selectedItem = getSelectedMenuItem()
    console.log(`Scroll changed to ${scrollOffset}, selected: ${selectedItem.title}`)
    onItemSelect(selectedItem)
  }, [scrollOffset, menuItems]) // Removed onItemSelect to prevent infinite loops

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? 1 : -1
      setScrollOffset(prev => prev + delta)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        const delta = e.key === 'ArrowDown' ? 1 : -1
        setScrollOffset(prev => prev + delta)
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
  }, []) // Empty dependency array - event handlers don't need to be recreated

  // Set initial selected item and ensure it matches scroll position
  useEffect(() => {
    if (menuItems.length > 0) {
      const initialItem = getSelectedMenuItem()
      console.log(`Initial item: ${initialItem.title}`) // Debug log
      onItemSelect(initialItem)
    }
  }, [menuItems]) // Removed onItemSelect to avoid infinite loops

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
                  console.log(`Click: Setting scroll to ${targetScrollOffset} for item ${item.title}`) // Debug log
                  setScrollOffset(targetScrollOffset)
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
