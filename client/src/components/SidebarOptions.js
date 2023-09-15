import React from 'react'
import './SidebarOptions.css'

function SidebarOption({ active, text, Icon }) {
    return (
        <div className = {`sidebarOption ${active && 'sidebarOption--active' }`}> 
            {/* fetched from material ui */}
            <Icon />
            {/* fetched text */}
            <h2>{text}</h2>
        </div>
    )
}

export default SidebarOption