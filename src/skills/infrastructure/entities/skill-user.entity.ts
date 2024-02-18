import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { SkillEntity } from './skill.entity';
import { UserEntity } from '../../../user/infrastructure/entities/user.entity';
import { SkillUserStateEnum } from '../models/skill-user-state.enum';
const nameof = <T>(name: keyof T) => name;

interface Props {
  skillId: number;
  userId: string;
  mentorId: string;
  requestedValue: number;
}

@Entity('skills-user')
export class SkillUserEntity {
  @PrimaryGeneratedColumn('increment')
  public readonly id!: number;

  @Column()
  @RelationId<SkillUserEntity>((entity) => entity.skill)
  public skillId!: SkillEntity['id'];

  @ManyToOne(() => SkillEntity)
  @JoinColumn({ name: nameof<SkillUserEntity>('skillId') })
  public skill!: Promise<SkillEntity>;

  @Column()
  @RelationId<SkillUserEntity>((entity) => entity.user)
  public userId!: UserEntity['id'];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: nameof<SkillUserEntity>('userId') })
  public user!: Promise<UserEntity>;

  @Column()
  @RelationId<SkillUserEntity>((entity) => entity.mentor)
  public mentorId!: UserEntity['id'];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: nameof<SkillUserEntity>('mentorId') })
  public mentor!: Promise<UserEntity>;

  @Column({ default: SkillUserStateEnum.Pending, type: 'smallint' })
  public state!: SkillUserStateEnum;

  @Column({ type: 'smallint', nullable: true })
  public value!: number;

  @Column({ type: 'smallint', nullable: false })
  public requestedValue: number;

  @Column({ type: 'smallint', nullable: true })
  public mentorValue: number;

  @Column({ type: 'smallint', nullable: true })
  public mentorCooperation: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @Column({ type: 'date', nullable: true })
  public confirmedAt!: Date;

  public static factory(props: Props) {
    const obj = new SkillUserEntity();
    obj.userId = props.userId;
    obj.skillId = props.skillId;
    obj.requestedValue = props.requestedValue;
    obj.mentorId = props.mentorId;

    return obj;
  }
}
