import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import ProfileRelationsBox from '../src/components/ProfileRelationsBox'
import ProfileSidebar from '../src/components/ProfileSidebar'

/* -------------------------------------------------------------------------- */
/*                                    Home                                    */
/* -------------------------------------------------------------------------- */

export default function Home() {

  // using state for add community on the array communities
  const [communities, setCommunities] = React.useState([{
    id: '1827633281329481234',
    title: 'eu odeio acordar cedo',
    image: 'https://www.socialdub.com/groupspictures/7700/77001444150335401430.jpg?x2'
  }]);

  const githubUser = 'darlonhenrique';

  const people = [
    'akitaonrails', 'peas',
    'maykbrito', 'gunnarcorrea',
    'omariosouto', 'filipedeschamps'
  ]

  const [followers, setFollowers] = React.useState([]);

  React.useEffect(() => {
    fetch('https://api.github.com/users/peas/followers')
    .then((serverResponse) => {
      return serverResponse.json();
    })
    .then((completeResponse) => {
      setFollowers(completeResponse);
    })
  }, [])

  /* ---------------------------- Displayed Content --------------------------- */

  return (
    <>

      {/* Menu for mobile version */}
      <AlurakutMenu />

      <MainGrid>

        {/* -------------------------- Profile Area Column Redering -------------------------- */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        {/* --------------------------- Welcome Area Column -------------------------- */}
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Welcome, {githubUser}
            </h1>

            {/* Icons below welcome */}
            <OrkutNostalgicIconSet />
          </Box>

          <Box>

            {/* Form to create a community */}
            <h2>What do you want to do?</h2>
            <form onSubmit={function HandleCreateComunity(e) {
              e.preventDefault();

              /* get create community infos */
              const communityData = new FormData(e.target)
              const community = {

                id: new Date().toISOString(),
                title: communityData.get('title'),
                image: communityData.get('image')
              }

              /* -------------------------- updateCommunities ------------------------- */

              setCommunities([...communities, community])

            }}>

              {/* ------------------------------- Form Inputs ------------------------------ */}
              <h2 className="subTitle"></h2>
              <div>
                <input
                  placeholder="what will be name of you community"
                  name="title"
                  aria-label="what will be name of you community"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Isert a URL image for the cover"
                  name="image"
                  aria-label="Isert a URL image for the cover"
                />
              </div>
              <button>
                Create community
              </button>
            </form>
          </Box>
        </div>

        {/* ---------------------- Profile Relations Area Column --------------------- */}
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="followers" items={followers} />

          <ProfileRelationsBoxWrapper>

            {/* Favorites communitys */}
            <h2 className="smallTitle">
              Communities ({communities.length})
            </h2>

            <ul>
              {communities.map((community) => {
                return (
                  <li key={community.id}>
                    <a href={`/users/${community.title}`}>
                      <img src={community.image} />
                      <span>{community.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          {/* Favorite Peoplo Block */}
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              People of the community ({people.length})
            </h2>

            {/* script to display people on the third column */}
            <ul>
              {people.map((person) => {
                return (
                  <li key={person}>
                    <a href={`/users/${person}`}>
                      <img src={`https://github.com/${person}.png`} />
                      <span>{person}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )
}