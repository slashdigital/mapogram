import Link from 'next/link'
import Layout from '../components/Layout'
import Styles from './pages.module.css'

function IndexPage() {

  return (
    <Layout title="Mapogram">
      <div className={Styles.loading}>
        <div className={Styles.loading__up}>
          <div className={Styles.loading__up_left}>
            <p>Mapogram is a platform powered by <b>Cloud-based QGIS</b> and <b>PowerAutomate</b> to provide map generation service for the map they needed to deal with natural disaster like Forest fire, Flood event etc...</p>
          </div>
          <div className={Styles.loading__up_right}>
            <button className={Styles.loading__up_right_button}>Generate more</button>
          </div>
        </div>
        <div className={Styles.loading__bottom}>
          <p className={Styles.loading__bottom_header}>Hold on tight, we are generating the map for you....</p>
          <p className={Styles.loading__bottom_subheader}>Please wait</p>
          <p className={Styles.loading__bottom_req_id}>Request ID: xh3481f</p>
          <div className={Styles.loading__bottom_loading_bar}>
            <div className={Styles.loading__bottom_progress}/>
          </div>
          <div className={Styles.loading__bottom_refresh}>
            <button>Refresh if you don’t see progress</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
