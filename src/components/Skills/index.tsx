import React from 'react'
import { SKILLS_CONFIG, SkillColors, Skill, SkillLevel } from './config'
import Legend from './Legend'

const getGroupedSkills = (
  skillsConfig: Array<Skill>
): { [level in SkillLevel]: Array<Skill> } => {
  return skillsConfig.reduce(
    (acc, curr) => {
      acc[curr.level] = [...acc[curr.level], curr]
      return acc
    },
    {
      expert: [],
      ok: [],
      learning: [],
    }
  )
}

export default function Skills() {
  const groupedSkills = getGroupedSkills(SKILLS_CONFIG)
  return (
    <div>
      <div>
        {Object.entries(groupedSkills).map(([level, skillsList]) => {
          const style = {
            color: SkillColors[level],
            marginBottom: '0.5rem',
            fontWeight: 600,
          }
          return (
            <div style={style}>
              {skillsList.map(skill => skill.name).join(' • ')}
            </div>
          )
        })}
      </div>
      {/* <Legend /> */}
    </div>
  )
}
