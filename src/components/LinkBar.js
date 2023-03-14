import { SmallButton } from './SmallButton'

export const LinkBar = () => {
    return (
        <div className='link-bar'>
            <SmallButton text='Github' link='https://github.com/zoeferencova/missing-migrants-viz' icon='github' />
            <SmallButton text='Data source' link='https://missingmigrants.iom.int/downloads' icon='table-regular' />
        </div>
    )
};
