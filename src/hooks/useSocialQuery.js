import { useStaticQuery, graphql } from 'gatsby'

export const useProfilesQuery = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            profiles {
              medium
              github
            }
          }
        }
      }
    `
  )

  return site.siteMetadata.profiles
}
