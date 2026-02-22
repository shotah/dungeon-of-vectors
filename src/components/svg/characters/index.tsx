import WarriorPortrait from './WarriorPortrait';
import MagePortrait from './MagePortrait';
import RoguePortrait from './RoguePortrait';
import ClericPortrait from './ClericPortrait';
import type { CharacterClass } from '../../../types';

const PORTRAIT_MAP: Record<CharacterClass, React.ComponentType<{ size?: number }>> = {
  warrior: WarriorPortrait,
  mage: MagePortrait,
  rogue: RoguePortrait,
  cleric: ClericPortrait,
};

export function CharacterPortrait({ characterClass, size = 60 }: { characterClass: CharacterClass; size?: number }) {
  const Component = PORTRAIT_MAP[characterClass];
  return <Component size={size} />;
}
