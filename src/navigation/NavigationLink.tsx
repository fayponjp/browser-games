import { Link, type LinkProps } from '@tanstack/react-router'

export const NavigationLink = ({ route, classes, children } : {route: LinkProps['to'], classes?: string, children: React.ReactNode}) => {
    return (
        <Link 
            to={route}
            className={`px-5 py-3 ${classes} hover:scale-105 transition ease-in-out`}
            activeProps={{className: 'bg-(--theme-color)/90 text-white scale-105'}}
        >
            {children}
        </Link>
    )
}