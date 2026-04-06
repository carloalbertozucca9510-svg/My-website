import useReveal from '../hooks/useReveal';
import './About.css';

const blocks = [
  {
    num: '01',
    title: 'Materials most maisons can\'t justify.',
    body: 'At 100 pieces, we can source materials that make no financial sense at scale. Every drop uses the finest available for that design — chosen without compromise, because the model demands nothing less.',
  },
  {
    num: '02',
    title: 'One hundred. The entire edition.',
    body: 'Not a limited run of thousands. Not exclusive with exceptions. One hundred pieces, produced once, never repeated. Your number is the proof.',
  },
  {
    num: '03',
    title: 'You pay for the object. Nothing else.',
    body: 'Luxury brands overproduce and price for the unsold. You subsidise every piece that never finds an owner. Vistoria produces exactly what it sells. The price reflects the object.',
  },
  {
    num: '04',
    title: 'Your number is permanent.',
    body: 'Reserved early, your number is low. Each piece carries its edition number — engraved before it leaves our hands. You are not acquiring a bag. You are acquiring a specific object from a specific moment.',
  },
];

export default function About() {
  const ref = useReveal();

  return (
    <section className="about reveal" id="about" ref={ref}>
      <div className="about__header">
        <p className="section-eyebrow">Why 100</p>
        <h2 className="section-heading">The Standard</h2>
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
