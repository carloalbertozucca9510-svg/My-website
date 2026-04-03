import useReveal from '../hooks/useReveal';
import './About.css';

const blocks = [
  {
    num: '01',
    title: 'We use materials most brands can\'t afford.',
    body: 'At 10,000 units, premium fabric doesn\'t make financial sense. At 100, it does. Every drop uses the best available material for that design — weight, texture, construction. No shortcuts, because the model doesn\'t need any.',
  },
  {
    num: '02',
    title: '100 pieces. That\'s the whole run.',
    body: 'Not a limited edition with a waitlist. Not "exclusive" with 50,000 units. 100 tees per drop. Your number is proof of that.',
  },
  {
    num: '03',
    title: 'You don\'t pay for unsold stock.',
    body: 'Most brands produce more than they sell and build that loss into the price. We produce exactly what we sell. 100 pieces. Fully accounted for. The price is the price.',
  },
  {
    num: '04',
    title: 'Your number means something.',
    body: 'Low numbers go first. Once a drop is gone, it\'s gone. Unsold pieces from past drops are still available — with their original number. You\'re not buying a T-shirt. You\'re buying a specific piece, from a specific moment.',
  },
];

export default function About() {
  const ref = useReveal();

  return (
    <section className="about reveal" id="about" ref={ref}>
      <div className="about__watermark" aria-hidden="true">100</div>

      <div className="about__header">
        <p className="section-eyebrow">Why 100</p>
      </div>

      <div className="about__blocks">
        {blocks.map((block) => (
          <div className="about__block" key={block.num}>
            <div className="about__num" aria-hidden="true">{block.num}</div>
            <div className="about__content">
              <h3 className="about__title">{block.title}</h3>
              <p className="about__body">{block.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
