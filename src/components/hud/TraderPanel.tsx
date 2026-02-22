import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { getTraderStock, getBuyPrice, getSellPrice } from '../../data/trader';
import { ItemIcon, GoldIcon } from '../svg/items/ItemIcons';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

type Tab = 'buy' | 'sell';

export default function TraderPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('buy');
  const gold = useGameStore(s => s.gold);
  const inventory = useGameStore(s => s.inventory);
  const currentFloor = useGameStore(s => s.currentFloor);
  const buyItem = useGameStore(s => s.buyItem);
  const sellItem = useGameStore(s => s.sellItem);

  const stock = getTraderStock(currentFloor);
  const sellables = inventory.filter(i => getSellPrice(i) > 0);

  return (
    <Modal onClose={onClose} title="Wandering Trader">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <GoldIcon size={16} />
        <span style={{ color: '#daa520', fontSize: 14, fontWeight: 'bold' }}>{gold}</span>
        <div style={{ flex: 1 }} />
        <Button
          size="sm"
          variant={tab === 'buy' ? 'gold' : 'secondary'}
          onClick={() => setTab('buy')}
        >
          Buy
        </Button>
        <Button
          size="sm"
          variant={tab === 'sell' ? 'gold' : 'secondary'}
          onClick={() => setTab('sell')}
        >
          Sell
        </Button>
      </div>

      <div style={{ fontSize: 10, color: '#888', marginBottom: 8 }}>
        {tab === 'buy'
          ? "Buy price is 1.5x item value. Better stock up while you can!"
          : "Sell price is 40% of item value. Lighten your pack for some coin."}
      </div>

      <div style={{ maxHeight: 320, overflow: 'auto' }}>
        {tab === 'buy' && stock.map((item, i) => {
          const price = getBuyPrice(item);
          const canAfford = gold >= price;
          return (
            <div
              key={`${item.id}-${i}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px',
                marginBottom: 4, borderRadius: 4,
                background: '#0f0f1a', border: '1px solid #2a2a3a',
              }}
            >
              <ItemIcon icon={item.icon} size={20} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#ddd' }}>{item.name}</div>
                <div style={{ fontSize: 9, color: '#888' }}>{item.description}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <GoldIcon size={12} />
                <span style={{ fontSize: 11, color: canAfford ? '#daa520' : '#aa4444' }}>
                  {price}
                </span>
              </div>
              <Button
                size="sm"
                variant="gold"
                disabled={!canAfford}
                onClick={() => buyItem(item.id)}
              >
                Buy
              </Button>
            </div>
          );
        })}

        {tab === 'sell' && sellables.length === 0 && (
          <div style={{ color: '#555', fontSize: 12, textAlign: 'center', padding: 20 }}>
            Nothing to sell.
          </div>
        )}

        {tab === 'sell' && sellables.map((item, i) => {
          const price = getSellPrice(item);
          return (
            <div
              key={`${item.id}-sell-${i}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px',
                marginBottom: 4, borderRadius: 4,
                background: '#0f0f1a', border: '1px solid #2a2a3a',
              }}
            >
              <ItemIcon icon={item.icon} size={20} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#ddd' }}>{item.name}</div>
                <div style={{ fontSize: 9, color: '#888' }}>{item.description}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <GoldIcon size={12} />
                <span style={{ fontSize: 11, color: '#daa520' }}>{price}</span>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => sellItem(item)}
              >
                Sell
              </Button>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <Button variant="secondary" onClick={onClose}>Leave (Esc)</Button>
      </div>
    </Modal>
  );
}
