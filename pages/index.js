import React from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import ProfileRelationsBox from '../src/components/ProfileRelationsBox'
import ProfileSidebar from '../src/components/ProfileSidebar'

/* -------------------------------------------------------------------------- */
/*                                    Home                                    */
/* -------------------------------------------------------------------------- */

export default function Home(props) {
  // using state for add community on the array communities
  const [communities, setCommunities] = React.useState([]);

  // // My github user, used for my ProfileSidebar and Photo
  const githubUser = props.githubUser;

  // Array to set te people on ProfileRelationsArea
  const people = [
    'akitaonrails', 'peas',
    'maykbrito', 'gunnarcorrea',
    'omariosouto', 'filipedeschamps'
  ]

  /* ----- Using State and Effect to ser followers taking from github API ----- */
  const [followers, setFollowers] = React.useState([]);

  React.useEffect(() => {
    fetch('https://api.github.com/users/peas/followers')
      .then((serverResponse) => {
        return serverResponse.json();
      })
      .then((completeResponse) => {
        setFollowers(completeResponse);
      })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '2bac4315c85f0031063e13472e48a4',
        'Content-Type': 'application/json',
        'Accept': 'application/json',

      },
      body: JSON.stringify({
        "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
      .then((response) => response.json())
      .then((completeResponse) => {
        const datoCommunities = completeResponse.data.allCommunities;
        setCommunities(datoCommunities)
      })
  }, [])

  return ( /* ---------------------------- Rendering Content --------------------------- */
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        {/* ---------------------- Profile Area Column Redering ---------------------- */}
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
              const newCommunity = new FormData(e.target)
              const community = {
                title: newCommunity.get('title'),
                imageUrl: newCommunity.get('image'),
                creatorSlug: githubUser
              }

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(community)
              })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.createdRecord);
                  const community = dados.createdRecord;
                  setCommunities([...communities, community])
                })
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
                    <a href={`/communities/${community.id}`}>
                      <img src={community.imageUrl} />
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  console.log('cookies: ', cookies)
  const token = cookies.USER_TOKEN
  const { githubUser } = jwt.decode(token)


  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((response) => {
      return response.json()
    })

  console.log('isAuthenticated ', isAuthenticated)
  
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {
      githubUser
    },
  }
}