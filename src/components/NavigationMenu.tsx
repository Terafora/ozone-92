import React from 'react'
import type { MenuItem } from '../types'

interface NavigationMenuProps {
  menuItems: MenuItem[]
  selectedItem: MenuItem
  onItemSelect: (item: MenuItem) => void
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ 
  menuItems, 
  selectedItem, 
  onItemSelect 
}) => {
  return (
    <div className="right-column">
      <nav className="main-navigation">
        <h1>Navigation</h1>
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li 
              key={item.id}
              className={`nav-item ${selectedItem.id === item.id ? 'active' : ''}`}
              onClick={() => onItemSelect(item)}
              onMouseEnter={() => onItemSelect(item)}
            >
              <span className="nav-title">{item.title}</span>
              <span className="nav-description">{item.description}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default NavigationMenu
