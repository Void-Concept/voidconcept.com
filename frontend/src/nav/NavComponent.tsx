import React, { useState } from 'react';
import "./nav.css";
import { useHistory } from 'react-router';

type NavRoute = {
    name: string
    destination: string
}

type NavRouteCategory = {
    name: string
    routes: NavRoute[]
}

type NavHeaderRouteProps = {
    route: NavRoute
}

const NavHeaderRoute = ({ route }: NavHeaderRouteProps) => {
    const history = useHistory();
    const goToRoute = () => {
        history.push(route.destination)
    }

    return (
        <div className="nav-header-route" onClick={goToRoute}>
            <div className="nav-header-centering">
                <span>{route.name}</span>
            </div>
        </div>
    )
}

type NavHeaderCategoryProps = {
    category: NavRouteCategory
}

const NavHeaderCategory = ({ category }: NavHeaderCategoryProps) => {
    const [routeToggle, setRoutesToggle] = useState(false)

    const toggleRoutes = () => {
        setRoutesToggle(!routeToggle)
    }

    return (
        <>
            <div className="nav-header-category" onClick={toggleRoutes}>
                <div className="nav-header-centering">
                    <span>{category.name}</span>
                </div>
            </div>
            {routeToggle && category.routes.map((route, key) => {
                return <NavHeaderRoute key={key} route={route} />
            })}
        </>
    )
}

interface NavHeaderRoutes {
    routeCategories: NavRouteCategory[]
}

const NavHeader = ({ routeCategories }: NavHeaderRoutes) => {
    return (
        <div className="nav-header-container">
            <span className="nav-label">VC</span>
            <div className="nav-header-categories">
                {routeCategories.map((route, index) => {
                    return <NavHeaderCategory key={index} category={route} />
                })}
            </div>
        </div>
    )
}


interface NavComponentProps {
    routes: NavRouteCategory[]
}

export const NavComponent = ({ routes }: NavComponentProps) => {
    return (
        <div>
            <NavHeader routeCategories={routes} />
        </div>
    )
}