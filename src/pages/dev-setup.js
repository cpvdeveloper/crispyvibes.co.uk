import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ExtensionListItem from '../components/ExtensionListItem'

const DevSetup = ({ location }) => (
  <Layout location={location}>
    <SEO title="Chrome extensions and dotfiles" />
    <div>
      <h3>Chrome</h3>
      <ul>
        <ExtensionListItem
          name="Github-Go"
          url="https://chrome.google.com/webstore/detail/githubgo/paojlcepodlafkpoecligghmbhjcmdhk?hl=en"
        />
        <ExtensionListItem
          name="Grammarly"
          url="https://chrome.google.com/webstore/detail/grammarly-for-chrome/kbfnbcaeplbcioakkpcpgfkobkghlhen?hl=en"
        />
        <ExtensionListItem
          name="Lighthouse"
          url="https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=en"
        />
        <ExtensionListItem
          name="Moment"
          url="https://chrome.google.com/webstore/detail/momentum/laookkfknpbbblfpciffpaejjkokdgca?hl=en"
        />
        <ExtensionListItem
          name="React Dev Tools"
          url="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en"
        />
        <ExtensionListItem
          name="Redux Dev Tools"
          url="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en"
        />
        <ExtensionListItem
          name="Refined GitHub"
          url="https://chrome.google.com/webstore/detail/refined-github/hlepfoohegkhhmjieoechaddaejaokhf?hl=en"
        />
        <ExtensionListItem
          name="Octotree"
          url="https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc?hl=en"
        />
        <ExtensionListItem
          name="uBlock"
          url="https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en"
        />
        <ExtensionListItem
          name="Mercury"
          url="https://chrome.google.com/webstore/detail/mercury/jecgkhhikedmghacamdomkngdfdodbcb?hl=en"
        />
        <ExtensionListItem
          name="Wappalyzer"
          url="https://chrome.google.com/webstore/detail/wappalyzer/gppongmhjkpfnbhagpmjfkannfbllamg?hl=en"
        />
      </ul>
    </div>
    <h3>VSCode</h3>
    <ExtensionListItem name="Bracket pair colorizer" />
    <ExtensionListItem name="colorize" />
    <ExtensionListItem name="GitLens" />
    <ExtensionListItem name="Import Cost" />
    <ExtensionListItem name="Prettier" />
    <ExtensionListItem name="vscode-icons" />
    <ExtensionListItem name="vscode-styled-components" />
  </Layout>
)

export default DevSetup
