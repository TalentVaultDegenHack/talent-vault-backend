import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
        SELECT
            "userId" as userId,
            "skillId" as skillId,
            min("skills-user".value) as minValue,
            max("skills-user".value) as maxValue,
            CAST (avg("skills-user".value) AS INTEGER ) as avgValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user".value) AS INTEGER) AS medianValue,
        
            min("skills-user"."requestedValue") as minRequestedValue,
            max("skills-user"."requestedValue") as maxRequestedValue,
            CAST (avg("skills-user"."requestedValue") AS INTEGER ) as avgRequestedValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."requestedValue") AS INTEGER) AS medianRequestedValue,
        
            min("skills-user"."mentorCooperation") as minMentorCooperation,
            max("skills-user"."mentorCooperation") as maxMentorCooperation,
            CAST (avg("skills-user"."mentorCooperation") AS INTEGER ) as avgMentorCooperation,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorCooperation") AS INTEGER) AS medianMentorCooperation,
        
            min("skills-user"."mentorValue") as minMentorValue,
            max("skills-user"."mentorValue") as maxMentorValue,
            CAST (avg("skills-user"."mentorValue") AS INTEGER ) as avgMentorValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorValue") AS INTEGER) AS medianMentorValue
        FROM "skills-user" GROUP BY "skills-user"."userId", "skills-user"."skillId"
    `,
})
export class SearchView {
  @ViewColumn({ name: 'userid' })
  public readonly userId: string;

  @ViewColumn({ name: 'skillid' })
  public readonly skillId: number;

  // value
  @ViewColumn({ name: 'minvalue' })
  public readonly minValue: number;

  @ViewColumn({ name: 'maxvalue' })
  public readonly maxValue: number;

  @ViewColumn({ name: 'avgvalue' })
  public readonly avgValue: number;

  @ViewColumn({ name: 'medianvalue' })
  public readonly medianValue: number;

  // requested value
  @ViewColumn({ name: 'minrequestedvalue' })
  public readonly minRequestedValue: number;

  @ViewColumn({ name: 'maxrequestedvalue' })
  public readonly maxRequestedValue: number;

  @ViewColumn({ name: 'avgrequestedvalue' })
  public readonly avgRequestedValue: number;

  @ViewColumn({ name: 'medianrequestedvalue' })
  public readonly medianRequestedValue: number;

  // mentor cooperation
  @ViewColumn({ name: 'minmentorcooperation' })
  public readonly minMentorCooperation: number;

  @ViewColumn({ name: 'maxmentorcooperation' })
  public readonly maxMentorCooperation: number;

  @ViewColumn({ name: 'avgmentorcooperation' })
  public readonly avgMentorCooperation: number;

  @ViewColumn({ name: 'medianmentorcooperation' })
  public readonly medianMentorCooperation: number;

  // mentor value
  @ViewColumn({ name: 'minmentorvalue' })
  public readonly minMentorValue: number;

  @ViewColumn({ name: 'maxmentorvalue' })
  public readonly maxMentorValue: number;

  @ViewColumn({ name: 'avgmentorvalue' })
  public readonly avgMentorValue: number;

  @ViewColumn({ name: 'medianmentorvalue' })
  public readonly medianMentorValue: number;
}
