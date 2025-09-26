
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'

import { LogOutIcon } from 'lucide-react'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image
                        src="/logo.svg"
                        alt="Logo Sujeito Pizza"
                        width={190}
                        height={60}
                        priority
                        quality={100}
                    />
                </Link>

                <nav>
                    <Link href="/dashboard/category">
                        Categoria
                    </Link>
                    <Link href="/dashboard/product">
                        Produto
                    </Link>

                    <form>
                        <button type='submit'>
                            <LogOutIcon size={24} color="#FFF" />
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}