import { Link, type LinkProps } from '@tanstack/react-router'

export const NavigationLink = ({ route, classes, children } : {route: LinkProps['to'], classes?: string, children: React.ReactNode}) => {
    return (
        <Link 
            to={route}
            className={`px-5 py-2 ${classes} text-white hover:scale-105 transition ease-in-out -skew-x-10`}
            activeProps={{className: 'bg-(--theme-green)/50 scale-105'}}
        >
            {children}
        </Link>
    )
}