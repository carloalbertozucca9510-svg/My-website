import { vaultDrops } from '../data/drops';
import VaultCard from './VaultCard';
import useReveal from '../hooks/useReveal';
import './Vault.css';

export default function Vault() {
  const ref = useReveal();

  return (
    <section className="vault reveal" id="vault" ref={ref}>
      <div className="vault__watermark" aria-hidden="true">100</div>

      <div className="vault__header">
        <p className="section-eyebrow">Archive</p>
        <h2 className="section-heading">The Vault</h2>
        <p className="vault__subtitle">Past drops. Still numbered. Still real.</p>
      </div>

      <div className="vault__grid">
        {vaultDrops.map(drop => (
          <VaultCard key={drop.id} drop={drop} />
        ))}
      </div>
    </section>
  );
}
