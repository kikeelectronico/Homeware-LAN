import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Heading from '@theme/Heading';
import styles from './index.module.css';

const features = [
  {
    title: 'Easy to run',
    imageUrl: 'img/server.png',
    url: "",
    description: (
      <>
        Homeware runs in either a Raspberry Pi or an Ubuntu Server. Server illustration by <a href="https://pixabay.com/es/vectors/equipo-servidor-estaci%C3%B3n-de-trabajo-159837/" target="_blanck" rel="nofollow">OpenClipart-Vectors</a>.
      </>
    ),
  },
  {
    title: 'Focus on your hardware',
    imageUrl: 'img/ic.png',
    url: "",
    description: (
      <>
        Homeware handles the integration allowing you to focus in the hardware. IC illustration by <a href="https://pixabay.com/es/vectors/viruta-icono-micro-procesador-1710300/" target="_blanck" rel="nofollow">sinisamaric1</a>.
      </>
    ),
  },
  {
    title: 'Open Source',
    imageUrl: 'img/OSI_Keyhole.png',
    url: "http://opensource.org/",
    description: (
      <>
        Homeware is licensed under an Open Source Initiative approved license. <i>The OSI logo trademark is the trademark of Open Source Initiative.</i>
      </>
    ),
  },
];

function Feature({imageUrl, title, description, url}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          {
            url.length > 0
            ?
            <a href={url} target="_blanck">
              <img className={styles.featureImage} src={imgUrl} alt={title} />
            </a>
            :
            <img className={styles.featureImage} src={imgUrl} alt={title} />
          }

        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Homeware is a complete ecosystem that allows to connect your DIY devices to Google home.">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/install')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
