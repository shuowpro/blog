import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { NavigationItem, NavigationItems } from '@/types'
import Link from 'next/link'

export const Navbar = ({ menu }: { menu: NavigationItems }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-10">
      <div className="mx-auto px-2">
        <div className="relative flex items-center justify-between h-16">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <HamburgerMenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {menu.map((menuGroup, i) => (
                <>
                  {i !== 0 && <DropdownMenuSeparator />}
                  <DropdownMenuGroup key={i}>
                    {menuGroup.map((menuItem) => (
                      <Link href={menuItem.href} key={menuItem.text}>
                        <DropdownMenuItem className="cursor-pointer">
                          <span className="p-2">{menuItem.icon}</span>
                          <span className="p-2">{menuItem.text}</span>
                        </DropdownMenuItem>
                      </Link>
                    ))}
                  </DropdownMenuGroup>
                </>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
