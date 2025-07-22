import Link from 'next/link'

export default function NavbarTest() {
    return (
        <div>
            <Link href="/meny">Meny</Link>
            <Link href="/lunch-meny">Lunch meny</Link>
            <Link href="/boka">Boka bord</Link>
            <Link href="/recensioner">Recensioner</Link>
            <Link href="/kontakta">Kontakta oss</Link>
        </div>
    )
}