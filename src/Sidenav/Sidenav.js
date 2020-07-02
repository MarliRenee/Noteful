import React, { Component } from 'react'
import './Sidenav.css'

class Sidenav extends Component {
    render () {
        return (
            <div className="sidenav">
                <a href="#">Folder 1</a>
                <a href="#">Folder 2</a>
                <a href="#">Folder 3</a>
            </div>
        )
    }
}

export default Sidenav