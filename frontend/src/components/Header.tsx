import { getMenus } from '@/app/api/menu'
import HeaderClient from '@/components/header/HeaderClient'

const Header = async () => {
  const menusData = await getMenus()
  return <HeaderClient menus={menusData} />
}

export default Header