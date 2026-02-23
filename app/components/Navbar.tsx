export default function Navbar() {
    return (
        <nav className="fixed flex items-center justify-end top-0 right-0 size-full max-h-10 lg:max-h-20 py-3 px-20 z-50">
            
            <ul className="flex items-center justify-between gap-10 text-base whitespace-nowrap">
                <li>O Kancelarii</li>
                <li>Czynności</li>
                <li>Opłaty</li>
                <li>Kontakt</li>
            </ul>
        </nav>
    )
}