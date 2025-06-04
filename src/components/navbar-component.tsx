import Link from "next/link";

interface NavBarComponentProps {
    href?: string,
    link_text: string,
    onClick?: () => void
}

export default function NavBarComponent({ href, link_text, onClick }: NavBarComponentProps) {
    return (
        <div className="p-2 text-yellow-500 hover:bg-amber-100 rounded-full cursor-pointer" onClick={onClick}>
            {href ?
                (
                    <Link href={href}>
                        <div>
                            {link_text}
                        </div>
                    </Link>
                ) :
                <button type="button" className="cursor-pointer">{link_text}</button>
            }
        </div>
    )
}