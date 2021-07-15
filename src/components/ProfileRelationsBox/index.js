import Box from '../Box'

function ProfileRelationsBox(props) {
    return (
        <>
            <Box>
                <h2 className="smallTitle">
                    {props.title} ({props.items.length})
                </h2>
            </Box>
            <ul>
            </ul>
        </>
    )
}

export default ProfileRelationsBox;