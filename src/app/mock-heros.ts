
/**
 * 创建模拟（mock）的英雄数据
 * Create a file called mock-heroes.ts in the src/app/ directory. 
 * Define a HEROES constant 常量 as an array of ten heroes and export it. 
 */

import { Hero } from './hero';

export const HEROES: Hero[] = [
  { id: 12, name: 'Dr. Nice' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr. IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];