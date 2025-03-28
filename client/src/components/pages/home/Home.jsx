import Stories from '../../stories/Stories'
import   './home.scss'
import Posts from "../../posts/Posts"

import Share from '../../share/Share'
function Home() {
  return (
    <div>
      <div className="home">
        <Stories/>
        <Share/>
        <Posts/>
      </div>
    </div>
  )
}

export default Home
