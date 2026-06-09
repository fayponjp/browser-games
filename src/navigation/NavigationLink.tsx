import { Link } from '@tanstack/react-router'

export const NavigationLinks = ({ route, classes, children } : {route: string, classes?: string, children: React.ReactNode}) => {
    return (
        <Link 
            to={route}
            className={`px-5 py-2 ${classes} hover:-translate-x-3 transition ease-in-out rounded`}
            activeProps={{className: ''}}
        >
            {children}
        </Link>
    )
}