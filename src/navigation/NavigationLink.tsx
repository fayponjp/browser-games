import { Link } from '@tanstack/react-router'

export const NavigationLinks = ({ route, classes, children } : {route: string, classes?: string, children: React.ReactNode}) => {
    return (
        <Link 
            to={route}
            className={`px-5 py-2 ${classes} hover:scale-105 transition ease-in-out`}
            activeProps={{className: 'shadow-[inset_0_-2px_0_0_var(--theme-green)] '}}
        >
            {children}
        </Link>
    )
}