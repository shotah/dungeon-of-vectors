import type { Direction, Position } from '../types';

export const DIRECTION_DELTAS: Record<Direction, Position> = {
  N: { x: 0, y: -1 },
  S: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  W: { x: -1, y: 0 },
};

export function turnLeft(dir: Direction): Direction {
  const turns: Record<Direction, Direction> = { N: 'W', W: 'S', S: 'E', E: 'N' };
  return turns[dir];
}

export function turnRight(dir: Direction): Direction {
  const turns: Record<Direction, Direction> = { N: 'E', E: 'S', S: 'W', W: 'N' };
  return turns[dir];
}

export function turnAround(dir: Direction): Direction {
  const turns: Record<Direction, Direction> = { N: 'S', S: 'N', E: 'W', W: 'E' };
  return turns[dir];
}

export function getRelativeDirections(facing: Direction): { left: Direction; right: Direction; forward: Direction; back: Direction } {
  return {
    forward: facing,
    back: turnAround(facing),
    left: turnLeft(facing),
    right: turnRight(facing),
  };
}

export function moveInDirection(pos: Position, dir: Direction): Position {
  const delta = DIRECTION_DELTAS[dir];
  return { x: pos.x + delta.x, y: pos.y + delta.y };
}
