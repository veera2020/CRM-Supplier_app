/*
 *  Document    : Sidebar.js
 *  Author      : ticvic
 *  Description : sidebar
 */
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Images/logo.png"

const SidebarItems = [
    {
        name: "Dashboard",
        route: '/dashboard'
    },
    {
        name: "Employees",
        route: '/employees'
    },
    {
        name: "Projects",
        route: '/projects'
    },
    {
        name: "FAQ",
        route: '/faq'
    }
 ];
const Sidebar=()=> {
    return (
        <div className="col-span-2 min-h-screen sticky top-0 z-10 border-r border-gray-500">
            <div className="flex p-3">
                <img
                    src={logo}
                    alt="logo"
                    width={45}                        
                    height={45}
                />
                <div className="flex flex-col">
                    <div className="text-sm font-semibold">Ticvic</div>
                    <div className="text-xs">Employee Management</div>
                </div>
            </div>
        <div className="flex flex-col">
            {SidebarItems.map((item, index)=> (
                <NavLink exact key={index} to={item.route} activeClassName="text-primary">
                    <div className="sidebar">
                        <p className="pl-10 pb-4 cursor-pointer hover:text-primary">{item.name}</p>
                    </div>
                </NavLink>                    
            ))}
            </div>
        </div>
    );
}

export default Sidebar;