import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface Props {
  name: string;
  description: string;
}

@Entity('skills')
export class SkillEntity {
  @PrimaryGeneratedColumn('increment')
  public readonly id!: number;

  @Column({ type: 'varchar', unique: true })
  public name!: string;

  @Column({ nullable: false, type: 'varchar' })
  public description!: string;

  public static factory(name: string, description: string) {
    const obj = new SkillEntity();
    obj.name = name;
    obj.description = description;

    return obj;
  }
}
