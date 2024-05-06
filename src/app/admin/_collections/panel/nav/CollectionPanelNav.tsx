import PanelNavItem from './PanelNavItem'

type Props = {
    navItems: { name: string, value: string }[],
    onSelectNavItem: (value: string) => void,
    currentSection: string
}

export default function CollectionPanelNav({ navItems, onSelectNavItem, currentSection } : Props) {

    const onClickNavItem = (value: string) => onSelectNavItem(value)

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
