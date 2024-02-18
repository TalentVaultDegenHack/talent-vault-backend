import { userEntities } from '../user/user.module';
import { skillsEntities } from '../skills/skills.module';
import { blockchainEntities } from '../blockchain/blockchain.module';

export const entities = [
  ...userEntities,
  ...skillsEntities,
  ...blockchainEntities,
];
