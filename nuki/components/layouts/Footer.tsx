import React from 'react'

import { Home, User, Settings, Info } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const footerItems = [
    { icon: Home, label: 'ホーム', href: '/' },
    { icon: User, label: 'プロフィール', href: '/profile' },
    { icon: Settings, label: '設定', href: '/settings' },
    { icon: Info, label: 'お知らせ', href: '/information' },
  ]

  return (
    <footer className="flex justify-around sticky bottom-0 items-center bg-gray-200/10 backdrop-blur-lg border-x border-t border-gray-200/30 shadow-lg py-4 rounded-t-3xl bg-fixed">
      {footerItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex flex-col items-center"
        >
          <item.icon className="w-6 h-6 mb-1" />
          {item.label}
        </Link>
      ))}
    </footer>
  )
}

export default Footer
