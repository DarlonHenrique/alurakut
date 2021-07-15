import Box from '../Box'
import {AlurakutProfileSidebarMenuDefault} from '../../lib/AlurakutCommons'

function ProfileSidebar(props) {

    return (
        <>
            <Box as="aside" >
                <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} alt="Profile Photo" />
                <hr />

                <p>
                    <a className="boxlink" href={`https://github.com/${props.githubUser}`}>
                        @{props.githubUser}
                    </a>
                </p>

                <hr />
                <AlurakutProfileSidebarMenuDefault />
            </Box>
        </>
    )
}

export default ProfileSidebar;