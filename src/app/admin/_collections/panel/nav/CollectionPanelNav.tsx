import PanelNavItem from './PanelNavItem'

type Props = {
    navItems: { name: string, value: string }[],
    onSelectNavItem: (value: string) => void,
    currentSection: string
}

export default function CollectionPanelNav({ navItems, onSelectNavItem, currentSection } : Props) {

    const onClickNavItem = (value: string) => onSelectNavItem(value)

    return (
        <menu className='flex w-full justify-center max-w-full uppercase divide-x'>
            {
                navItems.map((item, index) => {
                    return (
                        <PanelNavItem 
                            className='bg-neutral-900 p-1 px-4 text-base cursor-pointer hover:bg-neutral-700 data-[active="true"]:bg-neutral-800 data-[active="true"]:pointer-events-none'
                            key={ index }
                            isActive={ currentSection == item.value }
                            item={ item }
                            onClickNavItem={ onClickNavItem }
                        />
                    )
                })
            }
        </menu>
    )
}
