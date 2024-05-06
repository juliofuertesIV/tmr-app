import { IContestSectionName } from './ContestPanel'
import ContestPanelNavItem from './ContestPanelNavItem'

type Props = {
    navItems: { name: string, value: IContestSectionName }[],
    onSelectNavItem: (value: IContestSectionName) => void,
    currentSection: IContestSectionName
}

export default function ContestPanelNav({ navItems, onSelectNavItem, currentSection } : Props) {

    const onClickNavItem = (value: IContestSectionName) => onSelectNavItem(value)

    return (
        <menu className='flex gap-2 justify-center uppercase'>
            {
                navItems.map((item, index) => {
                    return (
                        <ContestPanelNavItem 
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
