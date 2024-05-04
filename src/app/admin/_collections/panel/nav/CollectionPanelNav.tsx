import PanelNavItem from './PanelNavItem'

type Props = {
    navItems: { name: string, value: string | null }[],
    onSelectNavItem: (value: string | null) => void,
    currentSection: string | null
}

export default function CollectionPanelNav({ navItems, onSelectNavItem, currentSection } : Props) {

    const onClickNavItem = (value: string | null) => onSelectNavItem(value)

    return (
        <menu className='flex gap-2 justify-center uppercase'>
            {
                navItems.map((item, index) => {
                    return (
                        <PanelNavItem 
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
