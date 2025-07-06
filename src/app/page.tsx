import * as stylex from '@stylexjs/stylex';
import { styles } from './page.styles';
import { Button } from '../components';

export default function Home() {
  return (
    <div {...stylex.props(styles.page)}>
      <section {...stylex.props(styles.hero)}>
        <div {...stylex.props(styles.heroContent)}>
          <h1 {...stylex.props(styles.heroTitle)}>Next.js + StyleX</h1>
          <p {...stylex.props(styles.heroSubtitle)}>
            Modern starter template with StyleX integration
          </p>

          <div {...stylex.props(styles.heroActions)}>
            <Button>Get Started</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
