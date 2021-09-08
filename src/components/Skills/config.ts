export type SkillLevel = 'expert' | 'ok' | 'learning'
export type Skill = {
  name: string
  level: SkillLevel
}

export const SkillColors: { [skill in SkillLevel]: string } = {
  expert: '#006300',
  ok: '#b97801',
  learning: '#ce0000',
}

export const SKILLS_CONFIG: Array<Skill> = [
  {
    name: 'React',
    level: 'expert',
  },
  {
    name: 'TypeScript',
    level: 'expert',
  },
  {
    name: 'Next.js',
    level: 'expert',
  },
  {
    name: 'GraphQL',
    level: 'expert',
  },
  {
    name: 'Hasura',
    level: 'expert',
  },
  {
    name: 'Pulumi',
    level: 'expert',
  },
  {
    name: 'Serverless Applications on AWS',
    level: 'expert',
  },
  {
    name: 'PostgreSQL',
    level: 'ok',
  },
  {
    name: 'Mint Lang',
    level: 'ok',
  },
  {
    name: 'Solidity & Smart Contracts on Ethereum',
    level: 'ok',
  },
  {
    name: 'Marlowe & Smart Contracts on Cardano',
    level: 'learning',
  },
]
